const path = require('path');
const fs = require('fs');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'index.js'),
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
  externals: {
    react: 'commonjs2 react',
    'styled-components': 'commonjs2 styled-components',
    'react-dom': 'commonjs2 react-dom',
    lodash: 'commonjs2 lodash',
    'prop-types': 'commonjs2 prop-types',
  },
};
