<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:dce="urn:schemas-epa-wg:dce"
                xmlns:exsl="http://exslt.org/common" exclude-result-prefixes="exsl">
    <xsl:template match="ignore">
        <xsl:value-of select="."/>
    </xsl:template>
    <xsl:template mode="payload" match="attributes">
        <nav data-dce-id="1">
            <xsl:for-each select="/datadom/payload/xhtml:*">
                <xsl:if test="local-name(.) = 'style'">
                    <xsl:copy-of select=".">
                    </xsl:copy-of>
                </xsl:if>
                <xsl:if test="local-name(.) != 'style' and (local-name(.) != 'span' or normalize-space(.) != '')">
                    <section data-dce-id="2">
                        <button class="action" data-dce-id="3">
                            <dce-text data-dce-id="4">
                                <xsl:value-of select="@alt"/>
                            </dce-text>
                            <xsl:copy-of select=".">
                            </xsl:copy-of>
                        </button>
                    </section>
                </xsl:if>
            </xsl:for-each>
        </nav>
    </xsl:template>
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