import '../src/custom-element.js';
import '../src/http-request.js';

export default
{   title: 'http-request', component: 'http-request'
,   argTypes:
    {          tag: { control: 'text', defaultValue: 'hr-test-component' }
    // http-request props
    ,        slice: { control: 'text', type: { name: 'string', required: true }, defaultValue: `page` }
    ,        url: { control: 'text', type: { name: 'string', required: true }, defaultValue: `https://pokeapi.co/api/v2/pokemon?limit=6` }
    }
};

function Template( { title, tag , slice, url } )
{
    return `
        <fieldset>
            <legend>${title}</legend>
            <custom-element
                tag="${ tag }"
                hidden
                >
<template><!-- wrapping into template to prevent images loading within DCE declaration -->
    <http-request
        url="${url}"
        slice="${slice}"
        ></http-request>
    <xsl:if test="not(//slice/${slice}/data/results/*)">
        <h3>loading...</h3>
    </xsl:if>
    <xsl:for-each select="//slice/${slice}/data/results/*">
        <xsl:variable name="pokeid"
            select="substring-before( substring-after( @url, 'https://pokeapi.co/api/v2/pokemon/'),'/')"
            ></xsl:variable>
        <button>
            <xsl:value-of select='@name'/>
        </button>
    </xsl:for-each>
</template>
            </custom-element>
            <${ tag }></${ tag }>
      </fieldset>
  `;
}

    export const
Demo = Template.bind( {} );
Demo.args={title:"url and slice"};

    export const
LifecycleInitialized = ()=>`
        <fieldset>
            <legend>http-request with delayed response</legend>
            <p> Before the data become available the <b>request</b>
                is populated into dedicated <b>slice</b> in <b>10</b> seconds in this demo
            </p>

            <custom-element
                tag="no-responce"
                hidden
                >
<template><!-- wrapping into template to prevent images loading within DCE declaration -->
    <http-request
        url="https://pokeapi.co/api/v2/noreturn"
        slice="request_slice"
        type="text"
        ></http-request>
    Content of <code>//slice/request_slice</code> before <b>response</b> available
    <xsl:for-each select="//slice/request_slice/*">
        <ul>
            <var data-testid="request-section"><xsl:value-of select='name(.)'/></var>
            <xsl:for-each select="@*">
                <div>
                    <var data-testid="section-attribute">@<xsl:value-of select='local-name(.)'/></var>
                    =
                    <code><xsl:value-of select='.'/></code>
                </div>
            </xsl:for-each>
        </ul>
    </xsl:for-each>
</template>
            </custom-element>
            <no-responce></no-responce>
      </fieldset>
`;
    export const
RequestResponceHeaders = ({url})=>`
        <fieldset>
            <legend>http-request headers and responce status and headers</legend>
            <p> <b>request</b> headers are populated into dedicated <b>slice/request/headers</b>
            </p>

            <custom-element
                tag="headers-demo"
                hidden
                >
<http-request
    url="${url}"
    slice="request_slice"
    type="text"
    mode="cors"
    header-x-test="testing"
    ></http-request>
Content of <code>//slice/request_slice</code> is filled by <b>request</b> and <b>response</b>
from <code>${url}</code>

<h3>Samples</h3>
<table>
<tr><th>//slice/request_slice/request/headers/@mode</th>
    <td><xsl:value-of select="//slice/request_slice/request/@mode"/></td></tr>
<tr><th>//slice/request_slice/response/headers/@content-type</th>
    <td><xsl:value-of select="//slice/request_slice/response/headers/@content-type"/></td></tr>
<tr><th>//slice/request_slice/response/@status</th>
    <td><xsl:value-of select="//slice/request_slice/response/@status"/></td></tr>
</table>
<xsl:for-each select="//slice/request_slice/*">
    <ul data-request-section="{name(.)}">
        <b data-testid="request-section"><xsl:value-of select='name(.)'/></b>
        <xsl:for-each select="@*">
            <div>
                <var data-testid="section-attribute">@<xsl:value-of select='local-name(.)'/></var>
                =
                <code><xsl:value-of select='.'/></code>
            </div>
        </xsl:for-each>
        <xsl:for-each select="*">
            <div>
                <b data-testid="section-deep"><xsl:value-of select='local-name(.)'/></b>
                <ul>
                    <xsl:for-each select="@*">
                        <li>
                            <var data-testid="section-attribute">@<xsl:value-of select='local-name(.)'/></var>
                            =
                            <code><xsl:value-of select='.'/></code>
                        </li>
                    </xsl:for-each>
                    <code><xsl:value-of select='.'/></code>
                </ul>
            </div>
        </xsl:for-each>
    </ul>
</xsl:for-each>
            </custom-element>
            <headers-demo></headers-demo>
      </fieldset>
`;
RequestResponceHeaders.args =
{   url: "https://pokeapi.co/api/v2/reflect"

};
