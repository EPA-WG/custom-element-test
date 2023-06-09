import '../src/custom-element.js';
import svgFile from '../src/demo/confused.svg';

export default
{   title: 'SRC attribute', component: 'custom-element', argTypes:
    {        title: { control: 'text', defaultValue: 'Template from same page DOM' }
    ,          src: { control: 'text', defaultValue: '#template1' }
    ,          tag: { control: 'text', defaultValue: 'my-component' }
    ,         slot: { control: 'text', defaultValue: `` }
    ,      payload: { control: 'text', defaultValue: `payload ignored by template` }
    }
};

function Template( { title, tag , src, slot, payload, ceAttr, tagAttr } )
{
    return `
        <fieldset>
            <legend>${ title }</legend>
<template id="template1">
    🏗️ construction
</template>

            <custom-element
                src="${src}"
                tag="${ tag }"
                ${ceAttr || ''}
                >${ slot }</custom-element>
            ${ tag ? `<${ tag } ${tagAttr ||''}>${ payload }</${ tag }>` :'' }
      </fieldset>
  `;
}

export const TemplateInPage = Template.bind( {} );

export const NoTag = Template.bind( {} );
NoTag.args =
{     title: 'No tag would instantiate DCE inline, the template in page DOM'
,       src: '#template1'
,       tag: ''
};

export const Svg = Template.bind( {} );
Svg.args =
{   title: 'external SVG file'
,     src: svgFile
,     tag: ''
,    slot: `loading from SVG`
, payload: ``
};

export const NoSvg = Template.bind( {} );
NoSvg.args =
{   title: 'external SVG file'
,     src: '404-url'
,     tag: ''
,    slot: `<i>fallback for missing image</i>`
, payload: ``
};

export const Xsl = Template.bind( {} );
Xsl.args =
{   title: 'external XSLT file'
,     src: 'tree.xsl'
,     tag: ''
    , ceAttr : ` data-smile="👼" attr-1="a1" attr-2="a2" `
,    slot: `loading from XSL`
, payload: ``
};

export const NamedDefaultSlot = Template.bind( {} );
NamedDefaultSlot.args =
{   title: 'two named default slot'
,     tag: 'dce-3-slot'
,    slot: `#1 <slot name=""> 😃</slot> <br/>
            #2 <slot name=""> 😃</slot>`
, payload: `<i slot="">🥕</i>`
};


export const NamedUnnamedDefaultSlot = Template.bind( {} );
NamedUnnamedDefaultSlot.args =
{   title: 'named and un-named default slot'
,     tag: 'dce-4-slot'
,    slot: `#1 <slot name=""> 😃</slot> <br/>
            #2 <slot> 😃</slot>`
, payload: `<i slot="">🥕</i>`
};

export const DefaultSlot = Template.bind( {} );
DefaultSlot.args =
{   title: 'default slot'
,     tag: 'greet-element'
,    slot: `<slot> Hello </slot> World!`
, payload: `👋`
};

export const TemplateWithAttributesAndCondition = Template.bind( {} );
TemplateWithAttributesAndCondition.args =
{      title: '💪 DCE template'
,        tag: 'pokemon-tile'
,       slot: `
<template>
    <h3><xsl:value-of select="title"></xsl:value-of></h3> <!-- title is an attribute in instance
                                                 mapped into /*/attributes/title -->
    <xsl:if test="//smile">                 <!-- data-smile DCE instance attribute,
                                                 mapped into /*/dataset/smile
                                                 used in condition -->
                                            <!-- data-smile DCE instance attribute, used as HTML -->
        <div>Smile as: <xsl:value-of select="//smile"></xsl:value-of></div>
    </xsl:if>
    <!-- image would not be visible in sandbox, see live demo -->
    <img src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/{pokemon-id}.svg" alt="{title} image">
                                            <!-- image-src and title are DCE instance attributes,
                                                 mapped into /*/attributes/
                                                 used within output attribute via curly brackets -->

                                            <!-- \`slot name=xxx\` replaced with elements with \`slot=xxx\` attribute -->
    <p><slot name="description"><i>description is not available</i></slot></p>
    <xsl:for-each select="//*[@pokemon-id]">
                                            <!-- loop over payload elements with \`pokemon-id\` attribute -->
        <button>
            <img height="32"
                src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/{@pokemon-id}.svg"
                alt="{text()}"/>
            <br/>
            <xsl:value-of select='text()'/>
        </button>

    </xsl:for-each>
</template>
`
, payload: `<p slot="description">Bulbasaur is a cute Pokémon born with a large seed firmly affixed to its back;
                the seed grows in size as the Pokémon  does.</p>
            <ul>
                <li pokemon-id="2">ivysaur</li>
                <li pokemon-id="3">venusaur</li>
            </ul>
`
};
