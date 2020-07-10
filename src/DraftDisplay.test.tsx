import 'react-native';

import React from 'react';
import renderer from 'react-test-renderer';

import DraftDisplay from './DraftDisplay';
import {RawDraftContentState} from 'draft-js';

it('renders core block and inline styles correctly', () => {
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
