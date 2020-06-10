const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENRSECRET,
      callbackURL: process.env.CALLBACKURL,
      proxy: true,
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({
        googleId: profile.id,
      }).then((curUser) => {
        if (curUser) {
          done(null, curUser);
        } else {
          new User({
            username: profile._json.given_name,
            profileImg: profile._json.picture,
            googleId: profile.id,
          })
            .save()
            .then((newUser) => {
              done(null, newUser);
            });
        }
      });
    }
  )
);
