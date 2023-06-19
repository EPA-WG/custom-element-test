import '../src/custom-element.js';

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
            <style>svg{max-height: 3rem}</style>
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
,     src: '/src/demo/confused.svg'
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

export const HtmlTemplate = Template.bind( {} );
HtmlTemplate.args =
{   title: 'external HTML template'
,     src: '/src/demo/html-template.html'
,     tag: ''
    , ceAttr : ` data-smile="👼" attr-1="a1" attr-2="a2" `
,    slot: `<i>loading from HTML file ...</i>`
, payload: ``
};

