# custom-element-test
test and storybook for [@epa-wg/custom-element](https://github.com/EPA-WG/custom-element) 

[![git][github-image] GitHub][git-url]
| Live demo: [custom-element][demo-url]
| [StoryBook][storybook-url]
| [![coverage][coverage-image]][coverage-url]

## Installation

```bash
npm i custom-element-test
```

## Usage

```html
<script type="module">
  import 'custom-element-test/src/custom-element.js';
</script>

<custom-element-test></custom-element-test>
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Demoing with Storybook

To run a local instance of Storybook for your component, run

```bash
npm run storybook
```

To build a production version of Storybook, run

```bash
npm run storybook:build
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`

[git-url]:        https://github.com/EPA-WG/custom-element
[github-image]:   https://cdnjs.cloudflare.com/ajax/libs/octicons/8.5.0/svg/mark-github.svg
[demo-url]:       https://unpkg.com/@epa-wg/custom-element-test@0.0.5/dist/index.html
[storybook-url]:  https://unpkg.com/@epa-wg/custom-element-test@0.0.5/storybook-static/index.html?path=/story/welcome--introduction
[coverage-image]: https://unpkg.com/@epa-wg/custom-element-test@0.0.5/coverage/coverage.svg
[coverage-url]:   https://unpkg.com/@epa-wg/custom-element-test@0.0.5/coverage/lcov-report/index.html
