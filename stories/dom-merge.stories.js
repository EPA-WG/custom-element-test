import '../src/custom-element.js';

export default
{   title: 'dom-merge', component: 'custom-element', argTypes:
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

export const TextareaOnBlur = Template.bind( {} );
TextareaOnBlur.args =
{     title: 'Textarea value, type and observe char count update on focus change'
,       tag: ''
,      slot: `  <textarea slice="text-container" >Hello world!</textarea>
                <p> Char count:
                        <b>{string-length(//slice/text-container/text())}</b>
                </p>
                <button> click to focus change </button>
             `
};

export const InputOnChange = Template.bind( {} );
InputOnChange.args =
{     title: 'input value, type and observe char count update on keyup'
,      slot: `  <input type="text"  value="Type time update" slice="txt" slice-update="keyup"/>
                <span> Character count:
                    <b> {string-length(//slice/txt)} </b>
                </span>
                <span> Word count:
                    <i> {string-length(normalize-space(//slice/txt)) -
                        string-length(translate(normalize-space(//slice/txt), ' ', '')) + 1} </i>
                </span>
            `
};
