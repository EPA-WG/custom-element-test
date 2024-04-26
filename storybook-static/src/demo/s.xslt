<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:dce="urn:schemas-epa-wg:dce" xmlns:exsl="http://exslt.org/common" version="1.0" exclude-result-prefixes="exsl">
    <xsl:template match="ignore">
        <xsl:choose>
            <xsl:when test="//attr"><xsl:value-of select="//attr"/></xsl:when>
            <xsl:otherwise><xsl:value-of select="def"/></xsl:otherwise>
        </xsl:choose>
        <xsl:value-of select="."/></xsl:template>
    <xsl:template mode="payload" match="attributes"><dce-root xmlns="http://www.w3.org/1999/xhtml" xmlns:xhtml="http://www.w3.org/1999/xhtml" data-dce-id="1"><local-storage xmlns="" key="dateKey" slice="date-key" type="date" live="live" data-dce-id="2"/><local-storage xmlns="" key="timeKey" slice="time-key" type="time" live="live" data-dce-id="3"/><local-storage xmlns="" key="localDateTimeKey" slice="local-date-time" type="datetime-local" live="live" data-dce-id="4"/><local-storage xmlns="" key="numberKey" slice="number-key" type="number" live="live" data-dce-id="5"/><local-storage xmlns="" key="jsonKey" slice="json-key" type="json" live="live" data-dce-id="6"/><input xmlns="" id="typesinput" placeholder="set value" data-dce-id="7"/><button xmlns="" onclick="&#10;                        'dateKey,timeKey,localDateTimeKey,numberKey,jsonKey'.split(',')&#10;                            .map( k=&gt; localStorage.setItem(k, typesinput.value) )&#10;                    " data-dce-id="8"> set to all</button><br xmlns="" data-dce-id="9"/><hr xmlns="" data-dce-id="10"/><dce-text xmlns="" data-dce-id="11">
                date-key:
                    </dce-text><button xmlns="" onclick="localStorage.setItem('dateKey', '2024-04-20T03:58:42.131Z')" data-dce-id="12">2024-04-21T03:58:42.131Z           </button><button xmlns="" onclick="localStorage.setItem('dateKey', new Date(Date.now()).toISOString())" data-dce-id="13">now                                </button><button xmlns="" onclick="localStorage.setItem('dateKey', 'ABC'  )" data-dce-id="14">date ABC - invalid                 </button><code xmlns="" data-dce-id="15"><xsl:value-of select="//date-key       "/></code><br xmlns="" data-dce-id="16"/><dce-text xmlns="" data-dce-id="17">
                time-key:
                    </dce-text><button xmlns="" onclick="localStorage.setItem('timeKey', '13:30')" data-dce-id="18">13:30                              </button><code xmlns="" data-dce-id="19"><xsl:value-of select="//time-key       "/></code><br xmlns="" data-dce-id="20"/><dce-text xmlns="" data-dce-id="21">
                local-date-time:
                    </dce-text><button xmlns="" onclick="localStorage.setItem('localDateTimeKey', '1977-04-01T14:00:30')" data-dce-id="22">21977-04-01T14:00:30 - local       </button><code xmlns="" data-dce-id="23"><xsl:value-of select="//local-date-time"/></code><br xmlns="" data-dce-id="24"/><dce-text xmlns="" data-dce-id="25">
                number-key:
                    </dce-text><button xmlns="" onclick="localStorage.setItem('numberKey', '2024')" data-dce-id="26">2024 - number                      </button><button xmlns="" onclick="localStorage.setItem('numberKey', '24')" data-dce-id="27">24   - number                      </button><code xmlns="" data-dce-id="28"><xsl:value-of select="//number-key     "/></code><br xmlns="" data-dce-id="29"/><fieldset xmlns="" data-dce-id="30"><legend data-dce-id="31">json-key: </legend><button onclick="localStorage.setItem('jsonKey', jsonStringSample)" data-dce-id="32"> a:1,b:'B' - json                  </button><xsl:apply-templates xmlns:xsl="http://www.w3.org/1999/XSL/Transform" select="//json-key/value/@*" mode="json"/></fieldset></dce-root></xsl:template>
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
<xsl:template xmlns:xsl="http://www.w3.org/1999/XSL/Transform" mode="json" match="*|@*"><div xmlns="" data-dce-id="33"><xsl:value-of select="name()"/> : <xsl:value-of select="."/></div></xsl:template></xsl:stylesheet>