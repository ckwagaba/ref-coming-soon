<?php
try {
    // secrets
    $host = 'localhost';
    $dbname = 'newsletter';
    $user = 'root';
    $password = '#@Psalm{100}'; // Y"a/4U)4k,4>=>Fv

    // establish connection
    $pdo = new PDO('mysql:host=' . $host . ';dbname=' . $dbname . '', $user, $password);
} catch (PDOException $e) {
    // terminate execution in case of connection issues
    die($e->getMessage());
}
?>