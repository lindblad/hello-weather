var express = require('express')
  , router = express.Router()
  , strategy = require('../auth').getCurrent()
  , passport = require('passport');

passport.use(strategy.name, strategy.strategy);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(passportSession, done) {
  done(null, passportSession);
});

router.get('/login/idp', 
  passport.authenticate(strategy.name, { failureRedirect: '/' }),
  function(req, res) {
    console.log('Received a return from Azure AD');
    res.redirect('/');
  });

router.post('/login/idp',
  passport.authenticate(strategy.name, {
    failureRedirect: '/'
  }),
  function(req, res) {
    console.log('body', req.body);
    res.redirect('/');
  }
);

router.get('/logout', (req, res) => {
  console.log('destroying session');
  req.session.destroy((err) => {
    console.log('session destroyed');
    req.logOut();
    res.redirect('/');
  });
});


module.exports = router;