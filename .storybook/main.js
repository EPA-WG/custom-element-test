module.exports = {
  "stories": [
    "../stories/welcome.stories.js",
    "../stories/playground.stories.js",
    // "../src/**/*.stories.mdx",
    // "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@whitespace/storybook-addon-html",
  ],
  "framework": "@storybook/web-components",
  "core": {
    "builder": "@storybook/builder-webpack5"
  }
}