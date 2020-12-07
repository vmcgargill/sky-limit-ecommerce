const db = require("../../models");
const passport = require("../../config/passport");
const router = require("express").Router();

router.post("/api/login", passport.authenticate("local"), (req, res) => {
  if (req.user) {
    res.json({status: 200})
  }
});

router.post("/api/signup", (req, res) => {
  db.User.findOne({email: req.body.email}, (error, existingUser) => {
    if (error) throw error;
    if (existingUser !== null) {
      return res.json({error: "This email is already in use."})
    } else {
      db.User.create(req.body, (err, user) => {
        if (err) throw err;
        if (user) {
          res.json({status: 200}) 
        }
      })
    }
  })
});

router.get("/api/logout", async (req, res) => {
  await req.logOut();
  if (await req.user === null) {
    return res.json({message: false})
  }
});

router.get("/api/user_data", (req, res) => {
  db.Product.find({}, (err, products) => {
    if (err) throw err;

    let SearchArray = [...new Set(products.map((product) => product.name))];

    if (req.user) {
      res.json({
        message: true,
        SearchSuggestions: SearchArray
      })
    } else {
      res.json({
        message: false,
        SearchSuggestions: SearchArray
      })
    }
  })
});

module.exports = router;