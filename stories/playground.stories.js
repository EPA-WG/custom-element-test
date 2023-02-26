import '../src/custom-element.js';

export default
{   title: 'custom-element', component: 'custom-element', argTypes:
    {        title: { control: 'text', defaultValue: 'simple payload' }
    ,          tag: { control: 'text', defaultValue: 'my-component' }
    ,   attributes: { control: 'text', defaultValue: '' }
    ,         slot: { control: 'text', defaultValue: `Hello World` }
    ,      payload: { control: 'text', defaultValue: `🍋` }
    }
};

function Template( { title, tag , attributes, slot, payload } )
{
    return `
        <fieldset>
            <legend>${ title }</legend>
            <custom-element
                tag="${ tag }"
                hidden
                >
                ${ slot }
            </custom-element>
            <${ tag } ${attributes}>${ payload }</${ tag }>
      </fieldset>
  `;
}

export const Regular = Template.bind( {} );

export const NamedSlot = Template.bind( {} );
NamedSlot.args =
{     title: 'named slot'
,       tag: 'dce-1-slot'
,      slot: `<slot name="slot1"> 😃</slot>`
,   payload: `<i slot="slot1">🥕</i>`
};

export const DoubleSlot = Template.bind( {} );
DoubleSlot.args =
{   title: 'same slot can be used multiple times in template'
,     tag: 'dce-2-slots'
,    slot: `<slot name="slot2"> 😃</slot> and again: <slot name="slot2"> 😃</slot>`
, payload: `<i slot="slot2">🥕</i>`
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
, attributes: ` title="bulbasaur" data-smile="👼" pokemon-id="1" `
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
