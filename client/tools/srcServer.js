// This file configures the development web server
// which supports hot reloading and synchronized testing.

// Require Browsersync along with webpack and middleware for it
var bs = require('browser-sync').create();
// Required for react-router browserHistory
// see https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-102623643
var historyApiFallback = require('connect-history-api-fallback')
  , webpack = require('webpack')
  , webpackDevMiddleware = require('webpack-dev-middleware')
  , webpackHotMiddleware = require('webpack-hot-middleware')
  , config = require('../webpack.config.dev')
  , _ = require('underscore')
  , proxy = require('http-proxy-middleware');

var bundler = webpack(config);

var apiProxy = proxy(['/login', '/logout', '/weather', '/api'], {    
    "target": "http://localhost:3000"
});

// Run Browsersync and use middleware for Hot Module Replacement
bs.init({
  port: 3010,
  server: {
    baseDir: ['../server/', 'src'],

    middleware: [
      apiProxy,

      webpackDevMiddleware(bundler, {
        // Dev middleware can't access config, so we provide publicPath
        publicPath: config.output.publicPath,

        // pretty colored output
        stats: { colors: true },

        // Set to false to display a list of each file that is being bundled.
        noInfo: true

        // for other settings see
        // http://webpack.github.io/docs/webpack-dev-middleware.html
      }),

      // bundler should be the same as above
      webpackHotMiddleware(bundler),

      historyApiFallback()
    ]
  },

  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: [
    'src/*.html'
  ]
});
