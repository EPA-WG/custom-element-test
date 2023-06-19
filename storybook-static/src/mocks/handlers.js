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
            {   const headersMap = {};
                [...req.headers.entries()].map( ([key,val]) => headersMap[key] = val );
                ctx.set(headersMap);
                return res(ctx.json(pokemonsMock));
            })
];
