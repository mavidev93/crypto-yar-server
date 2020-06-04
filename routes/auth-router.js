const router = require("express").Router();
const passport = require("passport");

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("http://localhost:3000");
});

router.get("/user", (req, res) => {
  let username, profileImg, loggedIn;
  if (req.user) {
    username = req.user.username;
    profileImg = req.user.profileImg;
    loggedIn = true;
  } else {
    loggedIn = false;
  }
  res.json({ username, profileImg, loggedIn });
});

router.get("/logout", (req, res) => {
  req.session = null;
  req.logOut();
  res.redirect("http://localhost:3000");
});

module.exports = router;
