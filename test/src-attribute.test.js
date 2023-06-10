import { fixture, expect } from '@open-wc/testing';

import '../src/custom-element.js';
import defaults, {
    NamedDefaultSlot,
    NoSvg,
    NoTag, Svg,
    TemplateInPage, Xsl,

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
  it('src=svg', async () => {
    Svg.args.src='/src/demo/confused.svg';
    const el = await renderStory(Svg);

    expect(el.querySelectorAll('my-component').length).to.equal(0);
    expect(el.querySelector('custom-element').firstElementChild.tagName.startsWith('DCE-')).to.equal(true);
    expect(el.querySelector('custom-element').getAttribute('tag')).to.equal('');
    expect(el.querySelectorAll('svg').length).to.equal(1);
  });

  it('src=404', async () => {
    NoSvg.args.src='/src/demo/404.svg';
    const el = await renderStory(NoSvg);

    expect(el.querySelectorAll('my-component').length).to.equal(0);
    expect(el.querySelector('custom-element').getAttribute('tag')).to.equal('');
    expect(el.querySelectorAll('svg').length).to.equal(0);
    expect(el.innerText).to.include('fallback for missing image');
  });

  it('src=xsl', async () => {
    Xsl.args.src='/src/demo/tree.xsl';
    const el = await renderStory(Xsl);

    expect(el.innerText).to.include('data-smile');
    expect(el.innerText).to.include('👼');
    expect(el.innerText).to.include('attr-1\na1');
    expect(el.innerText).to.include('attr-2\na2');
  });

  it('NamedDefaultSlot', async () => {
    Xsl.args.src='/src/demo/tree.xsl';
    const el = await renderStory(NamedDefaultSlot);

    expect(el.innerText).to.include('data-smile');
    expect(el.innerText).to.include('👼');
    expect(el.innerText).to.include('attr-1\na1');
    expect(el.innerText).to.include('attr-2\na2');
  });


});
