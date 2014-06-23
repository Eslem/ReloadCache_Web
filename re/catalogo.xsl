<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="catalogo">
		<html>
			<head>
				<title><xsl:value-of select="nombre_catalogo" /></title>
				<link rel="stylesheet" type="text/css" href="catalogo.css" />
			</head>
			<body>
				<img class="img">
					<xsl:attribute name="src"><xsl:value-of select="banner_catalogo"/></xsl:attribute>
				</img>
				<h1><xsl:value-of select="nombre_catalogo" /></h1>
				<h2>AQUI PONDREMOSdsfsdf LOS ARTICULOS DEL CATALOGO</h2>
				<div class="footer">
					<p>Eslem - Marzo 2014</p>
					<p><xsl:value-of select="copyright" /></p>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
