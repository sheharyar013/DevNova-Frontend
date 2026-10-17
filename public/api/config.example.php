<?php
// Copy this file to config.php (same folder) and fill in the password.
// config.php is git-ignored so the password never ends up on GitHub.

return [
    // Where enquiries are delivered.
    'to' => 'devnovatechnology@gmail.com',

    // Sender name shown in the inbox.
    'from_name' => 'DevNova Website',

    // Outgoing mail server. Emails are sent from this account.
    // Gmail: turn on 2-Step Verification, then create an App Password at
    // https://myaccount.google.com/apppasswords and paste it below.
    // Hostinger email instead: host smtp.hostinger.com, port 465, secure ssl, your mailbox and its password.
    'smtp' => [
        'host' => 'smtp.gmail.com',
        'port' => 465,
        'secure' => 'ssl', // 'ssl' for port 465, 'tls' for port 587
        'username' => 'devnovatechnology@gmail.com',
        'password' => 'PASTE-YOUR-16-CHARACTER-APP-PASSWORD',
    ],
];
