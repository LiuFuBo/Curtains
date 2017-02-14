const path = require('path');
const commonWebpack = require('./webpack.config.common');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(commonWebpack, {
  output: {
    path: path.resolve(__dirname, '../web_front/public/assets'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[name]-[id]-chunk.js',
    publicPath: '/'
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?modules=true&importLoaders=2&localIdentName=[name]__[local]',
          'postcss-loader',
          'sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
        ]
      },
    ]
  },

  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        pathRewrite: {"^/api" : ""}
      }
    },
    contentBase: path.resolve(__dirname, '../web_front/public'),
    publicPath: '/',
    open: false,
    historyApiFallback: true
  }
});