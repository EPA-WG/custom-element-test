import { fixture, expect, aTimeout } from '@open-wc/testing';

import '../src/custom-element.js';
import '../src/http-request.js';
import defaults, {Demo, LifecycleInitialized, RequestResponceHeaders} from "../stories/http-request.stories";
import "../src/mocks/browser.js";


const defs = {}; Object.keys(defaults.argTypes).map( k=> defs[k]= defaults.argTypes[k].defaultValue);
const renderStory = async (story) => fixture( story({ ...defs, ...story.args }) );

describe('http-request', () =>
{
    it('http-request happy path', async () =>
    {
        const el = await renderStory(Demo);
        expect(el.querySelectorAll('hr-test-component').length).to.equal(1);
        await aTimeout(50);
        expect(el.querySelectorAll('hr-test-component button').length).to.equal(6);
        expect(el.querySelector('hr-test-component button').innerText).to.equal('bulbasaur');
    });

    it('http-request init', async () =>
    {
        const el = await renderStory(LifecycleInitialized);
        expect(el.querySelectorAll('no-responce').length).to.equal(1);
        await aTimeout(50);
        expect(el.querySelectorAll('[data-testid="request-section"]').length).to.equal(1);
        const attrs = [...el.querySelectorAll('[data-testid="section-attribute"]')]
        expect(attrs.length).to.equal(3);
        expect(attrs[0].innerText).to.equal('@url');
        expect(attrs[0].nextElementSibling.innerText).to.equal('https://pokeapi.co/api/v2/noreturn');
        expect(attrs[1].innerText).to.equal('@slice');
        expect(attrs[1].nextElementSibling.innerText).to.equal('request_slice');
        expect(attrs[2].innerText).to.equal('@type');
        expect(attrs[2].nextElementSibling.innerText).to.equal('text');
        expect(el.innerText).to.include('\nrequest');
        expect(el.innerText).not.to.include('\nresponse');
    });

    it('http-request headers', async () =>
    {
        const el = await renderStory(RequestResponceHeaders);
        await aTimeout(50);
        const requestSection = el.querySelector('[data-request-section="request"]')
        const responseSection = el.querySelector('[data-request-section="response"]')
        const dataSection = el.querySelector('[data-request-section="data"]')

        expect( requestSection.firstElementChild.innerText).to.equal('request');
        expect(responseSection.firstElementChild.innerText).to.equal('response');
        expect(    dataSection.firstElementChild.innerText).to.equal('data');

        let attr = requestSection.firstElementChild;
        const nextText = ()=> (attr = attr.nextElementSibling).innerText;

        expect( nextText() ).to.equal('@url = https://pokeapi.co/api/v2/reflect');
        expect( nextText() ).to.equal('@slice = request_slice');
        expect( nextText() ).to.equal('@type = text');
        expect( nextText() ).to.equal('@mode = cors');
        expect( nextText() ).to.equal('headers\n@x-test = testing');

        attr = responseSection.firstElementChild;
        expect( nextText() ).to.equal('@ok = true');
        expect( nextText() ).to.equal('@status = 200');
        expect( nextText() ).to.equal('@statustext = OK');
        expect( nextText() ).to.equal('@type = basic');
        expect( nextText() ).to.equal('@url = https://pokeapi.co/api/v2/reflect');
        expect( nextText() ).to.equal('@redirected = false');
        expect( nextText() ).to.equal('headers\n@content-type = application/json\n@x-powered-by = msw');

        attr = dataSection.firstElementChild;
        expect( nextText() ).to.equal('@count = 1279');
        expect( nextText() ).to.equal('@next = https://pokeapi.co/api/v2/pokemon?offset=6&limit=6');
    });
    // todo test for destroy http connection on DCE removal
});
