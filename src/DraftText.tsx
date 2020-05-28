import React, {useContext} from 'react';
import {Text} from 'react-native';
import type {RawDraftContentBlock} from 'draft-js';
import {DraftDisplayContext} from './DraftDisplay';
import {defaultBlockStyles} from './defaultStyles';

export interface Props {
  block: RawDraftContentBlock;
}

const DraftText: React.FC<Props> = ({
  block: {type, text, inlineStyleRanges},
}) => {
  const context = useContext(DraftDisplayContext);

  const blockStyle =
    defaultBlockStyles[type as keyof typeof defaultBlockStyles] || {};

  return <Text style={[blockStyle]}>{text}</Text>;
};

export default DraftText;
