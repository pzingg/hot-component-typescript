# hot-component-typescript

An experiment to create a WebComponent for the Handsontable CE open source
JavaScript spreadsheet. I'm also trying to learn how to use TypeScript!

Built on the  Elm TypeScript Starter project from Dillon Kearns:
https://github.com/dillonkearns/elm-typescript-starter

Tweaked to remove elm-typescript-interop build step.

Webpack configure was changed to produce ES6 output. ES5 output is not compatible
for extending HTMLElement classes, as far as I know.


## Setup

1. Make sure you have [Elm 0.19 installed](https://guide.elm-lang.org/install.html) on your
system. In webpack.config.js, I am assuming that it's installed locally--
the `pathToElm` option for elm-webpack-loader is set to `node_modules/.bin/elm`. If you
install Elm 0.19 globally, remove the `pathToElm` options.

2. Install npm packages:

  ```bash
  npm install
  ```

3. Start a local dev server

  ```bash
  npm start
  ```
  Load http://localhost:8080/

  -- OR --

  Bundle files for production:
  ```bash
  npm run build # transpiles all your Elm and ts into dist/bundle.js
  ```
