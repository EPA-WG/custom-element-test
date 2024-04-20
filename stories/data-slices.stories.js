import '../src/custom-element.js';

export default
{   title: 'Events and data Slice', component: 'custom-element', argTypes:
    {        title: { control: 'text', defaultValue: 'simple aDceTemplate' }
    ,  description: { control: 'text', defaultValue: '' }
    ,      aDceTemplate: { control: 'text', defaultValue: `Hi` }
    }
};

function Template( { title, description, aDceTemplate, tag, dce } )
{
    return `
        <fieldset>
            <legend>${ title }</legend>
            <custom-element ${ tag ? ` tag="${tag}" `:''} >
                <template>
                    ${ aDceTemplate }
                </template>
            </custom-element>
            <hr/><p>${description}</p>
            <hr/>${dce}
        </fieldset>
  `;
}

function demo( title, description, aDceTemplate, tag='', dce='' )
{   const ret = Template.bind( {} );
    ret.args = { title, description, aDceTemplate,tag,dce}
    return ret;
}
export const SliceInitializationChangeOnEvent = demo( `A. slice initialization, change on event`,
'initial value should be 0; + and - should change the number in input field',
`<button slice="clickcount" slice-event="click" slice-value="//clickcount + 1">
        +
    </button>
    <button slice="clickcount" slice-event="click" slice-value="//clickcount - 1">
        -
    </button>
    <input slice="clickcount" type="number" value="{//clickcount ?? 0}"/>
    <code>{//clickcount}</code>
`);

export const EventWithinSlice = demo( `B. event within slice`,
'move the mouse over TEXTAREA and click to see slice and slice event changed',
`
<textarea slice="s" slice-value="concat('x:', //@pageX)" slice-event="mousemove click" style="width:16rem;height:16rem;box-shadow: inset {//@offsetX}px {//@offsetY}px gold;"></textarea><br>
//slice/s : <var>{//slice/s}</var>   <br>
//slice/s/event/@offsetY: <code>{//slice/s/event/@offsetY}</code>  <br>
event type: {//slice/s/event/@type}
`);

export const SliceChangeOnEvent = demo( `1. slice change on event. 1:1 slice⮂value`,
'initial value blank; type and unfocus to see slice changed',
`
<input slice="typed"> //slice/typed : <code>{//slice/typed}</code>
`);

export const InitDefaultEvent = demo( `2. initial slice value, slice change on event. slice⮂value, w/ initial`,
'initial value from input; type and unfocus to see slice changed',
`
<input slice="s" value="{//s ?? 'A'}"> //slice/s : <code>{//slice/s}</code>
`);

export const InitAndKeyUp = demo( `3. initial slice value, slice change on event. slice⮂value, w/ initial`,
'initial value from input; type to see slice changed',
`
<input slice="s" value="{//s ?? 'B'}" slice-event="input"> //slice/s : <code>{//slice/s}</code>
`);

export const InitByAttribute = demo( `4. initial slice value from attribute, slice change on event.`,
'initial value from input; type to see slice changed',
`
<attribute name="a">😁</attribute>
<input slice="s" value="{//s ?? $a}" slice-event="input">
attribute 'a' : {$a}
//slice/s : <code>{//slice/s}</code>
`,'dce-1','<dce-1 id="e1"></dce-1> <dce-1 id="e2" a="🤗"></dce-1>');

export const InitByAttributeChangeByExpression = demo( `5. initial slice value from attribute, slice change on event.`,
'initial value from input as \'xB\'; type and unfocus to see slice changed',
`
<input slice="s" value="{substring(//s, 2) ?? 'B'}" slice-value="concat('x', @value )">
//slice/s : <code>{//slice/s}<code>
`);

export const InitByInputValueByButton = demo( `6. initial slice value from input, button ignored till change on click.`,
'initial value from input as \'anonymous\'; on button click change to \'broccoli\'',
`
<input slice="nickname" value="anonymous">
<button slice="nickname" slice-value="'broccoli'" slice-event="click">🥦</button>
<code>{//nickname}</code>
`);

export const InitBySliceElement = demo( `7. initial slice value from SLICE element, button ignored till change on click.`,
'synthetic SLICE element serves as initial value holder',
`
<button slice="clickcount" slice-event="click tap" slice-value="//clickcount + 1">
    <slice slice="clickcount" value="0"></slice>
     click/tap
</button>
//clickcount : <code>{//clickcount}</code>
`);

export const InitByFewSliceElement = demo( `8. multiple slices by SLICE element, button ignored till change on click.`,
'few synthetic SLICE elements serve as initial value holder',
`
<button>
    <slice slice="clicked" value="{0}"></slice>
    <slice slice="focused" value="{0}"></slice>
    <slice slice-event="click tap" slice="clicked" slice-value="//clicked+1"></slice>
    <slice slice-event="focus" slice="focused" slice-value="1"></slice>
    <slice slice-event="blur" slice="focused" slice-value="0"></slice>
     click/tap, focus/blur
</button> <br>
//clicked : <code>{//clicked}</code> <br/>
//focused : <var>{//focused}</var>
`);

export const SlicePointsAttribute = demo( `9. slice in attribute`,
'initial attribute value should be smile as emoji and :) on blur from input it should be updated from value',
`
<attribute name="emotion" select="//emotion ?? '😃'"></attribute>
<input slice="/datadom/attributes/emotion">
Type and unfocus to update emotion attribute: <code>{emotion}</code>
`,'emotional-element', `
<emotional-element id="e1" emotion=":)"></emotional-element>
<emotional-element id="e2"></emotional-element>
`);
