import 'react-native';

import React from 'react';
import renderer from 'react-test-renderer';

import DraftText from './DraftText';
import type {RawDraftInlineStyleRange} from 'draft-js';

it('renders empty blocks', () => {
  const text = '';
  const tree = renderer
    .create(
      <DraftText
        block={{
          type: 'paragraph',
          text,
          inlineStyleRanges: [],
          entityRanges: [],
          key: 'test',
          depth: 0,
        }}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders text of unknown type omitting default styles', () => {
  const text = 'Hello World';
  const tree = renderer
    .create(
      <DraftText
        block={{
          type: 'unknowntype111222',
          text,
          inlineStyleRanges: [],
          entityRanges: [],
          key: 'test',
          depth: 0,
        }}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders unstyled text', () => {
  const text = 'Hello World';
  const tree = renderer
    .create(
      <DraftText
        block={{
          type: 'paragraph',
          text,
          inlineStyleRanges: [],
          entityRanges: [],
          key: 'test',
          depth: 0,
        }}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders styled text, single block', () => {
  const text = 'Hello World';
  const inlineStyleRanges: RawDraftInlineStyleRange[] = [
    {style: 'BOLD', offset: 0, length: 5},
  ];
  const tree = renderer
    .create(
      <DraftText
        block={{
          type: 'paragraph',
          text,
          inlineStyleRanges,
          entityRanges: [],
          key: 'test',
          depth: 0,
        }}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders styled text, overlapping', () => {
  const text = 'Hello World';
  const inlineStyleRanges: RawDraftInlineStyleRange[] = [
    {style: 'BOLD', offset: 0, length: 5},
    {style: 'ITALIC', offset: 4, length: 4},
  ];
  const tree = renderer
    .create(
      <DraftText
        block={{
          type: 'paragraph',
          text,
          inlineStyleRanges,
          entityRanges: [],
          key: 'test',
          depth: 0,
        }}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders text-align: left', () => {
  const text = 'Hello World';
  const data = {textAlign: 'left'};
  const tree = renderer
    .create(
      <DraftText
        block={{
          type: 'paragraph',
          text,
          data,
          inlineStyleRanges: [],
          entityRanges: [],
          key: 'test',
          depth: 0,
        }}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders text-align: right', () => {
  const text = 'Hello World';
  const data = {textAlign: 'right'};
  const tree = renderer
    .create(
      <DraftText
        block={{
          type: 'paragraph',
          text,
          data,
          inlineStyleRanges: [],
          entityRanges: [],
          key: 'test',
          depth: 0,
        }}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders text-align: center', () => {
  const text = 'Hello World';
  const data = {textAlign: 'center'};
  const tree = renderer
    .create(
      <DraftText
        block={{
          type: 'paragraph',
          text,
          data,
          inlineStyleRanges: [],
          entityRanges: [],
          key: 'test',
          depth: 0,
        }}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
