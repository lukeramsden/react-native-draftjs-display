/**
 * Originially flatAttributesList from globocom/react-native-draftjs-render
 */

import {pipe, map, flatten, uniq, sort} from 'ramda';
import type {RawDraftInlineStyleRange, DraftInlineStyleType} from 'draft-js';

export interface DraftInlineStyleRangeMulti {
  style: DraftInlineStyleType[];
  offset: number;
  length: number;
}

export const flattenInlineStyles = (
  inlineStyleRanges: RawDraftInlineStyleRange[],
): DraftInlineStyleRangeMulti[] => {
  if (inlineStyleRanges.length === 0) {
    return [];
  }

  return pipe(
    // maps ranges to array of [offset, offset + length]
    map(({offset, length}: RawDraftInlineStyleRange): number[] => [
      offset,
      offset + length,
    ]),
    flatten,
    uniq,
    sort((a, b) => a - b),
    // create segments
    (numbers: number[]) =>
      numbers.map((number, idx, arr) => ({
        offset: number,
        length: arr[idx + 1] - number,
      })),
    // add style property to segments
    (segments) =>
      segments.map((segment) => {
        const styles = flatten(
          inlineStyleRanges.map(({offset, length, style}) => {
            const segmentLength = segment.offset + segment.length;
            return segmentLength > offset && segmentLength <= offset + length
              ? [style]
              : [];
          }),
        );

        return styles.length
          ? [
              {
                ...segment,
                style: styles,
              },
            ]
          : [];
      }),
    flatten,
  )(inlineStyleRanges);
};
