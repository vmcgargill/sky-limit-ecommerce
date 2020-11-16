const db = require("../../models");
const router = require("express").Router();
const isAuthenticated = require("../../config/middleware/isAuthenticated");

router.get("/api/order/:id", isAuthenticated, (req, res) => {
  const id = req.params.id;
  db.Order.findOne({ _id: id }, (err, order) => {
    if (err) throw err;
    res.json(order)
  })
})

router.get("/api/userOrders", isAuthenticated, (req, res) => {
  const id = req.user._id;
  db.Order.find({ buyer: id }, (err, orders) => {
    if (err) throw err;
    if (orders) {
      res.json({orders: orders})
    }
  })
})

router.post("/api/placeOrder", isAuthenticated, (req, res) => {
  const id = req.user._id;
  const comparePrice = req.body.comparePrice;
  console.log(comparePrice)
  db.User.findOne({ _id: id }, 'cart', (err, user) => {
    if (err) throw err;
    const Cart = user.cart;
    db.Product.find().where('_id').in(Cart).exec((error, products) => {
      if (error) throw error;
      const totalPrice = products.map(product => product.price).reduce((x, y) => x + y, 0);
      if (totalPrice !== comparePrice) {
        res.json({
          orderStatus: false,
          message: "It looks like there has been a price change on one of the products in your cart. Please review these changes before placing your order."
        })
      } else if (totalPrice === comparePrice) {

        const orderProducts = new Array();
        products.forEach(product => {
          orderProducts.push({
            productId: product._id,
            originalName: product.name,
            buyPrice: product.price
          })
        })

        db.Order.create({
          buyer: id,
          products: orderProducts,
          total: totalPrice
        }, (errMsg, order) => {
          if (errMsg) throw errMsg;
          if (order) {
            res.json({
              orderStatus: true,
              message: "Success! Order has been placed.",
              id: order._id
            })
          }
        })
      }
    });
  })
})


module.exports = router;