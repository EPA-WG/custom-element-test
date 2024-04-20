<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:dce="urn:schemas-epa-wg:dce" xmlns:exsl="http://exslt.org/common" version="1.0" exclude-result-prefixes="exsl">
    <xsl:template match="ignore">
        <xsl:choose>
            <xsl:when test="//attr"><xsl:value-of select="//attr"/></xsl:when>
            <xsl:otherwise><xsl:value-of select="def"/></xsl:otherwise>
        </xsl:choose>
        <xsl:value-of select="."/></xsl:template>
    <xsl:template mode="payload" match="attributes"><dce-root xmlns="http://www.w3.org/1999/xhtml" xmlns:xhtml="http://www.w3.org/1999/xhtml" data-dce-id="1"><button xmlns="" slice="clickcount" slice-event="click" slice-value="//clickcount + 1" data-dce-id="2">
                    +
                </button><button xmlns="" slice="clickcount" slice-event="click" slice-value="//clickcount - 1" data-dce-id="3">
                    -
                </button><input xmlns="" slice="clickcount" type="number" value="{concat( //clickcount  , substring(  0 , (1+string-length(  0 )) * string-length( //clickcount  ) ) )}" data-dce-id="4"/><dce-text xmlns="" data-dce-id="5">
                <xsl:value-of select="//clickcount"/>
            </dce-text></dce-root></xsl:template>
    <xsl:template match="/">
        <xsl:apply-templates mode="payload" select="/datadom/attributes"/>
    </xsl:template>
    <xsl:template name="slot">
        <xsl:param name="slotname"/>
        <xsl:param name="defaultvalue"/>
        <xsl:choose>
            <xsl:when test="//payload/*[@slot=$slotname]">
               <xsl:copy-of select="//payload/*[@slot=$slotname]"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:copy-of select="$defaultvalue"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:variable name="js-injected-body">
        <xsl:call-template name="slot">
            <xsl:with-param name="slotname" select="''"/>
            <xsl:with-param name="defaultvalue"/>
        </xsl:call-template>
    </xsl:variable>
</xsl:stylesheet>