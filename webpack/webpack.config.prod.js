const path = require('path');
const commonWebpack = require('./webpack.config.common');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(commonWebpack, {
  output: {
    path: path.resolve(__dirname, '../web_front/public/dist'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id]-chunk.js',
    publicPath: ''
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules=true&importLoaders=2&localIdentName=[name]__[local]&minimize=true&sourceMap=true',
            'postcss-loader',
            'sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
          ]
        })
      }
    ]
  },

  plugins: [
    new UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      comments: false,
    }),
    new CleanWebpackPlugin(['./web_front/public/dist'], {
      root: path.resolve(__dirname, '..')
    }),
    new ExtractTextPlugin('[name]-[chunkhash].min.css'),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../web_front/public/index.html'),
      favicon: path.resolve(__dirname, '../web_front/public/favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ],

  bail: true,

  devtool: 'source-map'
});