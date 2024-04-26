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
`};

export const AlwaysOverride = ()=>{
    localStorage.setItem('overrideKey','initial value');
    return `
<fieldset>
    <legend>value="ABC" always override the value of localStorage key</legend>
    <custom-element>
        <template>
            <local-storage key="overrideKey" slice="override-key" type="text" value="ABC"></local-storage>
            <button onclick="localStorage.setItem('overrideKey','text value')">text value</button>
            <button onclick="localStorage.removeItem('attrKey')">clear key</button>
            //override-key: <code>{//override-key}</code>
        </template>
    </custom-element>
</fieldset>
`;
};

export const WithDefault = ()=>{
    localStorage.removeItem('attr2Key');
    localStorage.setItem('attr3Key','AB');
    return `
<fieldset>
    <legend>value="ABC" always override the value of localStorage key</legend>
    <custom-element>
        <template>
            <local-storage key="attr2Key" slice="attr2-key" type="text" live="live" slice-value="@value ?? 'DEF'"></local-storage>
            <local-storage key="attr3Key" slice="attr3-key" type="text" live="live" slice-value="@value ?? 'ABC'"></local-storage>
            <button onclick="localStorage.clear()">clear localStorage</button>
            <button onclick="localStorage.removeItem('attr2Key')">clear key</button>
            <button onclick="localStorage.setItem('attr2Key','text value')">updated value</button><br/>
            //attr2-key: <code id="c1">{//attr2-key}</code> - LS key is initially empty, DCE as initial value<br/>
            //attr3-key: <code id="c2">{//attr3-key}</code> - LS key value is AB, default is ignored<br/>
        </template>
    </custom-element>
</fieldset>
`;
};

export const TypeDate= ()=>{
    localStorage.removeItem('dateKey');
    return `
<fieldset>
    <legend>type=date</legend>
    Initially blank. Button sets the LS value. Observe the //date-key value change<br/>
    <custom-element>
        <template>
            <local-storage key="dateKey" slice="date-key" type="date" live="live"></local-storage>

            <button onclick="localStorage.setItem('dateKey', '2024-04-20T03:58:42.131Z')">2024-04-21T03:58:42.131Z  </button>
            <button onclick="localStorage.setItem('dateKey', new Date(Date.now()).toISOString())">now               </button>
            <button onclick="localStorage.setItem('dateKey', 'ABC'  )">date ABC - invalid                           </button><br/>
            date-key:<code>{//date-key       }</code>
        </template>
    </custom-element>
</fieldset>
`};

export const TypeTime= ()=>
{
    localStorage.removeItem( 'timeKey' );
    return `
<fieldset>
    <legend>type=date</legend>
    Initially blank. Button sets the LS value. Observe the //time-key value change<br/>
    <custom-element>
        <template>
            <local-storage key="timeKey" slice="time-key" type="time" live="live"></local-storage>

            <button onclick="localStorage.setItem('timeKey', '13:30')">13:30                </button>
            <button onclick="localStorage.setItem('timeKey', '33:30')">33:30 - invalid      </button>
            <button onclick="localStorage.setItem('dateKey', 'ABC'  )">date ABC - invalid   </button><br/>
            time-key:<code>{//time-key       }</code>
        </template>
    </custom-element>
</fieldset>
`;
};

export const TypeDateTimeLocal= ()=>
{
    localStorage.removeItem( 'localDateTimeKey' );
    return `
<fieldset>
    <legend>type=datetime-local</legend>
    Initially blank. Button sets the LS value. Observe the //local-date-time value change<br/>
    <custom-element>
        <template>
            <local-storage key="localDateTimeKey" slice="local-date-time" type="datetime-local" live="live"></local-storage>

            <button onclick="localStorage.setItem('localDateTimeKey', '1977-04-01T14:00:30')">1977-04-01T14:00:30    </button>
            <button onclick="localStorage.setItem('localDateTimeKey', '33:30')">33:30 - invalid      </button>
            <button onclick="localStorage.setItem('localDateTimeKey', 'ABC'  )">date ABC - invalid   </button><br/>
            local-date-time:<code>{//local-date-time       }</code>
        </template>
    </custom-element>
</fieldset>
`;
};

export const TypeNumber= ()=>
{
    localStorage.removeItem( 'numberKey' );
    return `
<fieldset>
    <legend>type=datetime-local</legend>
    Initially blank. Button sets the LS value. Observe the //number-key value change<br/>
    <custom-element>
        <template>
            <local-storage key="numberKey" slice="number-key" type="number" live="live"></local-storage>

            <button onclick="localStorage.setItem('numberKey', '2024')"         >2024           </button>
            <button onclick="localStorage.setItem('numberKey', '12.345')"       >12.345         </button>
            <button onclick="localStorage.setItem('numberKey', '1.23456e+5'  )" >1.23456e+5  - same as 12345   </button>
            <button onclick="localStorage.setItem('numberKey', 'ABC'  )"        >ABC - invalid  </button><br/>
            number-key:<code>{//number-key       }</code>
        </template>
    </custom-element>
</fieldset>
`;
};

export const TypeJson= ()=>
{
    localStorage.removeItem( 'jsonKey' );
    window.JsonSample = {a:1,b:'B'};
    return `
<fieldset>
    <legend>type=datetime-local</legend>
    Initially blank. Button sets the LS value. Observe the //json-key value change<br/>
    <custom-element>
        <template>
            <local-storage key="jsonKey" slice="json-key" type="json" live="live"></local-storage>

            <button onclick="localStorage.setItem('jsonKey', JSON.stringify('ABC'))"        >'ABC'          </button>
            <button onclick="localStorage.setItem('jsonKey', JSON.stringify(12.345))"       >12.345         </button>
            <button onclick="localStorage.setItem('jsonKey', JSON.stringify(window.JsonSample) )" >a:1,b:'B'    </button>
            <button onclick="localStorage.setItem('jsonKey', 'ABC'  )"                     >ABC - invalid </button><br/>
            json-key:<code><xsl:apply-templates select="//json-key/value/@*|//json-key/text()|//json-key/value/text()" mode="json"></xsl:apply-templates></code>

            <xsl:template mode="json" match="*|@*">
                    <div>{name()} : {.}</div>
            </xsl:template>
        </template>
    </custom-element>
</fieldset>
`;
};
