import React, {useContext} from 'react';
import {Text, TextStyle, TextProps} from 'react-native';
import type {RawDraftContentBlock} from 'draft-js';
import {DraftDisplayContext} from './DraftDisplay';
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
  // const context = useContext(DraftDisplayContext);

  const blockStyle =
    defaultBlockStyles[type as keyof typeof defaultBlockStyles] || {};

  let inner: React.ReactNode;

  const flatInlineStyles = flattenInlineStyles(inlineStyleRanges);
  const textAlignStyle: {textAlign?: TextStyle['textAlign']} = {
    textAlign: (data as any)?.textAlign,
  };

  if (flatInlineStyles.length > 0) {
    // used to render any unstyled text after the end of the string
    let lastCharacterRendered: number = 0;

    inner = flatInlineStyles.map((inlineStyle, idx) => {
      lastCharacterRendered = inlineStyle.offset + inlineStyle.length;
      return (
        <TextComponent
          key={`${key}:${idx}`}
          style={[inlineStyle.style.map((s) => defaultInlineStyles[s])]}
          children={text.substr(inlineStyle.offset, inlineStyle.length)}
        />
      );
    });

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
