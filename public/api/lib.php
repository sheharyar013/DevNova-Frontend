<?php
// Shared helpers for the contact form endpoints. Not meant to be requested directly.

declare(strict_types=1);

const CODE_TTL = 600;          // verification code lifetime, seconds
const CODE_MAX_ATTEMPTS = 5;   // wrong guesses before the code is burned
const RESEND_COOLDOWN = 45;    // seconds between codes for one visitor

function config(): array
{
    static $cfg = null;
    if ($cfg === null) {
        $file = __DIR__ . '/config.php';
        if (!is_file($file)) {
            respond(500, 'The contact form is not configured yet. Please email us directly.');
        }
        $cfg = require $file;
    }
    return $cfg;
}

function respond(int $status, string $error = '', array $data = []): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($error === '' ? ['ok' => true] + $data : ['ok' => false, 'error' => $error]);
    exit;
}

function require_post(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        respond(405, 'Method not allowed.');
    }
}

function start_session(): void
{
    $https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https';
    session_name('dn_contact');
    session_set_cookie_params(['lifetime' => 0, 'path' => '/', 'secure' => $https, 'httponly' => true, 'samesite' => 'Lax']);
    session_start();
}

function client_ip(): string
{
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

/** Allow at most $max hits per $window seconds for this IP and bucket. */
function rate_limit(string $bucket, int $max, int $window): void
{
    $dir = sys_get_temp_dir() . '/devnova_rl';
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }
    $file = $dir . '/' . sha1($bucket . '|' . client_ip());
    $now = time();
    $hits = is_file($file) ? (json_decode((string) file_get_contents($file), true) ?: []) : [];
    $hits = array_values(array_filter($hits, fn ($t) => $t > $now - $window));
    if (count($hits) >= $max) {
        respond(429, 'Too many attempts. Please try again later.');
    }
    $hits[] = $now;
    file_put_contents($file, json_encode($hits), LOCK_EX);
}

function clean(string $value, int $max): string
{
    $value = trim(str_replace("\0", '', $value));
    return mb_substr($value, 0, $max);
}

/** Valid syntax and a domain that can actually receive mail. */
function valid_email(string $email): bool
{
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return false;
    }
    $domain = substr(strrchr($email, '@'), 1);
    return checkdnsrr($domain, 'MX') || checkdnsrr($domain, 'A');
}

function h(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

function encode_header(string $s): string
{
    return '=?UTF-8?B?' . base64_encode($s) . '?=';
}

function strip_crlf(string $s): string
{
    return str_replace(["\r", "\n"], '', $s);
}

/**
 * Send one email.
 * $msg: to, subject, html, text, reply_to (optional [email, name]), attachments (optional list of [path, filename, mime])
 */
function send_mail(array $msg): void
{
    $cfg = config();
    $smtp = $cfg['smtp'] ?? [];
    $from = $smtp['username'] ?? $cfg['to'];
    $domain = substr(strrchr($from, '@'), 1) ?: 'localhost';

    $mixed = 'mixed_' . bin2hex(random_bytes(8));
    $alt = 'alt_' . bin2hex(random_bytes(8));

    $headers = [
        'Date: ' . date('r'),
        'From: ' . encode_header($cfg['from_name'] ?? 'DevNova Website') . " <$from>",
        'To: <' . strip_crlf($msg['to']) . '>',
        'Subject: ' . encode_header($msg['subject']),
        'Message-ID: <' . bin2hex(random_bytes(12)) . "@$domain>",
        'MIME-Version: 1.0',
        "Content-Type: multipart/mixed; boundary=\"$mixed\"",
    ];
    if (!empty($msg['reply_to'])) {
        [$replyEmail, $replyName] = $msg['reply_to'];
        $headers[] = 'Reply-To: ' . encode_header(strip_crlf($replyName)) . ' <' . strip_crlf($replyEmail) . '>';
    }

    $body = "--$mixed\r\nContent-Type: multipart/alternative; boundary=\"$alt\"\r\n\r\n"
        . "--$alt\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($msg['text']))
        . "--$alt\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($msg['html']))
        . "--$alt--\r\n";
    foreach ($msg['attachments'] ?? [] as [$path, $filename, $mime]) {
        $name = encode_header($filename);
        $body .= "--$mixed\r\nContent-Type: $mime; name=\"$name\"\r\nContent-Transfer-Encoding: base64\r\n"
            . "Content-Disposition: attachment; filename=\"$name\"\r\n\r\n"
            . chunk_split(base64_encode((string) file_get_contents($path)));
    }
    $body .= "--$mixed--\r\n";

    if (empty($smtp['host'])) {
        // No SMTP configured: fall back to the host's mail() function.
        $extra = array_filter($headers, fn ($line) => !str_starts_with($line, 'To:') && !str_starts_with($line, 'Subject:'));
        if (!mail($msg['to'], encode_header($msg['subject']), $body, implode("\r\n", $extra), "-f$from")) {
            throw new RuntimeException('mail() failed');
        }
        return;
    }

    smtp_send($smtp, $from, $msg['to'], implode("\r\n", $headers) . "\r\n\r\n" . $body);
}

function smtp_send(array $smtp, string $from, string $to, string $data): void
{
    $secure = $smtp['secure'] ?? 'ssl';
    $remote = ($secure === 'ssl' ? 'ssl://' : 'tcp://') . $smtp['host'] . ':' . (int) $smtp['port'];
    $fp = @stream_socket_client($remote, $errno, $errstr, 20);
    if (!$fp) {
        throw new RuntimeException("SMTP connect failed: $errstr");
    }
    stream_set_timeout($fp, 20);

    $expect = function (array $codes) use ($fp): void {
        $resp = '';
        while (($line = fgets($fp, 515)) !== false) {
            $resp .= $line;
            if (isset($line[3]) && $line[3] === ' ') {
                break;
            }
        }
        if (!in_array((int) substr($resp, 0, 3), $codes, true)) {
            throw new RuntimeException('SMTP error: ' . trim($resp));
        }
    };
    $cmd = function (string $line, array $codes) use ($fp, $expect): void {
        fwrite($fp, $line . "\r\n");
        $expect($codes);
    };

    $ehlo = 'EHLO ' . preg_replace('/[^A-Za-z0-9.-]/', '', $_SERVER['SERVER_NAME'] ?? 'localhost');
    $expect([220]);
    $cmd($ehlo, [250]);
    if ($secure === 'tls') {
        $cmd('STARTTLS', [220]);
        if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            throw new RuntimeException('SMTP STARTTLS failed');
        }
        $cmd($ehlo, [250]);
    }
    $cmd('AUTH LOGIN', [334]);
    $cmd(base64_encode($smtp['username']), [334]);
    $cmd(base64_encode($smtp['password']), [235]);
    $cmd("MAIL FROM:<$from>", [250]);
    $cmd('RCPT TO:<' . strip_crlf($to) . '>', [250, 251]);
    $cmd('DATA', [354]);

    $data = preg_replace("/\r?\n/", "\r\n", $data);
    $data = preg_replace('/^\./m', '..', $data);
    fwrite($fp, $data . "\r\n.\r\n");
    $expect([250]);
    $cmd('QUIT', [221]);
    fclose($fp);
}
