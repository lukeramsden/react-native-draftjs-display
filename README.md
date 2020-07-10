# react-native-draftjs-display

![CI](https://github.com/lukeramsden/react-native-draftjs-display/workflows/CI/badge.svg) [![CodeFactor](https://www.codefactor.io/repository/github/lukeramsden/react-native-draftjs-display/badge)](https://www.codefactor.io/repository/github/lukeramsden/react-native-draftjs-display)

React Native component to display Draft.js content.

Partly forked from [jdponomarev/react-native-draftjs-render](https://github.com/jdponomarev/react-native-draftjs-render), with the original code coming from [globocom/react-native-draftjs-render](https://github.com/globocom/react-native-draftjs-render). Re-written to use TypeScript, and to better fit in with my use-case.

It's quite barebones as I'm only adding functionality I need. Feel free to use this as an example for your own library, and I will review and accept any PRs.

## Usage

```tsx
// Directly from my own codebase
<>
  {data.getPost?.content && (
    <DraftDisplay
      contentState={JSON.parse(data.getPost.content)}
      blockHandlers={{
        atomic: ({block}) => <PostMediaBlock block={block} />, // blockHandlers are optional, I use this for images, audio and video clips
        'header-one': TextBlockHandler, // I should probably add a TextComponent prop to the context. TODO?
        'header-two': TextBlockHandler,
        'header-three': TextBlockHandler,
        'header-four': TextBlockHandler,
        'header-five': TextBlockHandler,
        'header-six': TextBlockHandler,
        paragraph: TextBlockHandler,
        unstyled: TextBlockHandler,
      }}
    />
  )}
</>
```

## Development

Clone this repository and install its dependencies:

```bash
git clone https://github.com/lukeramsden/react-native-draftjs-display
cd react-native-draftjs-display
yarn # or npm install, if you're so inclined
```

`yarn run build` builds the library to `dist`.

`yarn test` builds the library, then tests it.

## License

[ISC](LICENSE).
