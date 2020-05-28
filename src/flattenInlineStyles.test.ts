import {flattenInlineStyles} from './flattenInlineStyles';

describe('only inlineStyleRanges', () => {
  it('empty range returns empty array', () => {
    const result = flattenInlineStyles([]);
    expect(result).toEqual([]);
  });

  it('one style only changes structure', () => {
    const mock = [
      {
        style: 'BOLD',
        offset: 0,
        length: 15,
      },
    ];
    const result = flattenInlineStyles(mock as any);
    expect(result).toEqual([
      {
        style: ['BOLD'],
        offset: 0,
        length: 15,
      },
    ]);
  });

  it('two styles in the same range become one item with an array of styles', () => {
    const mock = [
      {
        style: 'BOLD',
        offset: 0,
        length: 15,
      },
      {
        style: 'ITALIC',
        offset: 0,
        length: 15,
      },
      {
        style: 'UNDERLINE',
        offset: 12,
        length: 24,
      },
    ];
    const result = flattenInlineStyles(mock as any);
    const expected = [
      {
        style: ['BOLD', 'ITALIC'],
        offset: 0,
        length: 12,
      },
      {
        style: ['BOLD', 'ITALIC', 'UNDERLINE'],
        offset: 12,
        length: 3,
      },
      {
        style: ['UNDERLINE'],
        offset: 15,
        length: 21,
      },
    ];
    expect(result).toEqual(expected);
  });
});

// describe('only entityRanges', () => {
//   it('with one link renders correctly', () => {
//     const mock = [
//       {
//         key: 0,
//         offset: 0,
//         length: 15,
//       },
//     ];
//     const expected = [
//       {
//         key: 0,
//         offset: 0,
//         length: 15,
//         style: 'link',
//       },
//     ];
//     const result = flattenInlineStyles(mock as any);
//     expect(result).toEqual(expected);
//   });
//   it('links doesnt change offset but receive link style', () => {
//     const mock = [
//       {
//         key: 0,
//         offset: 0,
//         length: 15,
//       },
//       {
//         key: 1,
//         offset: 56,
//         length: 60,
//       },
//     ];
//     const expected = [
//       {
//         key: 0,
//         offset: 0,
//         length: 15,
//         style: 'link',
//       },
//       {
//         key: 1,
//         offset: 56,
//         length: 60,
//         style: 'link',
//       },
//     ];
//     const result = flattenInlineStyles(mock as any);
//     expect(result).toEqual(expected);
//   });
// });

// describe('with inlineStyleRanges and entityRanges', () => {
//   it('a style and a link in the same range merge into one object', () => {
//     const mock = [
//       {
//         style: 'ITALIC',
//         offset: 0,
//         length: 15,
//       },
//       {
//         key: 0,
//         offset: 0,
//         length: 15,
//       },
//     ];
//     const result = flattenInlineStyles(mock as any);
//     const expected = [
//       {
//         key: 0,
//         style: ['ITALIC', 'link'],
//         offset: 0,
//         length: 15,
//       },
//     ];
//     expect(result).toEqual(expected);
//   });

//   it('two styles and a link in the same range merge into one object', () => {
//     const mock = [
//       {
//         style: 'ITALIC',
//         offset: 0,
//         length: 15,
//       },
//       {
//         style: 'STRIKETHROUGH',
//         offset: 0,
//         length: 15,
//       },
//       {
//         key: 0,
//         offset: 0,
//         length: 15,
//       },
//     ];
//     const result = flattenInlineStyles(mock as any);
//     const expected = [
//       {
//         key: 0,
//         style: ['ITALIC', 'STRIKETHROUGH', 'link'],
//         offset: 0,
//         length: 15,
//       },
//     ];
//     expect(result).toEqual(expected);
//   });
// });
