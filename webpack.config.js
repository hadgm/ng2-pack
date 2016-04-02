const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

// it is npm script name
const TARGET = process.env.NPM_LIFECYCLE_EVENT;

const PATH = {
  app: path.resolve(__dirname, 'app'),
  vendor: path.resolve(__dirname, 'vendors.ts'),
  polyfill: path.resolve(__dirname, 'polyfills.ts'),
  build: path.resolve(__dirname, 'build'),
};

const commonConfig = {
  entry: {
    polyfills: PATH.polyfill,
    vendor: PATH.vendor,
    app: PATH.app,
  },

  output: {
    path: PATH.build,
    filename: '[name].bundle.js',
  },

  resolve: {
    // look for entry find in this order
    extensions: ['', '.tsx', '.ts', '.jsx', '.js'],
  },

  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
      {
        test: /\.tsx?$/,
        loaders: ['ts-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loaders: ['file'],
      },
      {
        test: /\.html$/,
        loaders: ['file?name=[path][name].[ext]&context=' + PATH.app],
      },
    ],
  },
};

var config;

if (!TARGET || TARGET === 'start') {
  config = merge(commonConfig, {
    devServer: {
      contentBase: PATH.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',

      host: process.env.HOST,
      port: process.env.PORT,
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],

    devtool: 'source-map',

  });
}

if (TARGET === 'build') {
  config = merge(commonConfig, {});
}

module.exports = config;
