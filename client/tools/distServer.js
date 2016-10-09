// This file configures a web server for testing the production build
// on your local machine.

var browserSync = require('browser-sync');
var historyApiFallback = require('connect-history-api-fallback');

// Run Browsersync
browserSync({
  port: 3000,
  ui: {
    port: 3001
  },
  server: {
    baseDir: 'dist'
  },

  files: [
    'src/*.html'
  ],

  middleware: [historyApiFallback()]
});
