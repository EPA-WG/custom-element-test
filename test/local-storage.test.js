import { fixture, expect, aTimeout } from '@open-wc/testing';

import '../src/custom-element.js';
import '../src/local-storage.js';
import defaults, {LocalStorageLive, LocalStorageLoad} from "../stories/local-storage.stories";

const defs = {}; Object.keys(defaults.argTypes).map( k=> defs[k]= defaults.argTypes[k].defaultValue);
const renderStory = async (story) => fixture( story({ ...defs, ...story.args }) );

describe('local-storage', () => {

  it('LocalStorageLoad', async () => {
    const el = await renderStory(LocalStorageLoad);
    expect(localStorage['cherries']).to.equal(`🍒 from localStorage`);
    expect(el.querySelectorAll('ls-test-component').length).to.equal(1);
    const p = el.querySelector('ls-test-component');
    expect(p.innerHTML).to.include('fruits slice: 🍒 from localStorage');
  });

  it('LocalStorageLoad', async () => {
    const el = await renderStory(LocalStorageLive);
    expect(localStorage['basket']).to.equal(`{"cherries": 12, "lemons":1 }`);
    expect(el.querySelectorAll('ls-live-component').length).to.equal(1);
    const p = el.querySelector('ls-live-component');
    expect(p.innerHTML).to.include('cherries');
    expect(p.innerHTML).to.include('lemons');
    expect(p.innerHTML).to.include('<td>12</td>');
    expect(p.innerHTML).to.include('<td>1</td>');
    expect(p.innerHTML).to.include('<th>13</th>');
    localStorage.setItem('basket',`{"apples": 3, "oranges": 2 }`);
    await aTimeout(10);
    expect(p.innerHTML).to.not.include('lemons');
    expect(p.innerHTML).to.include('apples');
    expect(p.innerHTML).to.include('oranges');
    expect(p.innerHTML).to.include('<td>3</td>');
    expect(p.innerHTML).to.include('<td>2</td>');
    expect(p.innerHTML).to.include('<th>5</th>');

  });

});
