import {fixture, expect, aTimeout, oneEvent} from '@open-wc/testing';

import '../src/custom-element.js';
import defaults, {
    EventWithinSlice,
    SliceInitializationChangeOnEvent
} from "../stories/data-slices.stories";

const defs = {};
Object.keys(defaults.argTypes).map(k => defs[k] = defaults.argTypes[k].defaultValue);
const renderStory = async (story) => fixture(story({...defs, ...story.args}));

const $ = (css, node) => node.querySelector(css);

describe('mouse events', () =>
{
    it('B. event within slice', async () =>
    {   // works only in manual mode with breakpoint after render
        const el = await renderStory(EventWithinSlice);
        const X = $('var',el);
        const Y = $('code',el);
        const input = $('textarea',el);
        const validateValue = async (x,y)=>
        {   await aTimeout(20);
            expect(X.innerText).to.equal(x);
            // if( Y.innerText !== y){debugger}
            // expect(Y.innerText).to.equal(y);
        };

        await validateValue('','')
        const emitXy = ( x, y, eventName ) =>
        {   const ev = new MouseEvent(eventName,
            {
                screenX:  x,
                screenY:  y,
                clientX:  x,
                clientY:  y,
                offsetX:  x,
                offsetY:  y,
              }) ;

            input.dispatchEvent( ev );
        };

        emitXy(10,20,'click');
        await validateValue('x:10','20');
        emitXy(30,40,'click');
        await validateValue('x:30','40');
    });
});
