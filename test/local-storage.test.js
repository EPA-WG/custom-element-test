import { fixture, expect, aTimeout } from '@open-wc/testing';

import '../src/custom-element.js';
import '../src/local-storage.js';
import defaults, {LocalStorageLive, LocalStorageLoad} from "../stories/local-storage.stories";
import {localStorageSetItem} from "../src/local-storage";

const defs = {}; Object.keys(defaults.argTypes).map( k=> defs[k]= defaults.argTypes[k].defaultValue);
const renderStory = async (story) => fixture( story({ ...defs, ...story.args }) );

describe('local-storage', () => {

  it('LocalStorageLoad 1', async () => {
    const el = await renderStory(LocalStorageLoad);
    expect(localStorage['cherries']).to.equal(`🍒 from localStorage`);
    expect(el.querySelectorAll('ls-test-component').length).to.equal(1);
    const p = el.querySelector('ls-test-component');
    expect(p.innerText).to.include('fruits slice: 🍒 from localStorage');
  });

  it('LocalStorageLoad 2', async () => {
    const el = await renderStory(LocalStorageLive);
    await aTimeout(10);
    expect(localStorage['basket']).to.equal(`{"cherries": 12, "lemons":1 }`);
    expect(el.querySelectorAll('ls-live-component').length).to.equal(1);
    const p = el.querySelector('ls-live-component');
    expect(p.innerHTML).to.include('cherries');
    expect(p.innerHTML).to.include('lemons');
    expect(p.innerHTML).to.include('>12</');
    expect(p.innerHTML).to.include('>1</');
    expect(p.innerHTML).to.include('>13</');
    localStorageSetItem('basket',`{"apples": 3, "oranges": 2 }`);
    await aTimeout(10);
    expect(p.innerHTML).to.not.include('lemons');
    expect(p.innerHTML).to.include('apples');
    expect(p.innerHTML).to.include('oranges');
    expect(p.innerHTML).to.include('>3</');
    expect(p.innerHTML).to.include('>2</');
    expect(p.innerHTML).to.include('>5</');

  });

});
