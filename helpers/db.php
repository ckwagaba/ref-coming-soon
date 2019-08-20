<?php
try {
    // secrets
    $host = 'localhost';
    $dbname = 'newsletter';
    $user = 'root';
    $password = 'Y"a/4U)4k,4>=>Fv'; //#@Psalm{100}

    // establish connection
    $pdo = new PDO('mysql:host=' . $host . ';dbname=' . $dbname . '', $user, $password);
} catch (PDOException $e) {
    // terminate execution in case of connection issues
    die($e->getMessage());
}
?>