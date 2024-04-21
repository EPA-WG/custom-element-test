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
    <p>Pokemon Count: {count(/datadom/slice/${slice}//results)}</p>
    <if test="count(/datadom/slice/${slice}//results) &lt; 0">
        <h3>loading...</h3>
    </if>
    <for-each select="/datadom/slice/${slice}//results">
        <variable name="pokeid"
            select="substring-before( substring-after( @url, 'https://pokeapi.co/api/v2/pokemon/'),'/')"
            ></variable>
        <button>
            <value-of select='@name'/>
        </button>
    </for-each>
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
    <for-each select="//slice/request_slice/value/*">
        <ul>
            <var data-testid="request-section"><value-of select='name(.)'/></var>
            <for-each select="@*">
                <div>
                    <var data-testid="section-attribute">@<value-of select='local-name(.)'/></var>
                    =
                    <code><value-of select='.'/></code>
                </div>
            </for-each>
        </ul>
    </for-each>
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
<tr><th>//slice/request_slice/value/request/headers/@mode</th>
    <td><value-of select="//slice/request_slice/value/request/@mode"/></td></tr>
<tr><th>//slice/request_slice/value/response/headers/@content-type</th>
    <td><value-of select="//slice/request_slice/value/response/headers/@content-type"/></td></tr>
<tr><th>//slice/request_slice/value/response/@status</th>
    <td><value-of select="//slice/request_slice/value/response/@status"/></td></tr>
</table>
<for-each select="//slice/request_slice/value/*">
    <ul data-request-section="{name(.)}">
        <b data-testid="request-section"><value-of select='name(.)'/></b>
        <for-each select="@*">
            <div>
                <var data-testid="section-attribute">@<value-of select='local-name(.)'/></var>
                =
                <code><value-of select='.'/></code>
            </div>
        </for-each>
        <for-each select="*">
            <div>
                <b data-testid="section-deep"><value-of select='local-name(.)'/></b>
                <ul>
                    <for-each select="@*">
                        <li>
                            <var data-testid="section-attribute">@<value-of select='local-name(.)'/></var>
                            =
                            <code><value-of select='.'/></code>
                        </li>
                    </for-each>
                    <code><value-of select='.'/></code>
                </ul>
            </div>
        </for-each>
    </ul>
</for-each>
            </custom-element>
            <headers-demo></headers-demo>
      </fieldset>
`;
RequestResponceHeaders.args =
{   url: "https://pokeapi.co/api/v2/reflect"

};
    // export
    const
GetByUrl = ({url})=>`
        <fieldset>
            <legend>http-request from any URL</legend>
            <p> <b>request</b> headers are populated into dedicated <b>slice/request/headers</b>
            </p>

            <custom-element
                tag="headers-demo"
                hidden
                >

                <button slice="url-string" slice-value="'${url}'" slice-event="click">⬇️${url}</button>
                <input slice="url-string" value="{ //url-string ?? '' }" style="width:100%"/>
                <button slice="fetch-url" slice-event="click" slice-value="//url-string"> GET </button>
<http-request
    url="{//fetch-url}"
    slice="request_slice"
    type="text"
    mode="cors"
    ></http-request>
<code>//fetch-url</code> from <code>{//fetch-url}</code>


            </custom-element>
            <headers-demo></headers-demo>
      </fieldset>
`;
GetByUrl.args =
{   url: "https://pokeapi.co/api/v2/pokemon?limit=6"

};
