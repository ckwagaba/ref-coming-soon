<?php
/**
 * persist customer details
 */
$data = file_get_contents('php://input');
$_POST = json_decode($data, true);

$form_data = $_POST['formData'];

// make db connection
require_once('db.php');

// save customer
$sql = 'INSERT INTO customer (firstname, lastname, email) VALUES (?, ?, ?)';
$stmt = $pdo->prepare($sql);
$stmt->execute([
    'Via',
    'Website',
    $form_data['email']
]);
if ($stmt->rowCount() == 1) {
    echo 1;
} else {
    echo 0;
}
?>