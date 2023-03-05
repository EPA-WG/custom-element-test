import { initialize, mswDecorator } from "msw-storybook-addon";
import { rest } from "msw";
import pokemonsMock from "../stories/pokemons.mock";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        sort: 'requiredFirst',
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    msw: {
        handlers: [
            rest.get("*/api/v2/pokemon", (req, res, ctx) => {
                return res(ctx.json(pokemonsMock));
            }),
        ],
    },
};

// Initialize MSW
initialize();

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator];
// export const decorators = [];
