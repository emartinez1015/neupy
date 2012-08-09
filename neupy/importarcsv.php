<?php 
/**
 * CSVReader Class
 * 
 * $Id: csvreader.php 54 2009-10-21 21:01:52Z Pierre-Jean $
 * 
 * Allows to retrieve a CSV file content as a two dimensional array.
 * Optionally, the first text line may contains the column names to
 * be used to retrieve fields values (default).
 * 
 * Let's consider the following CSV formatted data:
 * 
 *        "col1";"col2";"col3"
 *         "11";"12";"13"
 *         "21;"22;"2;3"
 * 
 * It's returned as follow by the parsing operation with first line
 * used to name fields:
 * 
 *         Array(
 *             [0] => Array(
 *                     [col1] => 11,
 *                     [col2] => 12,
 *                     [col3] => 13
 *             )
 *             [1] => Array(
 *                     [col1] => 21,
 *                     [col2] => 22,
 *                     [col3] => 2;3
 *             )
 *        )
 * 
 * @author        Edinson Martinez
 */
class ImportarCsv {
    
    var $fields;            /** columns names retrieved after parsing */ 
    var $separator = ';';    /** separator used to explode each line */
    var $enclosure = '"';    /** enclosure used to decorate each field */
    
    var $max_row_size = 5500;    /** maximum row size to be used for decoding */
    
    /**
     * Parse a file containing CSV formatted data.
     *
     * @access    public
     * @param    string
     * @param    boolean
     * @return    array
     */
    function parse_file($p_Filepath, $p_NamedFields = true) {
        $content = false;
        $file = fopen($p_Filepath, 'r');
        if($p_NamedFields) {
            $this->fields = fgetcsv($file, $this->max_row_size, $this->separator, $this->enclosure);
			 
			for ($i=0; $i <count($this->fields) ; $i++) {
                     $this->fields[$i] = trim($this->fields[$i]);
                    }
			
			
        }
        while( ($row = fgetcsv($file, $this->max_row_size, $this->separator, $this->enclosure)) != false ) {            
          // if( $row[0] != null ) { // descomente esta instruccion si quiere quitar lineas con espacios en blanco
            //en la primera columna
                if( !$content ) {
                    $content = array();
                }
                if( $p_NamedFields ) {
                    $items = array();
                    
                    // I prefer to fill the array with values of defined fields
                    foreach($this->fields as $id => $field) {
                        if( isset($row[$id]) ) {
                            $items[$field] = $row[$id];    
                        }
                    }
                    $content[] = $items;
                } else {
                    $content[] = $row;
                }
           //}
        }
        fclose($file);
        return $content;
    }



    function exportarExcel($array, $cabeceras, $camposbd) {
            header('Content-type: application/vnd.ms-excel');
            header("Content-Disposition: attachment; filename=exporte.xls");
            header("Pragma: no-cache");
            header("Expires: 0");
                 $html = '
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />

</head>
<body>
<table border="1">';
        $aux = "";
        for ($i = 0; $i < count($cabeceras); $i++) {
            $head = $cabeceras[$i];
            $head = utf8_decode($head);
            $cadena = '<td  bordercolor="#000000" bgcolor="#AB273B"><div align="center" class="Estilo2">' . $head . '</div></td>';
            $aux = $aux . $cadena;
        }

        $tabla = "";
        for ($i = 0; $i < count($array); $i++) {
            $tabla = $tabla . '<tr>';
            for ($j = 0; $j < count($camposbd); $j++) {
                $fila = $array[$i][$camposbd[$j]];
                $fila = utf8_decode($fila);
                $celda = '<td bgcolor="#FFF">' . $fila . '</td>';
                $tabla = $tabla . $celda;
            }
            $tabla = $tabla . '</tr>';
        }

        $html .= $aux . $tabla . '</table></body>';
        return $html;
        }
}
?> 