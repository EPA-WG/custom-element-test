import { rest } from './msw.js'
// import { rest } from '@bundled-es-modules/msw'
// const rest = window.MockServiceWorker.rest;
// import '@bundled-es-modules/msw/lib/iife/index.js';

import pokemonsMock from "../../stories/pokemons.mock";

export const handlers =
[   rest.get("*/api/v2/pokemon", (req, res, ctx) =>
    {
        return res(ctx.json(pokemonsMock));
    }),
    rest.get("*/api/v2/noreturn", (req, res, ctx) =>
            {
                return new Promise(()=>{}); // res(ctx.json(pokemonsMock));
            }),
    rest.get('/user/:userId', (req, res, ctx) =>
    {   return res(
          ctx.json({
            firstName: 'John',
            lastName: 'Maverick',
          }),
        )
    })
];
