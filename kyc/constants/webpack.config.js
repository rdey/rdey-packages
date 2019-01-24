const path = require('path');

module.exports = {
  entry: './entry.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  externals: {
    invariant: 'commonjs2 invariant',
    'lodash/fromPairs': 'commonjs2 lodash/fromPairs',
    luxon: 'commonjs2 luxon',
  },
};
