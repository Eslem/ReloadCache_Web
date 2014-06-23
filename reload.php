<?php
	$dir = "re/";

	$doc = new DOMDocument('1.0');
	$doc->formatOutput = true;
	$root = $doc->createElement('files');
	$root = $doc->appendChild($root);
	if (is_dir($dir)) {
		if ($dh = opendir($dir)) {
			while (($file = readdir($dh)) !== false) {
				if( ($file != '.')  && ($file !== '..') ){
					$filexml= $doc -> createElement('file');
					$filexml= $root-> appendChild($filexml);
					
					$nombre = $doc->createElement('nombre');
					$nombre = $filexml->appendChild($nombre);
					$nametxt = $doc->createTextNode($file);
					$nametxt = $nombre->appendChild($nametxt);


					$datex= $doc -> createElement('fecha');
					$datex= $filexml -> appendChild($datex);
					$date=date("F d Y H:i:s.", filemtime($dir . $file));
					$fecha=$doc -> createTextNode($date);
					$nametxt = $datex->appendChild($fecha);

				}
			}
			closedir($dh);
		}
	}
	echo 'Wrote: ' . $doc->save("files.cache.xml") . ' bytes'; 


?>

