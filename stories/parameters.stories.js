import '../src/custom-element.js';

export default
{   title: 'parameters', component: 'custom-element', argTypes:
    {        title: { control: 'text', defaultValue: 'simple payload' }
    ,          tag: { control: 'text', defaultValue: 'my-component' }
    ,      payload: { control: 'text', defaultValue: `Hi` }
    }
};

function Template( { title, tag , payload } )
{
    return `
        <fieldset>
            <legend>${ title }</legend>
            <custom-element tag="${ tag }" hidden>
                <attribute name="p1" select="//p1 ?? 'def_p1' " ></attribute>
                <attribute name="p2" select="'always_p2'"       ></attribute>
                <attribute name="p3" >default_P3                </attribute>
                p1:{$p1} <br/> p2:{$p2} <br/> p3:{$p3}
            </custom-element>
            ${ payload }
        </fieldset>
  `;
}

export const AttributeDefaults = Template.bind( {} );
AttributeDefaults.args =
{     title: `3 ways to declare DCE attribute default values`
,       tag: 'dce-1'
,   payload: `<dce-1 id="dce1"></dce-1>`
};

export const AttributeObservable = Template.bind( {} );
AttributeObservable.args =
{     title: `overriding attribute default values`
,       tag: 'dce-observable'
,   payload: `<dce-observable id="dce2" p1="123" p2="ignored" p3="P3"></dce-observable>`
};

export const AttributeUse = Template.bind( {} );
AttributeUse.args =
{     title: `overriding attribute default values`
,       tag: 'dce-2'
,   payload: `<dce-2 id="dce2" p1="123" p2="ignored" p3="P3"></dce-2>`
};

export const AttributeChange = Template.bind( {} );
AttributeChange.args =
{     title: `re-render to reflect dynamic attribute change`
,       tag: 'dce-3'
,   payload: `<dce-3 id="dce3" p1="123"></dce-3>
    <button onclick="dce3.setAttribute('p1','changed_P1')">Change p1</button>
    <button onclick="dce3.setAttribute('p2','changed_P2')">Change p2</button>
    <button onclick="dce3.setAttribute('p3','changed_P3')">Change p3</button>
`
};
