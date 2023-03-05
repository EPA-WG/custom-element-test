import '../src/custom-element.js';
import '../src/http-request.js';

export default
{   title: 'http-request', component: 'http-request'
,   argTypes:
    {          tag: { control: 'text', defaultValue: 'hr-test-component' }
    // http-request props
    ,        slice: { control: 'text', type: { name: 'string', required: true }, defaultValue: `page` }
    }
};

function Template( { title, tag , slice } )
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
        url="https://pokeapi.co/api/v2/pokemon?limit=6"
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
HttpRequestSimple = Template.bind( {} );

    export const
HttpRequestJson = ()=>`
        <fieldset>
            <legend>http-request type=text</legend>
            <custom-element
                tag="json-from-api"
                hidden
                >
<template><!-- wrapping into template to prevent images loading within DCE declaration -->
    <http-request
        url="https://pokeapi.co/api/v2/pokemon?limit=6"
        slice="jsonslice"
        type="text"
        ></http-request>
    <xsl:for-each select="//slice/jsonslice/data/results/*">
        <xsl:variable name="pokeid"
            select="substring-before( substring-after( @url, 'https://pokeapi.co/api/v2/pokemon/'),'/')"
            ></xsl:variable>
        <button>
            <xsl:value-of select='@name'/>
        </button>
    </xsl:for-each>
</template>
            </custom-element>
            <json-from-api></json-from-api>
      </fieldset>

`;
