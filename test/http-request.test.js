import { fixture, expect, aTimeout } from '@open-wc/testing';

import '../src/custom-element.js';
import '../src/http-request.js';
import defaults, {HttpRequestSimple} from "../stories/http-request.stories";

const defs = {}; Object.keys(defaults.argTypes).map( k=> defs[k]= defaults.argTypes[k].defaultValue);
const renderStory = async (story) => fixture( story({ ...defs, ...story.args }) );

describe('http-request', () =>
{
    it('http-request init', async () =>
    {
        const el = await renderStory(HttpRequestSimple);
        expect(el.querySelectorAll('hr-test-component').length).to.equal(1);
        await aTimeout(200);
        expect(el.querySelectorAll('hr-test-component button').length).to.equal(6);
        expect(el.querySelector('hr-test-component button').innerText).to.equal('bulbasaur');
  });

});
