module.exports = {
    "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@whitespace/storybook-addon-html"
    ],
    "framework": "@storybook/web-components",
    "core": {
        "builder": "@storybook/builder-webpack5"
    },
    staticDirs: ['../public'
        // , '../static', {from: '../foo/assets', to: '/assets'}
    ],

}
