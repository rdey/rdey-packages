const { readFileSync } = require('fs');
const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    dev: ['babel-polyfill', resolve(__dirname, './src/entry.js')],
    index: [resolve(__dirname, './src/entry.js')],
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
    path: resolve(__dirname, 'dist'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'main.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // include: [
        //   resolve(__dirname, 'src'),
        //   resolve(__dirname, 'node_modules/@rdey/kyc-components'),
        // ],
        use: {
          loader: 'babel-loader',
          options: JSON.parse(readFileSync(resolve(__dirname, '.babelrc'))),
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: './',
            },
          },
          'css-loader',
        ],
      },
    ],
  },
  target: 'node',
  externals: [
    {
      axios: 'commonjs axios',
    },
  ],
  // externals: [nodeExternals()]
};
