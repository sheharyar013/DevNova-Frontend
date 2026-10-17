<?php
// Step 2: check the verification code, then email the full enquiry (and attachment) to DevNova.

declare(strict_types=1);
require __DIR__ . '/lib.php';

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_FILES = [
    'pdf' => ['application/pdf'],
    'doc' => ['application/msword', 'application/octet-stream'],
    'docx' => ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip', 'application/octet-stream'],
    'png' => ['image/png'],
    'jpg' => ['image/jpeg'],
    'jpeg' => ['image/jpeg'],
];

require_post();
start_session();
rate_limit('enquiry', 20, 3600);

// Honeypot: real visitors never see or fill this field.
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    respond(200);
}

$f = fn (string $key, int $max) => clean((string) ($_POST[$key] ?? ''), $max);
$name = $f('name', 100);
$email = strtolower($f('email', 254));
$company = $f('company', 150);
$phone = $f('phone', 40);
$stage = $f('stage', 60);
$timeline = $f('timeline', 60);
$source = $f('source', 60);
$details = $f('details', 5000);
$code = preg_replace('/\D/', '', $f('code', 12));
$nda = ($_POST['nda'] ?? '') === '1';
$services = array_slice(array_map(fn ($s) => clean((string) $s, 60), (array) json_decode((string) ($_POST['services'] ?? '[]'), true)), 0, 20);

if ($name === '' || $details === '' || !$services || ($_POST['consent'] ?? '') !== '1') {
    respond(422, 'Please fill in all required fields.');
}

// Verify the visitor owns the email address.
$v = $_SESSION['verify'] ?? null;
if (!$v || $v['email'] !== $email || time() > $v['expires']) {
    respond(422, 'Your verification code has expired. Please request a new one.');
}
if ($v['attempts'] >= CODE_MAX_ATTEMPTS) {
    unset($_SESSION['verify']);
    respond(422, 'Too many incorrect codes. Please request a new one.');
}
if (!hash_equals($v['hash'], hash('sha256', $code . session_id()))) {
    $_SESSION['verify']['attempts']++;
    respond(422, "That code isn't right. Please check the email we sent you.");
}

// Optional attachment.
$attachments = [];
$file = $_FILES['attachment'] ?? null;
if ($file && ($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
    if ($file['error'] !== UPLOAD_ERR_OK || $file['size'] > MAX_FILE_BYTES) {
        respond(422, 'The attachment must be a single file up to 10 MB.');
    }
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']) ?: '';
    if (!isset(ALLOWED_FILES[$ext]) || !in_array($mime, ALLOWED_FILES[$ext], true)) {
        respond(422, 'Attachments must be PDF, DOC, DOCX, PNG or JPG.');
    }
    $safeName = preg_replace('/[^A-Za-z0-9._ -]/', '_', basename($file['name']));
    $attachments[] = [$file['tmp_name'], $safeName, $mime];
}

$rows = [
    'Name' => $name,
    'Email' => "$email (verified)",
    'Company' => $company,
    'Phone / WhatsApp' => $phone,
    'Services needed' => implode(', ', $services),
    'Project stage' => $stage,
    'Timeline' => $timeline,
    'Heard about us via' => $source,
    'NDA requested' => $nda ? 'Yes' : 'No',
    'Attachment' => $attachments ? $attachments[0][1] . ' (attached)' : 'None',
];

$text = "New project enquiry from the DevNova website\n\n";
$html = '<div style="font-family:Arial,sans-serif;font-size:14px;color:#0A1022;line-height:1.5">'
    . '<h2 style="margin:0 0 16px">New project enquiry</h2>'
    . '<table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:640px">';
foreach ($rows as $label => $value) {
    $value = $value === '' ? '—' : $value;
    $text .= "$label: $value\n";
    $html .= '<tr style="border-bottom:1px solid #E3E7EF"><td style="color:#5A6478;width:180px;vertical-align:top">' . h($label)
        . '</td><td><strong>' . h($value) . '</strong></td></tr>';
}
$text .= "\nProject details:\n$details\n\nReply to this email to answer the client directly.";
$html .= '</table><h3 style="margin:24px 0 8px">Project details</h3>'
    . '<div style="white-space:pre-wrap;background:#F5F7FA;border-radius:8px;padding:14px">' . h($details) . '</div>'
    . '<p style="color:#6B7487;margin-top:24px">Reply to this email to answer the client directly.</p></div>';

try {
    send_mail([
        'to' => config()['to'],
        'subject' => "New enquiry: $name" . ($company !== '' ? " ($company)" : '') . ' – ' . implode(', ', array_slice($services, 0, 3)),
        'text' => $text,
        'html' => $html,
        'reply_to' => [$email, $name],
        'attachments' => $attachments,
    ]);
} catch (Throwable $e) {
    error_log('[devnova contact] enquiry: ' . $e->getMessage());
    respond(502, "We couldn't send your enquiry right now. Please try again or email us directly.");
}

unset($_SESSION['verify']);
respond(200);
