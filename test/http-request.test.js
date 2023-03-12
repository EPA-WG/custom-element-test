import { fixture, expect, aTimeout } from '@open-wc/testing';

import '../src/custom-element.js';
import '../src/http-request.js';
import defaults, {Demo, LifecycleInitialized} from "../stories/http-request.stories";
import "../src/mocks/browser.js";


const defs = {}; Object.keys(defaults.argTypes).map( k=> defs[k]= defaults.argTypes[k].defaultValue);
const renderStory = async (story) => fixture( story({ ...defs, ...story.args }) );

describe('http-request', () =>
{
    it('http-request happy path', async () =>
    {
        const el = await renderStory(Demo);
        expect(el.querySelectorAll('hr-test-component').length).to.equal(1);
        await aTimeout(200);
        expect(el.querySelectorAll('hr-test-component button').length).to.equal(6);
        expect(el.querySelector('hr-test-component button').innerText).to.equal('bulbasaur');
    });

    it('http-request init', async () =>
    {
        const el = await renderStory(LifecycleInitialized);
        expect(el.querySelectorAll('no-responce').length).to.equal(1);
        await aTimeout(20);
        expect(el.querySelectorAll('[data-testid="request-section"]').length).to.equal(1);
        expect(el.querySelectorAll('[data-testid="section-attribute"]').length).to.equal(1);
        expect(el.querySelector('[data-testid="section-attribute"]').innerText).to.equal('@url');
        expect(el.innerText).to.include('\nrequest');
        expect(el.innerText).not.to.include('\nresponse');
    });
    // todo test for destroy http connection on DCE removal
});
