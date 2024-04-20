import {fixture, expect, aTimeout, oneEvent} from '@open-wc/testing';

import '../src/custom-element.js';
import defaults, {
    EventWithinSlice,
    InitAndKeyUp,
    InitByAttribute,
    InitByAttributeChangeByExpression, InitByFewSliceElement, InitByInputValueByButton, InitBySliceElement,
    InitDefaultEvent,
    SliceChangeOnEvent,
    SliceInitializationChangeOnEvent, SlicePointsAttribute
} from "../stories/data-slices.stories";

const defs = {};
Object.keys(defaults.argTypes).map(k => defs[k] = defaults.argTypes[k].defaultValue);
const renderStory = async (story) => fixture(story({...defs, ...story.args}));

const $ = (css, node) => node.querySelector(css);

describe('data slices and events', () =>
{
    it('A. slice initialization, change on event', async () =>
    {
        const el = await renderStory(SliceInitializationChangeOnEvent);
        const code = $('code',el);
        const input = $('input',el);
        const validateValue = async (v)=>
        {   await aTimeout(20);
            expect(code.innerText).to.equal(v);
            expect(input.value).to.equal(v);
            expect(input.getAttribute('value')).to.equal(v);
        };
        await validateValue('0')
        $('button',el).click();
        await validateValue('1')


        $('button',el).click(); // 2
        await validateValue('2')
        $('button',el).click(); // 3
        await validateValue('3')

        $('button+button',el).click();
        await validateValue('2')
        $('button+button',el).click();
        await validateValue('1')
        $('button+button',el).click();
        await validateValue('0')
        $('button+button',el).click();
        await validateValue('-1')
    });

    it('1. slice change on event. 1:1 slice⮂value', async () =>
    {
        const el = await renderStory(SliceChangeOnEvent);
        const code = $('code', el);
        const input = $('input',el);
        const validateValue = async (v)=>
        {   await aTimeout(20);
            expect(code.innerText).to.equal(v);
            expect(input.value).to.equal(v);
            // expect(input.getAttribute('value')).to.equal(v);
        };
        await validateValue('')
        input.value="abc";
        input.dispatchEvent(new Event('change'));
        await validateValue('abc')
    });

    it('2. initial slice value, slice change on event. slice⮂value, w/ initial', async () =>
    {
        const el = await renderStory(InitDefaultEvent);
        const code = $('code', el);
        const input = $('input',el);
        const validateValue = async (v)=>
        {   await aTimeout(20);
            expect(code.innerText).to.equal(v);
            expect(input.value).to.equal(v);
            // expect(input.getAttribute('value')).to.equal(v);
        };
        await validateValue('A')
        input.value="abc";
        input.dispatchEvent(new Event('change'));
        await validateValue('abc')
    });

    it('3. initial slice value, slice change on event. slice⮂value, w/ initial', async () =>
    {
        const el = await renderStory(InitAndKeyUp);
        const code = $('code', el);
        const input = $('input',el);
        const validateValue = async (v)=>
        {   await aTimeout(20);
            expect(code.innerText).to.equal(v);
            expect(input.value).to.equal(v);
            // expect(input.getAttribute('value')).to.equal(v);
        };

        expect(code.innerText).to.equal('');
        expect(input.value).to.equal('B');
        input.value="DE";
        input.dispatchEvent(new Event('input'));
        await validateValue('DE')
    });

    it('4. initial slice value from attribute, slice change on event.', async () =>
    {
        const el = await renderStory(InitByAttribute);
        const d1 = $('#e1'          , el )
        ,     d2 = $('#e2'          , el )
        ,     i1 = $('#e1 input'    , el )
        ,     i2 = $('#e2 input'    , el );


        expect(d1.innerText).to.include('😁');
        expect(d2.innerText).to.include('🤗');
        expect(i1.value).to.equal('😁');
        expect(i2.value).to.equal('🤗');
        i1.value="AB";
        i1.dispatchEvent(new Event('input'));
        await aTimeout(20);
        expect($('code',d1).innerText).to.equal('AB');
    });

    it('5. initial slice value from attribute, slice change on event.', async () =>
    {
        const el = await renderStory(InitByAttributeChangeByExpression);
        const input = $('input'   , el )
        ,      code = $('code'    , el );


        expect(input.value).to.equal('B');
        expect(code.innerText).to.equal('xB');

        input.value="ABC";
        input.dispatchEvent(new Event('change'));
        await aTimeout(20);
        expect(input.value).to.equal('ABC');
        expect(code.innerText).to.equal('xABC');
    });

    it('6. initial slice value from input, button ignored till change on click.', async () =>
    {
        const el = await renderStory(InitByInputValueByButton);
        const input = $('input'   , el )
        ,      code = $('code'    , el );

        expect(input.value).to.equal('anonymous');
        expect(code.innerText).to.equal('anonymous');

        $('button',el).click()
        await aTimeout(20);
        expect(input.value).to.equal('anonymous');
        expect(code.innerText).to.equal('broccoli');
    });

    it('7. initial slice value from SLICE element, button ignored till change on click.', async () =>
    {
        const el = await renderStory(InitBySliceElement);
        const btn = $('button'   , el )
        ,    code = $('code'     , el );

        expect(code.innerText).to.equal('0');

        btn.click()
        await aTimeout(20);
        expect(code.innerText).to.equal('1');
        btn.dispatchEvent(new Event('tap'));
        await aTimeout(20);
        expect(code.innerText).to.equal('2');
        btn.click()
        await aTimeout(20);
        expect(code.innerText).to.equal('3');
    });

    it('8. multiple slices by SLICE element, button ignored till change on click.', async () =>
    {
        const el = await renderStory(InitByFewSliceElement);
        const btn = $('button'   , el )
        ,    code = $('code'     , el )
        ,   focus = $('var'      , el );

        expect(code.innerText).to.equal('0');
        expect(focus.innerText).to.equal('0');

        btn.dispatchEvent(new Event('focus'));
        await aTimeout(20);
        expect(code.innerText).to.equal('0');
        expect(focus.innerText).to.equal('1');

        btn.click()
        await aTimeout(20);
        expect(code.innerText).to.equal('1');
        expect(focus.innerText).to.equal('1');

        btn.dispatchEvent(new Event('tap'));
        await aTimeout(20);
        expect(code.innerText).to.equal('2');
        expect(focus.innerText).to.equal('1');

        code.click()
        btn.dispatchEvent(new Event('blur'));
        await aTimeout(20);
        expect(code.innerText).to.equal('2');
        expect(focus.innerText).to.equal('0');
    });

    it('9. slice in attribute', async () =>
    {
        const el = await renderStory(SlicePointsAttribute);
        const d1 = $('#e1'          , el )
        ,     d2 = $('#e2'          , el )
        ,     i1 = $('#e1 input'    , el )
        ,     i2 = $('#e2 input'    , el )
        ,     c1 = $('#e1 code'     , el )
        ,     c2 = $('#e2 code'     , el );

        expect(c1.innerText).to.equal(':)');
        expect(c2.innerText).to.equal('');
        expect(i1.value).to.equal(':)');
        expect(i2.value).to.equal('😃');
        expect(d1.getAttribute('emotion')).to.equal(':)');
        expect(d2.getAttribute('emotion')).to.equal('😃');

        i1.value="AB";
        i1.dispatchEvent(new Event('change'));
        await aTimeout(20);
        expect(c1.innerText).to.equal('AB');
        expect(c2.innerText).to.equal('');
        expect(i1.value).to.equal('AB');
        expect(d1.getAttribute('emotion')).to.equal('AB');
        expect(d2.getAttribute('emotion')).to.equal('😃');
    });
});
