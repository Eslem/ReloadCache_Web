var xmlC;
function load(){
	cleanBar1();
	cleanBar2();

	cacheado();
}


//recogiendo datos
function cacheado(){
	$.ajax({
		type: "GET",
		cache: true,
		url: "files.cache.xml",
		dataType: "xml",
		success: display,
		xhr: function(){
			return xhr("Leyendo cache...");
		}
	}); 
}
function NCacheado(){
	$.ajax({
		type: "GET",
		url: "reloadNC.php",
		dataType: "xml",
		success: displayNC,
		cache: false,
		xhr: function(){
			return xhrNC("leyendo lista de ficheros...");
		}
	});
}
function xhr(text){
	var xhr = new window.XMLHttpRequest();
	//Upload progress
	xhr.upload.addEventListener("progress", function(evt){
		if (evt.lengthComputable) {
			var percentComplete = evt.loaded / evt.total;
			//Do something with upload progress
		}
		}, false);
	//Download progress
	xhr.addEventListener("progress", function(evt){
		if (evt.lengthComputable) {
			var percentComplete = (evt.loaded / evt.total)*100;
			setProgress1(percentComplete/3, text);
			//Do something with download progress
		}
		}, false);
	return xhr;
}
function xhrNC(text){
	var xhr = new window.XMLHttpRequest();
	//Upload progress
	xhr.upload.addEventListener("progress", function(evt){
		if (evt.lengthComputable) {
			var percentComplete = evt.loaded / evt.total;
			//Do something with upload progress
		}
		}, false);
	//Download progress
	xhr.addEventListener("progress", function(evt){
		if (evt.lengthComputable) {
			var percentComplete = (evt.loaded / evt.total)*100;
			setProgress1(30+(percentComplete/3), text);
			//Do something with download progress
		}
		}, false);
	return xhr;
}


// imprimiendo datos
function display(xml){
	xmlC=xml; 
	/*$(xml).find("files").each(function () {
	var txt=$(this).find("file").text();
	$("#cacheada").text(txt);
	});*/
	XMLyXSL(xml, "cacheada");
	NCacheado();
}

function displayNC(xml){
	/*$(xml).find("files").each(function () {
	var txt=$(this).find("file").text();
	$("#NoCacheada").text(txt);
	});   */
	XMLyXSL(xml, "NoCacheada");
	recoger(xml);
} 


//Xml y Xsl
function loadXMLDoc(filename)
{
	if (window.ActiveXObject)
	{
		xhttp = new ActiveXObject("Msxml2.XMLHTTP");
	}
	else
	{
		xhttp = new XMLHttpRequest();
	}
	xhttp.open("GET", filename, false);
	try {xhttp.responseType = "msxml-document"} catch(err) {} // Helping IE11
	xhttp.send("");
	return xhttp.responseXML;
}
function XMLyXSL(xml, elem){

	xsl = loadXMLDoc("re/ficheros.xsl");
	// code for IExpl
	if (window.ActiveXObject || xhttp.responseType == "msxml-document")
	{
		ex = xml.transformNode(xsl);
		document.getElementById(elem).innerHTML = ex;
	}
	// code for Chrome, Firefox, Opera, etc.
	else if (document.implementation && document.implementation.createDocument)
	{
		xsltProcessor = new XSLTProcessor();
		xsltProcessor.importStylesheet(xsl);
		resultDocument = xsltProcessor.transformToFragment(xml, document);
		document.getElementById(elem).appendChild(resultDocument);
	}
}

//Comprueba los archivos
function recoger(xml){
	var total=0;
	$(xml).find("files").each(function () {
		var file=$(this).find("file");
		total=file.size();
		var percent=100/total;
		var totalper=0;
		$(file).each(function () {
			nombre=$(this).find("nombre").text();
			fecha=$(this).find("fecha").text()
			comparar(nombre, fecha);
			setProgress1(60+(totalper/3), "Comprobando fichero: "+nombre);  
			totalper += percent;
		});  
	});
	setTimeout(function(){$("#divBar2").slideUp();},2000);
	setProgress1(95, "Actualizando Registros");
	reloadCache();

}

function comparar(nombre, fecha){
	var nombreC, fechaC;
	xml=xmlC;
	$(xml).find("files").each(function () {
		var file=$(this).find("file");
		$(file).each(function () {
			nombreC=$(this).find("nombre").text();
			fechaC=$(this).find("fecha").text();
			if(nombreC==nombre){
				if(fechaC == fecha){
					//console.log(nombre+":"+fecha+"-"+fechaC);
					return ;
				}
				else{
					if($("#divBar2").is(":hidden")){
						$("#divBar2").slideDown();
					} 
					console.log(nombre+":"+fecha+"-"+fechaC+"------x");
					reload(nombre);
					return;
				}
			}	            
		});
	});
	;
}

//Recarga de ficheros

function xhrFile(text){
	var xhr = new window.XMLHttpRequest();
	//Upload progress
	xhr.upload.addEventListener("progress", function(evt){
		if (evt.lengthComputable) {
			var percentComplete = evt.loaded / evt.total;
			//Do something with upload progress
		}
		}, false);
	//Download progress
	xhr.addEventListener("progress", function(evt){
		if (evt.lengthComputable) {
			var percentComplete = (evt.loaded / evt.total)*100;
			setProgress2(text, percentComplete, "Actualizando libreria..." );
			if( percentComplete == 100){
				setProgress2(text, percentComplete, "Fichero Actualizado" );
			}
			//Do something with download progress
		}
		}, false);
	return xhr;
}
function reload(nombre){
	$.ajax({
		type: "GET",
		url: "re/"+nombre,
		dataType: "xml",
		cache: false,
		xhr: function(){
			return xhrFile(nombre);
		},
		succes:modificado(nombre)
	});
}

function modificado(nombre){
	$("#modificados").prepend("<li class='list-group-item'>"+nombre+"</li>"); 
}

function reloadCache(){
	$.ajax({
		type: "POST",
		url: "reload.php",
		success: function(){
			setProgress1(100, "Finalizado");
			setTimeout(function(){$("#reload").slideUp();},5000);
		},
		cache: false,
	});
}

$(document).ready(load());

//Progress Bar Functions .

function setProgress1(progress, text){
	var $bar = $('#mainbar');
	$bar.text(text);
	$bar.width(progress+"%");
}
function addProgress1(start, progress, text){
	var $bar = $('#mainbar');
	$bar.text(text);
	console.log($bar.width());
	progress=start+$bar.width();
	$bar.width(progress+"%");
}

function cleanBar1(){
	var $bar = $('#mainbar');
	$bar.text("");
	$bar.width("0%")
}
function cleanBar2(){
	var $bar = $('#secondBar');
	$bar.text("");
	$bar.width("0%");
}

function setProgress2(nombre, progress, text){
	var $bar = $('#secondBar');
	$bar.text(text);
	$bar.width(progress+"%");
	$("#nombreLibreria").text(nombre);
}

/*$(document).ready(function(){
var numero=0;
var progress=setInterval(function(){
numero=numero+1 ;
if(numero<=100){
setProgress1(numero, numero+"%");
}
}, 1000);
var progress=setInterval(function(){
numero=numero+1 ;
if(numero<=100){
setProgress2("acwewce", numero, numero+"%");
}
}, 1000);

});*/