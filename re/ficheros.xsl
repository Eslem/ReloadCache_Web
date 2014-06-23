<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="files">
		<html>
			<head>
			</head>
			<body>
				<table class="table table-hover table-bordered">
					<tr>
						<th class="th">Nombre Fichero</th>
						<th class="th">Fecha Modificacion</th>
					</tr>
					<xsl:for-each select="file">
						<tr>
							<td class="td"><xsl:value-of select="nombre" /></td>
							<td class="td"><xsl:value-of select="fecha" /></td>
						</tr>
					</xsl:for-each>
				</table>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
