const path = require('path');
const autoprefixer = require('autoprefixer');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

module.exports = {
  context: path.resolve(__dirname, '..'),

  entry: {
    curtains: './web_front/src/app.js',
    vendor: [
      './web_front/src/vendor',
      'font-awesome-webpack!./webpack/font-awesome.config.js'
    ]
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },

  plugins: [
    new ProvidePlugin({
      'React': 'react'
    }),
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      }
    }),
    new CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new LoaderOptionsPlugin({
      options: {
        context: '/',
        sassLoader: {
          includePaths: [path.resolve(__dirname, 'src', 'scss')]
        },
        postcss: [autoprefixer]
      }
    })
  ],

  resolve: {
    extensions: ['.js', '.css', '.scss'],
    modules: ['node_modules'],
    alias: {
      'component': path.resolve(__dirname, '../web_front/src/component'),
      'container': path.resolve(__dirname, '../web_front/src/container')
    }
  }
};