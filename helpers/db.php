<?php
try {
    // secrets
    $host = 'localhost';
    $dbname = 'newsletter';
    $user = 'root';
    $password = '#@Psalm{100}';

    // establish connection
    $pdo = new PDO('mysql:host=' . $host . ';dbname=' . $dbname . '', $user, $password);
} catch (PDOException $e) {
    // terminate execution in case of connection issues
    die($e->getMessage());
}
?>