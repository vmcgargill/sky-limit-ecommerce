const db = require("../../models");
const passport = require("../../config/passport");
const router = require("express").Router();

router.post("/api/login", passport.authenticate("local"), function (req, res) {
  if (req.user) {
    res.json({status: 200})
  }
});

router.post("/api/signup", function (req, res) {
  db.User.create(req.body, function(err, user) {
    res.json({})
  })
});

router.get("/api/logout", function (req, res) {
  req.logout();
  res.json({message: false})
});

router.get("/api/user_data", function (req, res) {
  if (req.user) {
    res.json({message: true})
  } else {
    res.json({message: false})
  }
});

module.exports = router;