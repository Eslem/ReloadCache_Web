<?php
	$dir = "re/";

	// Open a known directory, and proceed to read its contents
	if (is_dir($dir)) {
		if ($dh = opendir($dir)) {
			$xml =new SimpleXMLElement('<files />');
			while (($file = readdir($dh)) !== false) {
				if( ($file != '.')  && ($file !== '..') ){
					$filexml=$xml -> addChild("file");
					$filexml ->addChild("nombre",  $file) ;
					$filexml ->addChild("fecha",  date("F d Y H:i:s.", filemtime($dir . $file))) ;
					//cho "filename: $file : version: " . date ("F d Y H:i:s.", filemtime($dir . $file)) . "<br>";
				}
			}
			closedir($dh);
		}
	}
	Header('Content-type: text/xml');     	
	print($xml->asXML());


?>

