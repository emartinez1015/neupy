
<?php
date_default_timezone_set('America/Bogota');
include_once 'importarcsv.php';
$csv = new ImportarCsv();

$fecha = date("Y-m-d_H-i-s");
$destino = "../uploads/";


$opcion = $_POST['opcion'];

if($opcion==1){
$nombre_archivo = $_FILES['datoscsv']['name'];
$tamano_archivo = $_FILES['datoscsv']['size'];
$temp_name = $_FILES['datoscsv']['tmp_name'];
}


if($opcion==2){
$nombre_archivo = $_FILES['datoscsvtest']['name'];
$tamano_archivo = $_FILES['datoscsvtest']['size'];
$temp_name = $_FILES['datoscsvtest']['tmp_name'];
}






function sacarExtension($str) {

    

    $ext = substr($str, -4);
    if ($ext == '.csv'){
        return 1;
    } else {
        return 2;
    }
}

if ($tamano_archivo < 10000000) {
    switch (sacarExtension($nombre_archivo)) {
        case 1:
           
            $nuevoname = $nombre_archivo;
            if (is_uploaded_file($temp_name)) {
                 
                 move_uploaded_file($temp_name, "$destino/$nuevoname");
                 $datos = $csv->parse_file("$destino/$nuevoname");
                 $fields = $csv -> fields;
                 
        


                 $columns = array();
                 for ($i=0; $i <count($fields) ; $i++) { 
                      $width = 100;  
                    if($i==count($fields)-1){
                        $width = 200;
                    }
                    $columns[$i] =  array("dataIndex"=> $fields[$i], "text" => $fields[$i], "width" => $width);    
                 }

            echo json_encode(array("success" => true, "datos" => $datos, "fields" => $fields, "columns" => $columns));
			}
            break;


        case 2:
            echo json_encode(array("success" => false));
            break;
    }
} else {
    echo json_encode(array("success" => false));
}