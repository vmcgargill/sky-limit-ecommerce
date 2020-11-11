const db = require("../../models");
const passport = require("../../config/passport");
const router = require("express").Router();

router.post("/api/login", passport.authenticate("local"), (req, res) => {
  if (req.user) {
    res.json({status: 200})
  }
});

router.post("/api/signup", (req, res) => {
  db.User.create(req.body, (err, user) => {
    res.json({})
  })
});

router.get("/api/logout", (req, res) => {
  req.logout();
  if (!req.user) {
    res.json({message: false})
  }
});

router.get("/api/user_data", (req, res) => {
  if (req.user) {
    res.json({message: true})
  } else {
    res.json({message: false})
  }
});

module.exports = router;