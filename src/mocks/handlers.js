import { rest } from 'msw'

import pokemonsMock from "../../stories/pokemons.mock";

export const handlers =
[   rest.get("*/api/v2/pokemon", (req, res, ctx) =>
    {
        return res(ctx.json(pokemonsMock));
    }),
    rest.get("*/noreturn", (req, res, ctx) =>
            {   return new Promise((resolve)=>{ setTimeout(()=>
                {   resolve(res(ctx.json(pokemonsMock)))
                }, 10000)}); // 1 second to be able to catch the initial state before the full data returned;
            }),
    rest.get("*/reflect", (req, res, ctx) =>
            {
                req.headers.entries().map( ([key,val])=>res.headers.set(key,val));
                return res(ctx.json(pokemonsMock));

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
