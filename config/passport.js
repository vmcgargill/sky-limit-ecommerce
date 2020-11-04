const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

passport.use(new LocalStrategy(
  {
    usernameField: "email"
  },
  function (email, password, done) {

    db.User.findOne({ email: email }, function(error, user) {
      if (error) throw error;

      if (user === null) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }

      user.comparePassword(password, function(err, match) {
        if (err) throw err;
        if (!match) {
          return done(null, false, {
            message: "Incorrect password."
          });
        } else {
          return done(null, user);
        }
      });
      
    });
  }
));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

module.exports = passport;
