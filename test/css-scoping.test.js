import { fixture, expect, aTimeout } from '@open-wc/testing';

import '../src/custom-element.js';
import defaults, {StyleIn2Instances, StyleDoesNotLeak, OverrideInPayload} from "../stories/css-scoping.stories.js";

const defs = {}; Object.keys(defaults.argTypes).map( k=> defs[k]= defaults.argTypes[k].defaultValue);
const renderStory = async (story) =>
{   const el = await fixture(story({...defs, ...story.args}));
    return  {  el
            ,   $: css => el.querySelector(css)
            ,  $$: css => el.querySelectorAll(css)
            , color: css => window.getComputedStyle(el.querySelector(css), null).getPropertyValue("color")
            }
}
const TXT = "BE CURIOUS, LEARN AND ADOPT KNOWLEDGE, SEEK THE PATH, STATE THE GOALS AND OVERCOME.";

describe('dom-merge', () => {

  it( 'StyleDoesNotLeak', async () => {
    const {el, $,$$,color} = await renderStory(StyleDoesNotLeak);
    expect( color('legend' )        ).to.not.equal(color('b'));
    expect( color('dce-1 u')        ).to    .equal(color('b'));
  });
  it( 'StyleIn2Instances', async () => {
    const {el, $,$$,color} = await renderStory(StyleIn2Instances);
    expect( color('legend' )        ).to.not.equal(color('b'));
    expect( color('#dce21 u')        ).to    .equal(color('b'));
    expect( color('#dce22 u')        ).to    .equal(color('b'));
  });
  it( 'OverrideInPayload', async () => {
    const {el, $,$$,color} = await renderStory(OverrideInPayload);
    expect( color('legend' )        ).to.not.equal(color('b'));
    expect( color('#dce31 u')        ).to    .equal(color('b'));
    expect( color('#dce32 u')        ).to    .equal(color('i'));
  });

});
