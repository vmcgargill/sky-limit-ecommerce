// import Stripe from "stripe";
const Stripe = require("stripe")
const db = require("../../models");
const router = require("express").Router();
const isAuthenticated = require("../../config/middleware/isAuthenticated");

router.get("/api/order/:id", isAuthenticated, (req, res) => {
  const id = req.params.id;
  db.Order.findOne({ _id: id }, (err, order) => {
    if (err) {
      return res.json(404)
    };
    return res.json(order)
  }).catch(() => {
    return res.json(404)
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
  const stripe = new Stripe(process.env.SECRET_KEY)
  const userId = req.user._id;
  const paymentId = req.body.id

  db.User.findOne({ _id: userId }, 'cart', (err, user) => {
    if (err) throw err;
    const Cart = user.cart;
    db.Product.find().where("_id").in(Cart).exec((error, products) => {
      if (error) throw error;
      const totalPrice = products.map(product => product.price).reduce((x, y) => x + y, 0);
      const orderProducts = new Array();
      products.forEach(product => {
        orderProducts.push({
          productId: product._id,
          originalName: product.name,
          buyPrice: product.price
        })
      })
      db.Order.create({
        buyer: userId,
        products: orderProducts,
        total: totalPrice
      }, async (errMsg, order) => {
        if (await errMsg) throw errMsg;
        if (await order) {
          try {
            const payment = await stripe.paymentIntents.create({
              amount: totalPrice * 100,
              currency: "USD",
              description: "Order ID #" + order._id,
              payment_method: paymentId,
              confirm: true
            })
            if (payment.status === 'succeeded') {
              db.Order.findByIdAndUpdate(order._id, {
                $set: {successfulPurchase: true}
              }, (errorMessage, successfulOrder) => {
                if (errorMessage) throw errorMessage;
                if (successfulOrder) {
                  db.User.findByIdAndUpdate(userId, {
                    $set: {cart: []}
                  }, (errorMsg, updatedCart) => {
                    if (errorMsg) throw errorMsg;
                    if (updatedCart) {
                      return res.json({
                        orderStatus: true,
                        message: "Success! Order has been placed.",
                        id: order._id
                      })
                    }
                  })
                };
              })
            } else {
              return res.json(400)
            }
          } catch (error) {
            console.log(error)
            return res.json(400)
          }
        }
      })
    })
  })
})


module.exports = router;