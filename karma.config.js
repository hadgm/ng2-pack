var path = require('path');
const PATH = {
  app: path.resolve(__dirname, 'app'),
  vendor: path.resolve(__dirname, 'vendors.ts'),
  polyfill: path.resolve(__dirname, 'polyfills.ts'),
  build: path.resolve(__dirname, 'build'),
};

module.exports = function(config) {

  config.set({
    frameworks: ['jasmine'],

    files: [
      'test.bundle.js',
    ],

    exclude: [],

    preprocessors: {
      'test.bundle.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      module: {
        loaders: [
          {
            test: /components\/.*\.scss$/,
            loaders: ['raw', 'sass'],
          },
          {
            test: /\.css$/,
            loaders: ['style', 'css'],
          },
          {
            test: /\.ts?$/,
            loaders: ['awesome-typescript-loader'],
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
    },

    reporters: ['spec'],
    browsers: ['PhantomJS', 'Chrome'],

    plugins: [
      'karma-jasmine',
      'karma-spec-reporter',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
  });

};
