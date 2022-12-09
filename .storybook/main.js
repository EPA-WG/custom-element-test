module.exports = {
  "stories": [
    "../stories/*.stories.js",
    // "../src/**/*.stories.mdx",
    // "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/web-components",
  "core": {
    "builder": "@storybook/builder-webpack5"
  }
}