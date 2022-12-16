import '../src/custom-element.js';
import allHtml from 'html-loader!../src/index.html';
export default
{   title: 'Welcome'
};

function Template( { title, tag , attributes, slot, payload } )
{
    return allHtml;
}

export const Regular = Template.bind( {} );
