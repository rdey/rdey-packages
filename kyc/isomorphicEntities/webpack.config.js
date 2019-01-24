const path = require('path');
const fs = require('fs');

module.exports = {
  entry: ['./entry.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'entry.js'),
        ],
        exclude: /(node_modules|bower_components|dist)/,
        use: {
          loader: 'babel-loader',
          options: JSON.parse(
            fs.readFileSync(path.resolve(__dirname, '.babelrc')),
          ),
        },
      },
    ],
  },
  performance: {
    hints: false,
  },
  // externals: {
  //   'rxjs/operators': 'commonjs2 rxjs/operators',
  //   reselect: 'commonjs2 reselect',
  //   'redux-observable': 'commonjs2 redux-observable',
  //   rxjs: 'commonjs2 rxjs',
  //   invariant: 'commonjs2 invariant',
  //   'uuid/v4': 'commonjs2 uuid/v4',
  //   redux: 'commonjs2 redux',
  //   'lodash/flatten': 'commonjs2 lodash/flatten',
  //   'lodash/fromPairs': 'commonjs2 lodash/fromPairs',
  //   'lodash/identity': 'commonjs2 lodash/identity',
  //   luxon: 'commonjs2 luxon',
  //   'query-string': 'commonjs2 query-string',
  // },
};
