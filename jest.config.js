module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    '^.+\\.tsx?$': 'ts-jest',
  },

  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
    },
  },
  moduleNameMapper: {
    '^react-native$': require.resolve('react-native'),
  },
  modulePathIgnorePatterns: ['/dist/'],
};
