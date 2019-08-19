<?php
/**
 * persist customer details
 */
$data = file_get_contents('php://input');
$_POST = json_decode($data, true);

$form_data = $_POST['formData'];

try {
    // secrets
    $host = 'localhost';
    $dbname = 'newsletter';
    $user = 'root';
    $password = 'Y"a/4U)4k,4>=>Fv';

    // establish connection
    $pdo = new PDO('mysql:host=' . $host . ';dbname=' . $dbname . '', $user, $password);

    // save customer
    $sql = 'INSERT INTO customer (firstname, lastname, email, phone, dob, country) VALUES (?, ?, ?, ?, ?, ?)';
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $form_data['firstName'],
        $form_data['lastName'],
        $form_data['email'],
        $form_data['phone'],
        $form_data['dateOfBirth'],
        $form_data['country']
    ]);
    if ($stmt->rowCount() == 1) {
        echo 1;
    } else {
        echo 0;
    }
} catch (PDOException $e) {
    // terminate execution in case of connection issues
    die($e->getMessage());
}
?>