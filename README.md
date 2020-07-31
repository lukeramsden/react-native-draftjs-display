# react-native-draftjs-display

![CI](https://github.com/lukeramsden/react-native-draftjs-display/workflows/CI/badge.svg) [![CodeFactor](https://www.codefactor.io/repository/github/lukeramsden/react-native-draftjs-display/badge)](https://www.codefactor.io/repository/github/lukeramsden/react-native-draftjs-display)

Barebones React Native component to display Draft.js content.

Partly forked from [jdponomarev/react-native-draftjs-render](https://github.com/jdponomarev/react-native-draftjs-render), with the original code coming from [globocom/react-native-draftjs-render](https://github.com/globocom/react-native-draftjs-render). Re-written to use TypeScript, and to better fit in with my use-case.

This library is intentionally very minimal to allow you to use your own components (or a component kit like material design) and styling easily, and as such has very few defaults in that regard.

## Usage

```tsx
// Use DraftText but with our own text component, or one from a UI kit.
const TextBlockHandler = useCallback(
  (category: string) => ({block}: {block: DraftContentBlock}) => (
    <DraftText
      block={block}
      TextComponent={(props) => <MyCustomText {...props} category={category} />}
    />
  ),
  [],
);
// ...
<>
  {data.getPost?.content && (
    <DraftDisplay
      contentState={JSON.parse(data.getPost.content)}
      blockHandlers={{
        // This is where the magic happens. Use this to render your content block types.
        atomic: ({block}) => <PostMediaBlock block={block} />,
        'header-one': TextBlockHandler('h1'),
        'header-two': TextBlockHandler('h2'),
        'header-three': TextBlockHandler('h3'),
        'header-four': TextBlockHandler('h4'),
        'header-five': TextBlockHandler('h5'),
        'header-six': TextBlockHandler('h6'),
        paragraph: TextBlockHandler('p1'),
        unstyled: TextBlockHandler('p1'),
        // see below, "List Handlers"
        'ordered-list-item': OrderedListBlockHandler(),
        'unordered-list-item': UnorderedListBlockHandler(),
      }}
    />
  )}
</>;
```

### List Handlers

This library, as of writing, has no list handling functionality or helpers. That may change, but for now, here's my provisional implementation of rendering nested lists:

In these examples, `tw('...')` is from [tailwind-rn](github.com/vadimdemedes/tailwind-rn), and `<ListItem>`, `<Icon>`, and `<Text>` are from [react-native-ui-kitten](github.com/akveo/react-native-ui-kitten). Use this as an example for your own apps.

##### Unordered list

These are easy, as you just render an indent and a prefix icon based on the `block.depth` property.

```tsx
const UnorderedListBlockHandler = useCallback(
  () => ({block}: {block: DraftContentBlock}) => (
    <ListItem
      // ...other properties and styles
      style={[
        // render indent based on `block.depth`
        block.depth === 0
          ? tw('ml-0')
          : block.depth === 1
          ? tw('ml-4')
          : block.depth === 2
          ? tw('ml-8')
          : block.depth === 3
          ? tw('ml-12')
          : block.depth === 4
          ? tw('ml-16')
          : tw('ml-0'),
      ]}
      accessoryLeft={() => (
        <Icon
          // ...again, other proprties and styles
          name={
            // render different icons based on indentation. not strictly necessary, but very pretty!
            block.depth === 0
              ? 'minus-circle'
              : block.depth === 1
              ? 'minus-circle-outline'
              : block.depth === 2
              ? 'minus-square'
              : block.depth === 3
              ? 'minus-square-outline'
              : block.depth === 4
              ? 'square'
              : 'minus-circle'
          }
        />
      )}
      title={() => (
        <DraftText
          block={block}
          TextComponent={(props) => <Text {...props} category="p1" />}
        />
      )}
    />
  ),
  [],
);
```

##### Ordered list

Now these are a little more involved, as you need to have your own counter, which counts each depth separately, and then resets between separate lists. Here's my implementation:

```tsx
const OrderedListBlockHandler = useCallback(() => {
  // an array of numbers, with the index being the depth, and the number being the counter
  let listCountersAtDepth: number[] = [];

  return ({
    block,
    prevBlock,
  }: {
    block: DraftContentBlock;
    prevBlock?: DraftContentBlock; // introduced in v1.3.0
  }) => {
    // reset list counter completely if previous block is not a list item
    if (prevBlock && prevBlock.type !== 'ordered-list-item') {
      listCountersAtDepth = [];
    }

    // initialise counter at this block's depth
    if (!listCountersAtDepth[block.depth]) {
      listCountersAtDepth[block.depth] = 0;
    }

    // increase counter
    listCountersAtDepth[block.depth]++;

    return (
      <View
        style={[
          tw('flex flex-row py-1'),
          // same indentation as unordered lists, pretty simple
          block.depth === 0
            ? tw('ml-0')
            : block.depth === 1
            ? tw('ml-4')
            : block.depth === 2
            ? tw('ml-8')
            : block.depth === 3
            ? tw('ml-12')
            : block.depth === 4
            ? tw('ml-16')
            : tw('ml-0'),
        ]}>
        <Text category="p1" style={[tw('pl-0 ml-0 mr-2')]}>
          {/*
            you could just do `listCountersAtDepth[block.depth]` and call it a day,
            but this renders each indentation a different way, to differentiate them

            numberToBase26 does exactly as it sounds, takes a number and turns it in to the alphabet
            with 1 being a, 26 being z, and 27 being aa etc.

            arabicToRoman also does exactly what you'd expect

            the implementation of these is left to the reader (hint: StackOverflow!)

            The `block.depth % 3` is so that it loops, as technically you could have any maximum block.depth,
            but we only have 3 options to display the counter
          */}
          {block.depth % 3 === 0
            ? listCountersAtDepth[block.depth]
            : block.depth % 3 === 1
            ? numberToBase26(listCountersAtDepth[block.depth]).toLowerCase()
            : block.depth % 3 === 2
            ? arabicToRoman(listCountersAtDepth[block.depth]).toLowerCase()
            : listCountersAtDepth[block.depth]}.
        </Text>
        <DraftText
          block={block}
          TextComponent={(props) => <Text {...props} category="p1" />}
        />
      </View>
    );
  };
}, []);
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
