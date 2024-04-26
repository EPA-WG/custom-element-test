import { fixture, expect, aTimeout } from '@open-wc/testing';

import '../src/custom-element.js';
import '../src/local-storage.js';
import defaults, {
    AlwaysOverride,
    LocalStorageLive,
    LocalStorageLoad, TypeDate, TypeDateTimeLocal, TypeJson, TypeNumber,
    TypeText, TypeTime, WithDefault
} from "../stories/local-storage.stories";
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

  it('0. read localStorage text value', async () => {
    localStorage.setItem('textKey',`initial value`);
    const el = await renderStory(TypeText);
    await aTimeout(10);
    expect(localStorage['textKey']).to.equal(`initial value`);

    const code = el.querySelector('code');
    expect(code.innerText).to.equal('initial value');

    localStorage.setItem('textKey',`updated`);
    await aTimeout(10);
    expect(code.innerText).to.equal('updated');

    localStorage.removeItem('textKey');
    await aTimeout(10);
    expect(code.innerText).to.equal('');
  });

  it('1. always override', async () => {
    localStorage.setItem('textKey',`initial value`);
    const el = await renderStory(AlwaysOverride);
    await aTimeout(10);
    expect(localStorage['overrideKey']).to.equal(`ABC`);

    const code = el.querySelector('code');
    expect(code.innerText).to.equal('ABC');

    localStorage.setItem('overrideKey',`updated`);
    await aTimeout(10);
    expect(code.innerText).to.equal('ABC');

    localStorage.removeItem('overrideKey');
    await aTimeout(10);
    expect(code.innerText).to.equal('ABC');
  });

  it('Default value', async () => {
    const el = await renderStory(WithDefault);
    await aTimeout(10);
    expect(localStorage['attr2Key']).to.be.undefined;
    expect(localStorage['attr3Key']).to.equal('AB');

    expect(el.querySelector('#c1').innerText).to.equal('DEF');
    expect(el.querySelector('#c2').innerText).to.equal('AB' );
    localStorage.clear();
    await aTimeout(10);
    expect(el.querySelector('#c1').innerText).to.equal('DEF');
    expect(el.querySelector('#c2').innerText).to.equal('ABC' );
  });

  it('type=date', async () => {
    const el = await renderStory(TypeDate);
    await aTimeout(10);
    const code = el.querySelector('code');

    expect(localStorage['dateKey']).to.be.undefined;
    expect(code.innerText).to.equal('');

    localStorage.setItem('dateKey', '2024-04-20T03:58:42.131Z');
    await aTimeout(10);
    expect(code.innerText).to.equal('2024-04-20');

    localStorage.setItem('dateKey', '2024-04-20T03:58:42.131Z');
    await aTimeout(10);
    expect(code.innerText).to.equal('2024-04-20');
    const d = new Date(Date.now());
    localStorage.setItem('dateKey', d.toISOString());
    await aTimeout(10);
    expect(code.innerText).to.equal(d.toISOString().substring(0,10));

    localStorage.setItem('dateKey', 'ABC');
    await aTimeout(10);
    expect(code.innerText).to.equal('');
  });

  it('type=time', async () => {
    const el = await renderStory(TypeTime);
    await aTimeout(10);
    const code = el.querySelector('code');

    expect(localStorage['timeKey']).to.be.undefined;
    expect(code.innerText).to.equal('');

    localStorage.setItem('timeKey', '15:59');
    await aTimeout(10);
    expect(code.innerText).to.equal('15:59');

    localStorage.setItem('timeKey', '25:59');
    await aTimeout(10);
    expect(code.innerText).to.equal('');

    localStorage.setItem('timeKey', 'ABC');
    await aTimeout(10);
    expect(code.innerText).to.equal('');

    localStorage.setItem('timeKey', '00:00');
    await aTimeout(10);
    expect(code.innerText).to.equal('00:00');
  });

  it('type=datetime-local', async () => {
    const el = await renderStory(TypeDateTimeLocal);
    await aTimeout(10);
    const code = el.querySelector('code');

    expect(localStorage['localDateTimeKey']).to.be.undefined;
    expect(code.innerText).to.equal('');

    localStorage.setItem('localDateTimeKey', '1977-04-01T14:00:30');
    await aTimeout(10);
    expect(code.innerText).to.equal('1977-04-01T14:00:30');

    localStorage.setItem('localDateTimeKey', 'ABC');
    await aTimeout(10);
    expect(code.innerText).to.equal('');

    localStorage.setItem('localDateTimeKey', '1977-04-01T14:00:30');
    await aTimeout(10);
    expect(code.innerText).to.equal('1977-04-01T14:00:30');
  });

  it('type=number', async () => {
    const el = await renderStory(TypeNumber);
    await aTimeout(10);
    const code = el.querySelector('code');

    expect(localStorage['numberKey']).to.be.undefined;
    expect(code.innerText).to.equal('');

    localStorage.setItem('numberKey', '2024');
    await aTimeout(10);
    expect(code.innerText).to.equal('2024');

    localStorage.setItem('numberKey', '12.345');
    await aTimeout(10);
    expect(code.innerText).to.equal('12.345');

    localStorage.setItem('numberKey', '1.23456e+5');
    await aTimeout(10);
    expect(code.innerText).to.equal('123456');

    localStorage.setItem('numberKey', 'ABC');
    await aTimeout(10);
    expect(code.innerText).to.equal('NaN');

    localStorage.setItem('numberKey', '000');
    await aTimeout(10);
    expect(code.innerText).to.equal('0');
  });

  it('type=json', async () => {
    const el = await renderStory(TypeJson);
    await aTimeout(10);
    const code = el.querySelector('code');

    expect(localStorage['jsonKey']).to.be.undefined;
    expect(code.innerText).to.equal('');

    localStorage.setItem('jsonKey', JSON.stringify('ABC'));
    await aTimeout(10);
    expect(code.innerText).to.equal('ABC');

    localStorage.setItem('jsonKey', JSON.stringify(12.345));
    await aTimeout(10);
    expect(code.innerText).to.equal('12.345');

    localStorage.setItem('jsonKey', JSON.stringify(window.JsonSample) );
    await aTimeout(10);
    expect(code.innerText).to.includes('a : 1');
    expect(code.innerText).to.includes('b : B');

    localStorage.setItem('jsonKey', 'ABC'); // error leads to blank
    await aTimeout(10);
    expect(code.innerText).to.equal('');
  });

});
