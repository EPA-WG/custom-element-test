import {fixture, expect, aTimeout} from '@open-wc/testing';

import '../src/custom-element.js';
import defaults, {
    AttributeChange,
    AttributeDefaults,
    AttributeFromSlice,
    AttributeObservable,
    AttributeUse
} from "../stories/parameters.stories";

const defs = {};
Object.keys(defaults.argTypes).map(k => defs[k] = defaults.argTypes[k].defaultValue);
const renderStory = async (story) => fixture(story({...defs, ...story.args}));

const $ = (css, node) => node.querySelector(css);

describe('DCE attributes definition', () =>
{
    it('Binding to DCE class, defaults ', async () =>
    {
        const el = await renderStory(AttributeDefaults);
        const attrs = window.customElements.get('dce-1').observedAttributes;

        expect(attrs.length).to.equal(3);
        expect(attrs).to.include(`p1`);
        expect(attrs).to.include(`p2`);
        expect(attrs).to.include(`p3`);

        const dce1 = $('#dce1',el);
        expect(dce1.innerText).to.include('p1:def_p1');
        expect(dce1.innerText).to.include('p2:always_p2');
        expect(dce1.innerText).to.include('p3:default_P3');

    });

    it('attributes override', async () =>
    {
        const el = await renderStory(AttributeUse);

        const dce2 = $('#dce2',el);
        expect(dce2.innerText).to.include('p1:123');
        expect(dce2.innerText).to.include('p2:always_p2');
        expect(dce2.innerText).to.include('p3:P3');
    });


    it('observed attributes propagation', async () =>
    {
        const el = await renderStory(AttributeObservable);
        const clazz = window.customElements.get('dce-observable');
        expect(clazz.observedAttributes.length).to.equal(3);
        expect(clazz.observedAttributes).to.include('p1');
        expect(clazz.observedAttributes).to.include('p2');
        expect(clazz.observedAttributes).to.include('p3');
    });

    it('dynamic attributes change', async () =>
    {
        const el = await renderStory(AttributeChange);

        const dce3 = $('#dce3',el);
        expect(dce3.innerText).to.include('p1:123');
        expect(dce3.innerText).to.include('p2:always_p2');
        expect(dce3.innerText).to.include('p3:default_P3');

        dce3.setAttribute('p1','changed_p1');
        expect(dce3.innerText).to.include('p1:changed_p1');

        dce3.setAttribute('p2','changed_p2'); // does not affect as select="'always_p2'' sets it explicitly
        expect(dce3.innerText).to.include('p2:always_p2');

        dce3.setAttribute('p3','changed_p3');
        expect(dce3.innerText).to.include('p3:changed_p3');

    });

    it('slice to attribute', async () =>
    {
        const el = await renderStory(AttributeFromSlice);

        const dce = $('custom-element>*',el);
        expect(dce.hasAttribute('title')).to.equal(true);
        expect(dce.getAttribute('title')).to.equal('😃');
        const input = $('input',dce);
        input.value = "abc";
        input.dispatchEvent(new KeyboardEvent('keyup', {'key': 'c'}));
        await aTimeout(10);
        expect(dce.getAttribute('title')).to.equal('abc');
    });

});
