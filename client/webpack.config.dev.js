var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  __DEV__: true
};

module.exports = {
  devtool: 'inline-eval-cheap-source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  entry: {
    app: [
      'webpack-hot-middleware/client?reload=true',
      'webpack/hot/only-dev-server',
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
    new webpack.DefinePlugin(GLOBALS), //Tells React to build in prod mode. https://facebook.github.io/react/downloads.htmlnew webpack.HotModuleReplacementPlugin());
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "vendor.bundle.js"}),
    new HtmlWebpackPlugin({
      template: 'index.template.ejs',
      inject: 'body',
      hash: true
    })
  ],
  module: {
    loaders: [
      {test: /\.(js|jsx)$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.(jpe?g|png|gif|svg)$/i, loaders: ['file']},
      {test: /(\.css|\.scss)$/, loaders: ['style', 'css?sourceMap', 'sass?sourceMap']},
      {test: /jquery\.js$/, loader: 'expose?$'},
      {test: /jquery\.js$/, loader: 'expose?jQuery'}
    ]
  }
};
