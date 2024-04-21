import { rest } from 'msw'

import pokemonsMock from "../../stories/pokemons.mock";

const resolveAsPokemons = (res,ctx) => res(ctx.json(pokemonsMock));

export const handlers =
[   rest.get("*/api/v2/pokemon", (req, res, ctx) =>
    {
        return res(ctx.json(pokemonsMock));
    }),
    rest.get("*/noreturn", (req, res, ctx) =>
            {   return new Promise((resolve)=>{ setTimeout(()=> resolve( resolveAsPokemons(res,ctx) ), 10000)});
                // 10 seconds to be able to catch the initial state before the full data returned;
            }),
    rest.get("*/reflect", (req, res, ctx) =>
            {   const headersMap = {};
                [...req.headers.entries()].map( ([key,val]) => headersMap[key] = val );
                ctx.set(headersMap);
                return resolveAsPokemons(res,ctx);
            })
];
