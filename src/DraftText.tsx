import React, {useContext} from 'react';
import {Text, TextStyle} from 'react-native';
import type {RawDraftContentBlock} from 'draft-js';
import {DraftDisplayContext} from './DraftDisplay';
import {defaultBlockStyles, defaultInlineStyles} from './defaultStyles';
import {flattenInlineStyles} from './flattenInlineStyles';

export interface Props {
  block: RawDraftContentBlock;
}

const DraftText: React.FC<Props> = ({
  block: {key, type, text, inlineStyleRanges, data},
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
        <Text
          key={`${key}:${idx}`}
          style={[inlineStyle.style.map((s) => defaultInlineStyles[s])]}
          children={text.substr(inlineStyle.offset, inlineStyle.length)}
        />
      );
    });

    if (text.length !== lastCharacterRendered) {
      (inner as JSX.Element[]).push(
        <Text
          key={`${key}:last`}
          children={text.substring(lastCharacterRendered)}
        />,
      );
    }
  } else {
    inner = text;
  }

  return (
    <Text style={[blockStyle, textAlignStyle.textAlign && textAlignStyle]}>
      {inner}
    </Text>
  );
};

export default DraftText;
