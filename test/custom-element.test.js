import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/custom-element.js';
import defaults, {
    Regular,
    NamedSlot,
    DoubleSlot,
    NamedDefaultSlot,
    NamedUnnamedDefaultSlot,
    DefaultSlot,
    TemplateWithAttributesAndCondition
} from '../stories/playground.stories.js';

const defs = {}; Object.keys(defaults.argTypes).map( k=> defs[k]= defaults.argTypes[k].defaultValue);
const renderStory = async (story) => fixture( story({ ...defs, ...story.args }) );

describe('custom-element', () => {
  it('simple payload', async () => {
    const el = await renderStory(Regular);

    expect(el.querySelectorAll('my-component').length).to.equal(1);
    expect(el.querySelector('my-component').innerHTML).to.include(`Hello World`);
  });
  it('named slot', async () => {
    const el = await renderStory(NamedSlot);

    expect(el.querySelectorAll('dce-1-slot').length).to.equal(1);
    expect(el.querySelector('dce-1-slot').innerHTML).to.equal(`🥕`);
  });
  it('same slot can be used multiple times in template', async () => {
    const el = await renderStory(DoubleSlot);

    expect(el.querySelectorAll('dce-2-slots').length).to.equal(1);
    expect(el.querySelector('dce-2-slots').innerHTML).to.equal(`🥕 and again: 🥕`);
  });
  it('NamedDefaultSlot', async () => {
    const el = await renderStory(NamedDefaultSlot);

    expect(el.querySelectorAll('dce-3-slot').length).to.equal(1);
    expect(el.querySelector('dce-3-slot').innerHTML).to.include(`#1 🥕`);
    expect(el.querySelector('dce-3-slot').innerHTML).to.include(`#2 🥕`);
  });
  it('NamedUnnamedDefaultSlot', async () => {
    const el = await renderStory(NamedUnnamedDefaultSlot);

    expect(el.querySelectorAll('dce-4-slot').length).to.equal(1);
    expect(el.querySelector('dce-4-slot').innerHTML).to.include(`#1 🥕`);
    expect(el.querySelector('dce-4-slot').innerHTML).to.include(`#2 🥕`);
  });
  it('DefaultSlot', async () => {
    const el = await renderStory(DefaultSlot);

    expect(el.querySelectorAll('greet-element').length).to.equal(1);
    expect(el.querySelector('greet-element').innerHTML).to.include(`👋 World!`);
  });

});
