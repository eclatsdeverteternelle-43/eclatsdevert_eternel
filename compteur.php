<?php
$file = 'compteur.txt';

if (!file_exists($file)) {
    file_put_contents($file, 0);
}

$visites = (int)file_get_contents($file);
$visites++;
file_put_contents($file, $visites);

echo $visites;
?>
