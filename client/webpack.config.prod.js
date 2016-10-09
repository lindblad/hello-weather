var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
};

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: {
    app: [
      'babel-polyfill',
      './src/index'
    ],
    vendor: [
      "deep-equal",
      "detect-browser",
      "flux",
      "jquery",
      "jquery-ui",
      "keymirror",
      "lodash",
      "object-assign",
      "react",
      "react-d3-components",
      "react-dom",
      "react-router",
      "react-sticky",
      "underscore",
      "url-join",
      './vendor/js/semantic.min.js',
    ]
  },
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS), //Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "vendor.bundle.js"}),
    new HtmlWebpackPlugin({
      template: 'index.template.ejs',
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
      },
      inject: 'body',
      hash: true,
      // Note that you can add custom options here if you need to handle other custom logic in index.html
      // To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
      // trackJSToken: 'getthetoken'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  module: {
    loaders: [
      {test: /\.(js|jsx)$/i, exclude: /node_modules/, loader: 'babel'},
      {test: /\.(jpe?g|png|gif|svg)$/i, loaders: ['file']},
      {test: /(\.css|\.scss)$/, loaders: ['style', 'css?sourceMap', 'sass?sourceMap']},
      { test: /jquery\.js$/, loader: 'expose?$' },
      { test: /jquery\.js$/, loader: 'expose?jQuery' }
    ]
  }
};
