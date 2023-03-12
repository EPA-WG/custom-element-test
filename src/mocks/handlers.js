import { rest } from 'msw'

import pokemonsMock from "../../stories/pokemons.mock";

export const handlers =
[   rest.get("*/api/v2/pokemon", (req, res, ctx) =>
    {
        return res(ctx.json(pokemonsMock));
    }),
    rest.get("*/noreturn", (req, res, ctx) =>
            {   console.log(req.url, 'trapped')
                return new Promise((resolve)=>{ setTimeout(()=>
                {   console.log(req.url, 'resolving')
                    resolve(res(ctx.json(pokemonsMock)))
                }, 10000)}); // 1 second to be able to catch the initial state before the full data returned;
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
