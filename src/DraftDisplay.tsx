import React, {createContext} from 'react';
import {View} from 'react-native';
import type {
  RawDraftContentState,
  DraftBlockType,
  RawDraftContentBlock,
} from 'draft-js';
import DraftText from './DraftText';

export interface Props {
  contentState: RawDraftContentState;
  blockHandlers?: Record<
    DraftBlockType,
    (props: {block: RawDraftContentBlock}) => React.ReactElement
  >;
}

export const DraftDisplayContext = createContext<{
  getContentState?: () => RawDraftContentState;
}>({});

/**
 * Top-level element
 * Takes contentState and renders it according to configuration
 * contentState is provided to sub-components via React context
 */
const DraftDisplay: React.FC<Props> = ({contentState, blockHandlers}) => {
  return (
    <DraftDisplayContext.Provider value={{getContentState: () => contentState}}>
      {contentState.blocks.map((block) => {
        const BlockHandler = blockHandlers?.[block.type];
        if (BlockHandler) {
          return (
            <View key={block.key}>
              <BlockHandler block={block} />
            </View>
          );
        }
        switch (block.type) {
          case 'value':
          case 'unstyled':
          case 'paragraph':
          case 'header-one':
          case 'header-two':
          case 'header-three':
          case 'header-four':
          case 'header-five':
          case 'header-six':
          case 'code-block':
            return (
              <View key={block.key}>
                <DraftText block={block} />
              </View>
            );

          default:
            break;
        }
      })}
    </DraftDisplayContext.Provider>
  );
};

export default DraftDisplay;
