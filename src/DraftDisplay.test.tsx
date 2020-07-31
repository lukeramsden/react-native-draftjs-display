import 'react-native';

import React from 'react';
import renderer from 'react-test-renderer';

import DraftDisplay from './DraftDisplay';
import {RawDraftContentState} from 'draft-js';

it('renders header blocks and inline styles correctly', () => {
  const contentState: RawDraftContentState = {
    blocks: [
      {
        key: '34b77',
        data: {
          textAlign: 'center',
          textAlignment: 'center',
        },
        text: 'Centered header',
        type: 'header-one',
        depth: 0,
        entityRanges: [],
        inlineStyleRanges: [],
      },
      {
        key: 'b62v5',
        data: {
          textAlign: 'right',
          textAlignment: 'right',
        },
        text: 'Right header',
        type: 'header-two',
        depth: 0,
        entityRanges: [],
        inlineStyleRanges: [],
      },
      {
        key: '9p9a5',
        data: {
          textAlign: 'justify',
        },
        text: 'Justified header',
        type: 'header-three',
        depth: 0,
        entityRanges: [],
        inlineStyleRanges: [],
      },
      {
        key: '9kknd',
        data: {
          textAlign: 'left',
        },
        text: 'Left header',
        type: 'header-three',
        depth: 0,
        entityRanges: [],
        inlineStyleRanges: [],
      },
      {
        key: '516td',
        data: {},
        text: '',
        type: 'header-three',
        depth: 0,
        entityRanges: [],
        inlineStyleRanges: [],
      },
      {
        key: '3h18a',
        data: {},
        text: 'Bold italic strikethrough underline all',
        type: 'unstyled',
        depth: 0,
        entityRanges: [],
        inlineStyleRanges: [
          {
            style: 'BOLD',
            length: 4,
            offset: 0,
          },
          {
            style: 'BOLD',
            length: 3,
            offset: 36,
          },
          {
            style: 'ITALIC',
            length: 6,
            offset: 5,
          },
          {
            style: 'ITALIC',
            length: 3,
            offset: 36,
          },
          {
            style: 'STRIKETHROUGH',
            length: 13,
            offset: 12,
          },
          {
            style: 'STRIKETHROUGH',
            length: 3,
            offset: 36,
          },
          {
            style: 'UNDERLINE',
            length: 9,
            offset: 26,
          },
          {
            style: 'UNDERLINE',
            length: 3,
            offset: 36,
          },
        ],
      },
    ],
    entityMap: {},
  };

  const tree = renderer
    .create(<DraftDisplay contentState={contentState} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("doesn't cut off text before first style or after last style", () => {
  const contentState: RawDraftContentState = {
    blocks: [
      {
        key: '4cfq6',
        data: {},
        text:
          '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
        type: 'paragraph',
        depth: 1,
        entityRanges: [],
        inlineStyleRanges: [
          {style: 'UNDERLINE', length: 4, offset: 23},
          {style: 'ITALIC', length: 12, offset: 163},
        ],
      },
    ],
    entityMap: {},
  };

  const tree = renderer
    .create(<DraftDisplay contentState={contentState} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
