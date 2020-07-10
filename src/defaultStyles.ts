import {StyleSheet, Platform} from 'react-native';

export const defaultBlockStyles = StyleSheet.create({
  unstyled: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  paragraph: {
    fontSize: 14,
    fontWeight: 'normal',
    marginBottom: 2,
  },
  'header-one': {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 8,
  },
  'header-two': {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 9,
    marginBottom: 7,
  },
  'header-three': {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 6,
  },
  'header-four': {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 7,
    marginBottom: 5,
  },
  'header-five': {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 4,
  },
  'header-six': {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 3,
  },
  'unordered-list-item': {
    fontSize: 14,
    fontWeight: 'normal',
  },
  'ordered-list-item': {
    fontSize: 14,
    fontWeight: 'normal',
  },
  'code-block': {
    backgroundColor: '#cecece',
    fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier New',
    padding: 16,
  },
  blockquote: {
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'italic',
    marginLeft: 16,
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
