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
    marginTop: 22,
    marginBottom: 22,
  },
  'header-two': {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  'header-three': {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 19,
    marginBottom: 19,
  },
  'header-four': {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 21,
    marginBottom: 21,
  },
  'header-five': {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 22,
    marginBottom: 22,
  },
  'header-six': {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 25,
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
