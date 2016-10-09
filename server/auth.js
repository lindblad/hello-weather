"use strict";
var FacebookStrategy = require('passport-facebook');

var facebook = new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['id', 'displayName', 'email', 'photos', 'gender', 'name']
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    let {displayName, id, gender, photos, name} = profile;
    done(null, {
      id: id,
      displayName: displayName,
      name: name,
      gender: gender,
      photo: photos && photos .length > 0 ? photos[0].value : "",
      accessToken: accessToken,
      refreshToken: refreshToken
    });
});

var strategies = {
  facebook: {
    name: "facebook",
    strategy: facebook,
    loginURL: "/login/idp",
    logoutURL: "/logout"
  }
}

var getCurrent = function() {
  return strategies.facebook;
}

module.exports = {
  getCurrent: getCurrent,
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      res.set("user-id", req.user["id"]);
      res.set("user-displayname", req.user.displayName);
      res.set("user-gender", req.user.gender);
      res.set("user-photo", req.user.photo);
      res.set("user-name", req.user.name.givenName);
      return next();
    }
    if (req.accepts(['html', 'json']) === 'json') {
      res.set("needs-authentication", getCurrent().loginURL);
      var redirectData = {
        redirect: getCurrent().loginURL
      }
      res.json(redirectData);
    } else {
      res.redirect(getCurrent().loginURL);
    }
  },
  ensureHasRights: function(req, res, next) {
    var user = req.user;
    if (!user) {
      var err = new Error('Unauthorized');
      err.status = 401;
      return next(err);
    }
    next();
  }
}
