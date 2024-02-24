import { fixture, expect, aTimeout } from '@open-wc/testing';

import '../src/custom-element.js';
import defaults, {
    EmbeddedDce,
    HtmlById,
    HtmlTemplate,
    NoSvg,
    NoTag, Svg,
    TemplateInPage, Xsl, XsltById,

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
    expect(el.querySelector('custom-element').getAttribute('tag')).to.not.equal('');
    expect(el.innerHTML).to.include(`🏗️ construction`);
  });
  it('src=svg', async () => {
    Svg.args.src='/src/demo/confused.svg';
    const el = await renderStory(Svg);
    await aTimeout(100)

    expect(el.querySelectorAll('my-component').length).to.equal(0);
    expect(el.querySelector('custom-element').firstElementChild.localName.startsWith('dce-')).to.equal(true);
    expect(el.querySelector('custom-element').getAttribute('tag')).to.not.equal('');
    expect(el.querySelectorAll('svg').length).to.equal(1);
  });

  it('src=404', async () => {
    NoSvg.args.src='/src/demo/404.svg';
    const el = await renderStory(NoSvg);
    await aTimeout(100)

    expect(el.querySelectorAll('my-component').length).to.equal(0);
    expect(el.querySelector('custom-element').getAttribute('tag')).to.not.equal('');
    expect(el.querySelectorAll('svg').length).to.equal(0);
    expect(el.innerText).to.include('fallback for missing image');
  });

  it('src=xsl', async () => {
    Xsl.args.src='/src/demo/tree.xsl';
    const el = await renderStory(Xsl);
    await aTimeout(100)
    expect(el.innerText).to.include('data-smile');
    expect(el.innerText).to.include('👼');
    expect(el.innerText).to.include('attr-1\na1');
    expect(el.innerText).to.include('attr-2\na2');
  });

  it('src=html', async () => {
    const el = await renderStory(HtmlTemplate);
    await aTimeout(1000)
    expect(el.innerHTML).to.include('<svg');
    expect(el.innerText).to.include('👋');
    expect(el.innerText).to.include('👌');
  });

  it('src=html#id', async () => {
    const el = await renderStory(HtmlById);
    await aTimeout(100)
    expect(el.innerText).to.include('👋');
  });

  it('src=xhtml#xslt-id', async () => {
    const el = await renderStory(XsltById);
    await aTimeout(100)
    expect(el.innerText).to.include('data-smile');
    expect(el.innerText).to.include('👼');
    expect(el.innerText).to.include('attr-1\na1');
    expect(el.innerText).to.include('attr-2\na2');
  });

  it('src= with embedded src ', async () => {
    const el = await renderStory(EmbeddedDce);
    await aTimeout(100)
    expect(el.innerText).to.include('🖖');
  });

});
