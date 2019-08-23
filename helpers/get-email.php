<?php
/**
 * check for duplicate email addresses
 */
$data = file_get_contents('php://input');
$_POST = json_decode($data, true);

$email = $_POST['email'];

// make db connection
require_once('db.php');

// search for email
$sql = 'SELECT email FROM customer WHERE email = ?';
$stmt = $pdo->prepare($sql);
$stmt->execute([$email]);
$row = $stmt->fetch();

if ($row) {
    echo 1;
} else {
    echo 0;
}
?>