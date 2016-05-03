var path = require('path');
const PATH = {
  app: path.resolve(__dirname, 'src'),
  vendor: path.resolve(__dirname, 'vendors.ts'),
  polyfill: path.resolve(__dirname, 'polyfills.ts'),
  build: path.resolve(__dirname, 'build'),
};

module.exports = function(config) {

  config.set({
    frameworks: ['jasmine'],

    files: [
      'polyfills.ts',
      'src/**/*.spec.ts',
      {pattern: 'src/**/!(*spec).ts', watched: true, included: false},
      {pattern: 'src/**/*.tpl.html', watched: true, included: false},
    ],

    exclude: [],

    preprocessors: {
      'polyfills.ts': ['webpack', 'sourcemap'],
      'src/**/*.spec.ts': ['webpack', 'sourcemap'],
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

    webpackServer: {
      quiet: true,
    },

    reporters: ['spec'],
    browsers: ['Chrome'],

    plugins: [
      'karma-jasmine',
      'karma-spec-reporter',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
  });

};
