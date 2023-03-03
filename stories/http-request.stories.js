import '../src/custom-element.js';
import '../src/http-request.js';
import {rest} from "msw";
import pokemonsMock from "./pokemons.mock";

// import * as mswjs from 'msw/lib/node/index.js';
//       console.log(mswjs);
//       debugger;

export default
{   title: 'http-request', component: 'http-request', argTypes:
    {        title: { control: 'text', defaultValue: 'read only' }
    ,          tag: { control: 'text', defaultValue: 'hr-test-component' }
    ,         body: { control: 'text', defaultValue: `<xsl:value-of select="//slice/fruits/text()"></xsl:value-of>` }
    // http-request props
    ,          key: { control: 'text', type: { name: 'string', required: true }, defaultValue: `cherries` }
    ,        value: { control: 'text', type: { name: 'string', required: true }, defaultValue: `🍒 from localStorage` }
    ,        slice: { control: 'text', type: { name: 'string', required: true }, defaultValue: `fruits` }
    ,         type: { control: 'text', type: { name: 'string', required: true }, defaultValue: `string`, description: 'string|json|input type' }
    ,         live: { control: 'boolean', type: { name: 'boolean', required: true }, defaultValue: false, description: 'string|json|input type' }
    }
// ,   parameters:
//     {   controls: { sort: 'requiredFirst' },
//         msw:
//         {  handlers:
//             [   rest.get('*/api/v2/pokemon', (req, res, ctx) =>
//                 {
//                     return res( ctx.json(pokemonsMock));
//                 })
//             ]
//         }
//     }
};

function Template( { title, tag , slice, type, live } )
{
    return `
        <fieldset>
            <legend>${ title }</legend>
            <custom-element
                tag="${ tag }"
                hidden
                >
  <template><!-- wrapping into template to prevent images loading within DCE declaration -->
    <http-request
        url="../stories/pokemons.mock.js"
        slice="page"
        ></http-request>
    <xsl:for-each select="//slice/page/data/results/*">
        <xsl:variable name="slides-url"
            >https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world</xsl:variable>
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

export const HttpRequestSimple = Template.bind( {} );
