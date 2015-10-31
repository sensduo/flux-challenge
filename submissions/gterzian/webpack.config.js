var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    './src/index',
  ],
  output: {
    path: './dist',
    filename: 'index.js',
  },
  module: {
      loaders: [
        {
          test: /.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
};
