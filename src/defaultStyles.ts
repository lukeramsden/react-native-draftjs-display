import {StyleSheet, Platform} from 'react-native';

export const defaultBlockStyles = StyleSheet.create({
  'code-block': {
    backgroundColor: '#cecece',
    fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier New',
    padding: 16,
  },
});

export const defaultInlineStyles = StyleSheet.create({
  BOLD: {
    fontWeight: 'bold',
  },
  ITALIC: {
    fontStyle: 'italic',
  },
  LINK: {
    textDecorationLine: 'underline',
  },
  UNDERLINE: {
    textDecorationLine: 'underline',
  },
  STRIKETHROUGH: {
    textDecorationLine: 'line-through',
  },
  CODE: {
    fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier New',
  },
});
