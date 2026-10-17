<?php
// Step 1: email a 6-digit code to the address the visitor entered, to prove they own it.

declare(strict_types=1);
require __DIR__ . '/lib.php';

require_post();
start_session();

$input = json_decode((string) file_get_contents('php://input'), true) ?: [];
$email = strtolower(clean((string) ($input['email'] ?? ''), 254));
$name = clean((string) ($input['name'] ?? ''), 100);

if (!valid_email($email)) {
    respond(422, 'Please enter a valid email address that can receive mail.');
}

$last = $_SESSION['verify']['sent_at'] ?? 0;
if (time() - $last < RESEND_COOLDOWN) {
    respond(429, 'Please wait a few seconds before requesting another code.');
}
rate_limit('send-code', 5, 3600);

$code = (string) random_int(100000, 999999);
$_SESSION['verify'] = [
    'email' => $email,
    'hash' => hash('sha256', $code . session_id()),
    'expires' => time() + CODE_TTL,
    'attempts' => 0,
    'sent_at' => time(),
];

$greeting = $name !== '' ? 'Hi ' . h($name) . ',' : 'Hi,';
try {
    send_mail([
        'to' => $email,
        'subject' => "Your DevNova verification code: $code",
        'text' => strip_tags($greeting) . "\n\nYour verification code is $code\n\nEnter it on the DevNova website to send your project enquiry. The code expires in 10 minutes.\n\nIf you didn't request this, you can ignore this email.\n\nDevNova Technology",
        'html' => '<div style="font-family:Arial,sans-serif;font-size:15px;color:#0A1022;line-height:1.6">'
            . "<p>$greeting</p><p>Your verification code is:</p>"
            . '<p style="font-size:32px;font-weight:bold;letter-spacing:6px;margin:8px 0 16px">' . $code . '</p>'
            . '<p>Enter it on the DevNova website to send your project enquiry. The code expires in 10 minutes.</p>'
            . '<p style="color:#6B7487">If you didn\'t request this, you can ignore this email.</p><p>DevNova Technology</p></div>',
    ]);
} catch (Throwable $e) {
    error_log('[devnova contact] send-code: ' . $e->getMessage());
    unset($_SESSION['verify']);
    respond(502, "We couldn't send the code right now. Please try again or email us directly.");
}

respond(200);
