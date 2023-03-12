import { initialize, mswDecorator } from "msw-storybook-addon";

import './common.css';
import {handlers} from "../src/mocks/handlers";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        sort: 'requiredFirst',
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    msw: {handlers},
};

// Initialize MSW
initialize();

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator];
// export const decorators = [];
