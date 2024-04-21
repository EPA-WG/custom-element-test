import '../src/custom-element.js';
import '../src/local-storage.js';

export default
{   title: 'local-storage', component: 'local-storage', argTypes:
    {        title: { control: 'text', defaultValue: 'read only' }
    ,          tag: { control: 'text', defaultValue: 'ls-test-component' }
    ,         body: { control: 'text', defaultValue: `<value-of select="//slice/fruits/text()"></value-of>` }
    // local-storage props
    ,          key: { control: 'text', type: { name: 'string', required: true }, defaultValue: `cherries` }
    ,        value: { control: 'text', type: { name: 'string', required: true }, defaultValue: `🍒 from localStorage` }
    ,        slice: { control: 'text', type: { name: 'string', required: true }, defaultValue: `fruits` }
    ,         type: { control: 'text', type: { name: 'string', required: true }, defaultValue: `string`, description: 'string|json|input type' }
    ,         live: { control: 'boolean', type: { name: 'boolean', required: true }, defaultValue: false, description: 'string|json|input type' }
    }
,   parameters: { controls: { sort: 'requiredFirst' } },
};

function Template( { title, tag , body, key, value, slice, type, live } )
{
    localStorage.setItem(key,value);
    return `
        <fieldset>
            <legend>${ title }. <code>localStorage[${key}]="${localStorage[key]}</code>"</legend>
            <custom-element
                tag="${ tag }"
                hidden
                >
                <local-storage key="${ key }" slice="${ slice }" type="${type}" ${live?'live':''}></local-storage>
                ${ body }
            </custom-element>
            <${ tag }></${ tag }>
      </fieldset>
  `;
}

export const LocalStorageLoad = Template.bind( {} );
LocalStorageLoad.args =
{
    body: `fruits slice: <value-of select="//slice/fruits/text()"></value-of>`
};

export const LocalStorageLive = Template.bind( {} );
LocalStorageLive.args =
{   title: 'Live update and JSON',
     type: 'json',
     live: true,
      key: 'basket',
    slice: 'basket',
    value: '{"cherries": 12, "lemons":1 }',
      tag: 'ls-live-component',
     body: `<html:table xmlns:html="http://www.w3.org/1999/xhtml">
                <for-each select="//slice/basket/value/@*">
                    <html:tr>
                        <html:th><value-of select="name()"/></html:th>
                        <html:td><value-of select="."/></html:td>
                    </html:tr>
                </for-each>
                <html:tfoot>
                    <html:tr>
                        <html:td><slot>🤔</slot></html:td>
                        <html:th><value-of select="sum(//slice/basket/value/@*)"/></html:th>
                    </html:tr>
                </html:tfoot>
            </html:table>`
};

export const TypeText = ()=>{
    localStorage.setItem('textKey','initial value');
    return `
<fieldset>
    <legend>type="text"</legend>
    <custom-element>
        <template>
            <local-storage key="textKey" slice="text-key" type="text" live="live"></local-storage>
            <button onclick="localStorage.setItem('textKey','text value')">text value</button>
            <button onclick="localStorage.setItem('textKey','another value')">another value</button>
            //text-key: <code>{//text-key}</code>
        </template>
    </custom-element>
</fieldset>
`;
}
