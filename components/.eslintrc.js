module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: {
    browser: true,
  },
  rules: {
    'arrow-parens': ['error', 'always'],
    'arrow-body-style': [2, 'as-needed'],
    'import/no-extraneous-dependencies': 0,
    'react/jsx-filename-extension': 0,
    'implicit-arrow-linebreak': 0,
    'react/require-default-props'
  },
};
