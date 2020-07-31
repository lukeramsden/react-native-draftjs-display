import React, {createContext, useContext} from 'react';
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
    (props: {
      block: RawDraftContentBlock;
      prevBlock?: RawDraftContentBlock;
      nextBlock?: RawDraftContentBlock;
    }) => React.ReactElement
  >;
  customBlockStyles?: {[key: string]: any};
  customInlineStyles?: {[key: string]: any};
}

export const DraftDisplayContext = createContext<{
  getContentState: () => Props['contentState'];
  getCustomBlockStyles: () => Props['customBlockStyles'];
  getCustomInlineStyles: () => Props['customInlineStyles'];
}>({
  getContentState: () => ({blocks: [], entityMap: {}}),
  getCustomBlockStyles: () => ({}),
  getCustomInlineStyles: () => ({}),
});

export const useDraftDisplayContext = () => {
  return useContext(DraftDisplayContext);
};

export const useDraftContentState = () => {
  const ctx = useContext(DraftDisplayContext);
  return ctx.getContentState();
};

/**
 * Top-level element
 * Takes contentState and renders it according to configuration
 * contentState is provided to sub-components via React context
 */
export const DraftDisplay: React.FC<Props> = ({
  contentState,
  blockHandlers,
  customBlockStyles,
  customInlineStyles,
}) => {
  return (
    <DraftDisplayContext.Provider
      value={{
        getContentState: () => contentState,
        getCustomBlockStyles: () => customBlockStyles,
        getCustomInlineStyles: () => customInlineStyles,
      }}>
      {contentState.blocks.map((block, idx, arr) => {
        const BlockHandler = blockHandlers?.[block.type];
        if (BlockHandler) {
          return (
            <View key={block.key}>
              <BlockHandler
                block={block}
                prevBlock={arr[idx - 1]}
                nextBlock={arr[idx + 1]}
              />
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
