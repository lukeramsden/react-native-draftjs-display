# react-native-draftjs-display

React Native component to render Draft.js EditorState.

Partly forked from [jdponomarev/react-native-draftjs-render](https://github.com/jdponomarev/react-native-draftjs-render), with the original code coming from [globocom/react-native-draftjs-render](https://github.com/globocom/react-native-draftjs-render). Re-written to use TypeScript, and to better fit in with my use-case.

## Development

Clone this repository and install its dependencies:

```bash
git clone https://github.com/lukeramsden/react-native-draftjs-display
cd react-native-draftjs-display
yarn # or npm install, if you're so inclined
```

`yarn run build` builds the library to `dist`, generating two files:

* `dist/react-native-draftjs-display.cjs.js`
    A CommonJS bundle, suitable for use in Node.js, that `require`s the external dependency. This corresponds to the `"main"` field in package.json
* `dist/react-native-draftjs-display.esm.js`
    an ES module bundle, suitable for use in other people's libraries and applications, that `import`s the external dependency. This corresponds to the `"module"` field in package.json

`yarn run dev` builds the library, then keeps rebuilding it whenever the source files change using [rollup-watch](https://github.com/rollup/rollup-watch).

`yarn test` builds the library, then tests it.

## License

[ISC](LICENSE).
