const path = require('path');
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    'styled-components',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-namespace-from',
  ],
};
