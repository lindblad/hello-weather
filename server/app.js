#!/usr/bin/env node

var express = require('express')
  , path = require('path')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , passport = require('passport')
  , authenticationRoutes = require('./routes/authentication')
  , restRoutes = require('./routes/rest')
  , session = require('express-session')
  , proxy = require('http-proxy-middleware')
  , program = require('commander')
  , auth = require('./auth')
  , strategy = auth.getCurrent();

program
  .version('1.0.0')
  .option('-n --noauth', 'no authentication')
  .parse(process.argv);

console.log('Starting server with:');
if (program.noauth || process.env.NODE_ENV === "test") {
  console.log('  - no authentication');
}

var dot = require("dot").process({
  path: (__dirname + "/views")
});

var app = express();


// view engine setup
app.engine('dot', function(template, options, cb) {
  // using .dot files
  var temp = path.parse(template).name;
  var cont = dot[temp](options);
  return cb(null, cont);
  // to do error checking, return the error as callback functions first arg
  // return cb(new Error('Something went wrong');
});

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'dot');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true, parameterLimit: 100000 }));
app.use(bodyParser.json({limit: '10mb', extended: true, parameterLimit: 2500}));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

var proxyOptions = {
  target: "http://api.openweathermap.org/data/2.5",
  onProxyReq: function(proxyReq, req, res) {
    proxyReq.path += `&appid=${process.env.WEATHER_API_KEY}`;
    proxyReq.end();
  }
};

var apiProxy = proxy(["/weather"], proxyOptions);

app.use(authenticationRoutes);
if (!(program.noauth || process.env.NODE_ENV === "test")) {
  app.use(auth.ensureAuthenticated, auth.ensureHasRights);
}

app.use(restRoutes);

app.use(apiProxy);

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/public', express.static(path.join(__dirname, './public')));

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.error(err);
    res.status(err.status || 500);
    var userName = req.user ? req.user.name : undefined;
    res.render('error', {
      message: err.message,
      error: err,
      user: userName
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  if(err.status === 404) {
    res.next(err);
  } else {
    res.status(err.status || 500);
    var userName = req.user ? req.user.name : undefined;
    res.render('error', {
      message: err.message,
      error: {},
      user: userName
    });
  }
});


module.exports = app;