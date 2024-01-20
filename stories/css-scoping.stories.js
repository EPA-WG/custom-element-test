import '../src/custom-element.js';

export default
{   title: 'css-scoping', component: 'custom-element', argTypes:
    {        title: { control: 'text', defaultValue: 'simple payload' }
    ,          tag: { control: 'text', defaultValue: 'my-component' }
    ,         slot: { control: 'text', defaultValue: `<slot>Hello World</slot>` }
    ,        style: { control: 'text', defaultValue: `color:green; border:dashed pink;` }
    ,      payload: { control: 'text', defaultValue: `Hi` }
    }
};

function Template( { title, tag , style, slot, payload } )
{
    return `
        <fieldset>
            <legend>${ title }</legend>
            <custom-element tag="${ tag }" hidden>
                <template>
                    <style>
                        ${ style }
                    </style>
                    <u>${ slot }</u>
                </template>
            </custom-element>
            ${ payload }
        </fieldset>
  `;
}
const GREEN = `<b style="color:green">green</b>`
const RED   = `<i style="color:red">red</i>`
export const StyleDoesNotLeak = Template.bind( {} );
StyleDoesNotLeak.args =
{     title: `The default color should stay on label, message in ${GREEN}`
,       tag: 'dce-1'
,   payload: `<dce-1></dce-1>`
};

export const StyleIn2Instances = Template.bind( {} );
StyleIn2Instances.args =
{     title: `The default color should apply ${GREEN} in all instances`
,       tag: 'dce-2'
,   payload: `<dce-2 id="dce21"></dce-2><dce-2 id="dce22"></dce-2>`
};


export const OverrideInPayload = Template.bind( {} );
OverrideInPayload.args =
{     title: `${GREEN} in instance style can be overridden in payload as ${RED}`
,       tag: 'dce-3'
,   payload: `  <dce-3 id="dce32">
                    <template>
                        <style> color:red; </style>
                        <u>red</u>
                    </template>
                </dce-3>
                <dce-3 id="dce31">green</dce-3>   `
};

