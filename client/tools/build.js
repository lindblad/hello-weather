// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/*eslint-disable no-console */
var webpack = require('webpack');
var config = require('../webpack.config.prod');
var colors = require('colors');

process.env.NODE_ENV = 'production'; // this assures React is built in prod mode and that the Babel dev config doesn't apply.

console.log('Generating minified bundle for production via Webpack. This will take a moment...'.blue);

webpack(config).run(function(err, stats) {
  if (err) { // so a fatal error occurred. Stop here.
    console.log(err.bold.red);
    return 1;
  }

  var jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(function(error) { console.log(error.red); });
  }

  if (jsonStats.hasWarnings) {
    console.log('Webpack generated the following warnings: '.bold.yellow);
    jsonStats.warnings.map(function(warning) { console.log(warning.yellow); });
  }

  console.log("Webpack stats:");
  console.log(stats);

  // if we got this far, the build succeeded.
  console.log('Your app has been compiled in production mode and written to /dist. It\'s ready to roll!'.green);

  return 0;
});
