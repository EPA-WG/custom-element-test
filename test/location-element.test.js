import {fixture, expect, aTimeout} from '@open-wc/testing';

import '../src/custom-element.js';
import '../src/location-element.js';
import defaults, {
    LocationElementLive,
    LocationElementLoad, LocationElementSrc
} from "../stories/location-element.stories";

const defs = {};
Object.keys(defaults.argTypes).map(k => defs[k] = defaults.argTypes[k].defaultValue);
const renderStory = async (story) => fixture(story({...defs, ...story.args}));

describe('location-element', () => {

    it('LocationElementLoad', async () => {
        window.location.hash = '#abc'
        const el = await renderStory(LocationElementLoad);

        const match = prop =>
            expect(el.innerText).to.include(prop+'\t'+window.location[prop]);
        match('protocol')
        match('host')
        match('hostname')
        match('port')
        match('pathname')
        match('search')
        match('hash')
        match('href')

        const mySearchParams = new URLSearchParams(window.location.search);
        for (const [key, value] of mySearchParams)
        {
            expect(el.innerText).to.include(key+`\t`+value);
        }
    });

    it('LocationElementLive', async () => {
        window.location.hash = '#abc'
        const el = await renderStory(LocationElementLive);

        const match = prop =>
            expect(el.innerText).to.include(prop+`\t`+window.location[prop]);
        match('protocol')
        match('host')
        match('hostname')
        match('port')
        match('pathname')
        match('search')
        match('hash')
        match('href')

        const mySearchParams = new URLSearchParams(window.location.search);
        for (const [key, value] of mySearchParams)
        {
            expect(el.innerText).to.include(key+`\t`+value);
        }
        window.location.hash = '#dce'
        await aTimeout(10);
        expect(el.innerText).to.include(`hash`+`#dce`); // actual change

        match('protocol')
        match('host')
        match('hostname')
        match('port')
        match('pathname')
        match('search')
        match('hash')
        match('href')

    });

    it('LocationElementSrc', async () =>
    {
        const el = await renderStory(LocationElementSrc);
        expect(el.querySelector('location-element').getAttribute('src')).to.equals('https://my.example/?a=1&b=2#3'); // actual change
        expect(el.innerText).to.include(`href`+`https://my.example/?a=1&b=2#3`);
        expect(el.innerText).to.include(`protocol`+`https:`);
        expect(el.innerText).to.include(`host`+`my.example`);
        expect(el.innerText).to.include(`hostname`+`my.example`);
        expect(el.innerText).to.include(`pathname`+`/`);
        expect(el.innerText).to.include(`search`+`?a=1&b=2`);
        expect(el.innerText).to.include(`hash`+`#3`);
        expect(el.innerText).to.include(`a`+`1`);
        expect(el.innerText).to.include(`b`+`2`);
    });

});
