import '../src/custom-element.js';
import '../src/http-request.js';
// import {rest} from "msw";

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
            <legend>http-request simple</legend>
            <custom-element
                tag="${ tag }"
                hidden
                >
<template><!-- wrapping into template to prevent images loading within DCE declaration -->
    <http-request
        url="${url}"
        slice="${slice}"
        ></http-request>
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

    export const
LifecycleInitialized = ()=>`
        <fieldset>
            <legend>http-request no response</legend>
            <p> Before the data become available the <b>request</b>
                is populated into dedicated <b>slice</b>
            </p>
            <custom-element
                tag="no-responce"
                hidden
                >
<template><!-- wrapping into template to prevent images loading within DCE declaration -->
    <http-request
        url="https://pokeapi.co/api/v2/noreturn"
        slice="request-slice"
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
// LifecycleInitialized.parameters =
// {   msw:
//     {   handlers:
//         [   rest.get("*/api/v2/noreturn", (req, res, ctx) =>
//             {
//                 return new Promise(()=>{}); // res(ctx.json(pokemonsMock));
//             }),
//         ],
//     }
//
//
// }
