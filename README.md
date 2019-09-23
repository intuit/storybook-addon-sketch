# storybook-addon-sketch

Download sketch files straight from storybook.

## Installation

```bash
yarn add -D storybook-addon-sketch
# or
npm i --save storybook-addon-sketch
```

## Configuration

Add the following to your `addons.js`.

```js
import 'storybook-addon-sketch/register';
```

Add the following to your storybook `webpack.config.js`.

```js
module.exports = ({ config }) => {
  config.entry.push(require.resolve('storybook-addon-sketch/entry'));
};
```

And you are all done!

## Options

To configure any options for `storybook-addon-sketch` change your `addons.js` to the following

```js
require('storybook-addon-sketch/register-options')(options);
```

### Stories for Kind

If you want to let your storybook users also download all the default renderings for a story kind (ex: Input).

```js
require('storybook-addon-sketch/register-options')({ kind: true });
```

You will also need to have ran [story2sketch](https://github.com/chrisvxd/story2sketch) with the option `outputBy` set to `kind` and the `output` set to `out/sketch`. This will output all the sketch files to a specific folder that users can download from.
