module.exports = {
    "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
    ],
    "framework": "@storybook/web-components",
    "core": {
        "builder": "@storybook/builder-webpack5"
    },
    staticDirs: [
        {from: '../mockServiceWorker.js', to: '/mockServiceWorker.js'}, // MSW support
        {from: '../src/demo/tree.xsl', to: '/tree.xsl'},
        {from: '../src', to: '/src'}
        // , '../src'
        // , '../static'
        // , {from: '../foo/assets', to: '/assets'}
    ],

}
