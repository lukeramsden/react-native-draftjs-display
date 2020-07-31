import React from 'react';
import {Text, TextStyle, TextProps} from 'react-native';
import type {RawDraftContentBlock} from 'draft-js';
import {useDraftDisplayContext} from './DraftDisplay';
import {defaultBlockStyles, defaultInlineStyles} from './defaultStyles';
import {flattenInlineStyles} from './flattenInlineStyles';

export interface DraftTextProps {
  block: RawDraftContentBlock;
  TextComponent?: React.ComponentType<TextProps>;
}

const DefaultTextComponent = Text;

export const DraftText: React.FC<DraftTextProps> = ({
  block: {key, type, text, inlineStyleRanges, data},
  TextComponent = DefaultTextComponent,
}) => {
  const context = useDraftDisplayContext();

  const blockStyle =
    context.getCustomBlockStyles()?.[type as keyof typeof defaultBlockStyles] ||
    defaultBlockStyles[type as keyof typeof defaultBlockStyles] ||
    {};

  let inner: React.ReactNode;

  const flatInlineStyles = flattenInlineStyles(inlineStyleRanges);
  const textAlignStyle: {textAlign?: TextStyle['textAlign']} = {
    textAlign: (data as any)?.textAlign,
  };

  if (flatInlineStyles.length > 0) {
    // used to render any unstyled text before the start of the flattened styles
    let firstCharacterRendered: number = 0;
    // used to render any unstyled text after the end of the string
    let lastCharacterRendered: number = 0;

    inner = flatInlineStyles.map((inlineStyle, idx) => {
      if (idx === 0) {
        firstCharacterRendered = inlineStyle.offset;
      }
      lastCharacterRendered = inlineStyle.offset + inlineStyle.length;
      return (
        <TextComponent
          key={`${key}:${idx}`}
          style={[
            inlineStyle.style.map(
              (s) =>
                context.getCustomBlockStyles()?.[s] || defaultInlineStyles[s],
            ),
          ]}
          children={text.substr(inlineStyle.offset, inlineStyle.length)}
        />
      );
    });

    // add missing characters from the start
    if (firstCharacterRendered !== 0) {
      (inner as JSX.Element[]).unshift(
        <TextComponent
          key={`${key}:first`}
          children={text.substring(0, firstCharacterRendered)}
        />,
      );
    }

    // add rest of unstyled string
    if (text.length !== lastCharacterRendered) {
      (inner as JSX.Element[]).push(
        <TextComponent
          key={`${key}:last`}
          children={text.substring(lastCharacterRendered)}
        />,
      );
    }
  } else {
    inner = text;
  }

  return (
    <TextComponent
      style={[blockStyle, textAlignStyle.textAlign && textAlignStyle]}>
      {inner}
    </TextComponent>
  );
};

export default DraftText;
