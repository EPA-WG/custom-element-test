import { fixture, expect } from '@open-wc/testing';

import '../src/custom-element.js';
import defaults, {
    NoTag,
    TemplateInPage,

} from '../stories/src-attribute.stories.js';

const defs = {}; Object.keys(defaults.argTypes).map( k=> defs[k]= defaults.argTypes[k].defaultValue);
const renderStory = async (story) => fixture( story({ ...defs, ...story.args }) );

describe('src attribute', () => {
  it('#template1, Template from same page DOM', async () => {
    const el = await renderStory(TemplateInPage);

    expect(el.querySelectorAll('my-component').length).to.equal(1);
    expect(el.querySelector('my-component').innerHTML).to.include(`🏗️ construction`);
  });
  it('#template1, Template from same page DOM', async () => {
    const el = await renderStory(NoTag);

    expect(el.querySelectorAll('my-component').length).to.equal(0);
    expect(el.querySelector('custom-element').firstElementChild.tagName.startsWith('DCE-')).to.equal(true);
    expect(el.querySelector('custom-element').getAttribute('tag')).to.equal('');
    expect(el.innerHTML).to.include(`🏗️ construction`);
  });


});
