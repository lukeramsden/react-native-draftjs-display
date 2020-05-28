import React, {useContext} from 'react';
import {Text} from 'react-native';
import type {RawDraftContentBlock} from 'draft-js';
import {DraftDisplayContext} from './DraftDisplay';
import {defaultBlockStyles, defaultInlineStyles} from './defaultStyles';
import {flattenInlineStyles} from './flattenInlineStyles';

export interface Props {
  block: RawDraftContentBlock;
}

const DraftText: React.FC<Props> = ({
  block: {key, type, text, inlineStyleRanges},
}) => {
  // const context = useContext(DraftDisplayContext);

  const blockStyle =
    defaultBlockStyles[type as keyof typeof defaultBlockStyles] || {};

  let inner;

  const flatInlineStyles = flattenInlineStyles(inlineStyleRanges);

  if (flatInlineStyles.length > 0) {
    console.log(flatInlineStyles);
    inner = flatInlineStyles.map((inlineStyle, idx) => {
      return (
        <Text
          key={`${key}:${idx}`}
          style={[inlineStyle.style.map((s) => defaultInlineStyles[s])]}>
          {text.substr(inlineStyle.offset, inlineStyle.length)}
        </Text>
      );
    });
  } else {
    inner = text;
  }

  return <Text style={[blockStyle]}>{inner}</Text>;
};

export default DraftText;
