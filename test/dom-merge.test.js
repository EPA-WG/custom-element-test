import { fixture, expect, aTimeout } from '@open-wc/testing';

import '../src/custom-element.js';
import defaults, {TextareaOnBlur, InputOnChange} from "../stories/dom-merge.stories.js";

const defs = {}; Object.keys(defaults.argTypes).map( k=> defs[k]= defaults.argTypes[k].defaultValue);
const renderStory = async (story) =>
{   const el = await fixture(story({...defs, ...story.args}));
    return  {  el
            ,   $: css => el.querySelector(css)
            ,  $$: css => el.querySelectorAll(css)
            , txt: css => el.querySelector(css).innerText
            }
}
const TXT = "BE CURIOUS, LEARN AND ADOPT KNOWLEDGE, SEEK THE PATH, STATE THE GOALS AND OVERCOME.";

describe('dom-merge', () => {

  it('LocalStorageLoad slice init from value', async () => {
    const {el, $,$$,txt} = await renderStory(TextareaOnBlur);
    expect( txt('textarea')        ).to.equal(`Hello world!`);
    expect( $('textarea').value    ).to.equal(`Hello world!`);
    await aTimeout(10); // wait for update from slice
    expect( txt('b')               ).to.equal(`Hello world!`.length+'' );
  });

  it('LocalStorageLoad slot change on blur', async () => {
      const {el, $,$$,txt} = await renderStory(TextareaOnBlur);
      await aTimeout(10); // wait for update from slice
      expect( txt('b') ).to.equal(`Hello world!`.length+'' );
      const ta = $('textarea');
      ta.value = TXT;
      ta.dispatchEvent( new Event('change') );
      await aTimeout(10); // wait for update from slice
      expect( txt('b') ).to.equal(TXT.length+'' );
  });

  it('input value, type and observe char count update on keyup', async () => {
      const {el, $,$$,txt} = await renderStory(InputOnChange);
      await aTimeout(10); // wait for update from slice
      expect( txt('b[data-dce-id]') ) // from instance instead of in-template
          .to.equal('16' );
      expect( txt('i[data-dce-id]') ) // from instance instead of in-template
          .to.equal('3' );
      const ta = $('input[data-dce-id]');
      ta.value = TXT;
      ta.dispatchEvent( new Event('input') );
      await aTimeout(10); // wait for update from slice
      expect( txt('b[data-dce-id]') ).to.equal(TXT.length+'' );
  });

});
