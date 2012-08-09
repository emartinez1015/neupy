
<?php
include_once 'importarcsv.php';
$excel = new ImportarCsv();

$array = $_POST['datos'];
$array = json_decode($array, true);

$cabeceras = $_POST['fields'];
$cabeceras = json_decode($cabeceras);

$name = $_POST['name'];


$html = $excel->exportarExcel($array, $cabeceras, $cabeceras);

$carpeta = "../uploads/";
$sfile= "exporte_".$name.".xls"; 
$ruta = $carpeta.$sfile;

$fp=fopen($ruta,"w");
fwrite($fp,$html);
fclose($fp);



 echo json_encode(array("success" => true, "nombre" => $sfile));
?>