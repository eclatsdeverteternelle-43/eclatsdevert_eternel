<?php
// Vérifie méthode POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  exit('Méthode non autorisée');
}

// Récupère la réponse reCAPTCHA
$recaptcha = $_POST['g-recaptcha-response'] ?? '';
$secret = "TA_SECRET_KEY"; // <-- ta clé secrète Google

// Vérification avec Google
$verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=" . urlencode($secret) . "&response=" . urlencode($recaptcha));
$captcha_success = json_decode($verify);

if (!$captcha_success || !$captcha_success->success) {
    echo "Échec reCAPTCHA. Merci de réessayer.";
    exit;
}

// Récupérer les données du formulaire
$name = htmlspecialchars($_POST['name'] ?? '');
$email = htmlspecialchars($_POST['email'] ?? '');
$message = htmlspecialchars($_POST['message'] ?? '');

// Préparer les données pour Formspree
$formspree_url = "https://formspree.io/f/xyzpryor"; // <-- ton endpoint Formspree
$data = [
    "name" => $name,
    "email" => $email,
    "message" => $message
];

// Envoyer à Formspree
$options = [
    "http" => [
        "header"  => "Content-type: application/x-www-form-urlencoded\r\n",
        "method"  => "POST",
        "content" => http_build_query($data),
    ]
];
$context  = stream_context_create($options);
$result = file_get_contents($formspree_url, false, $context);

// Si tout va bien → redirection vers merci.html
header("Location: merci.html");
exit;
