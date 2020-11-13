const db = require("../../models");
const router = require("express").Router();
const isAuthenticated = require("../../config/middleware/isAuthenticated");

router.post("/api/addPaymentMethod", isAuthenticated, (req, res) => {
  const card = req.body;
  const id = req.user._id;
  card.cardHolder = id;
  db.Payment.create(card, (err, payment) => {
    if (err) throw err;
    if (payment) {
      res.json({message: "Success!"})
    }
  })
})

module.exports = router;