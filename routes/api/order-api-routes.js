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
  db.Order.find({ buyer: id, successfulPurchase: true }, (err, orders) => {
    if (err) throw err;
    if (orders) {
      res.json({orders: orders})
    }
  })
})

router.get("/api/loadCheckout", isAuthenticated, (req, res) => {
  const id = req.user._id;
  db.User.findById(id, (err, user) => {
    if (err) throw err;
    const Cart = user.cart;
    if (Cart.length === 0) {
      return res.json({emptyCart: true})
    } else if (Cart.length > 0) {
      db.Product.find().where('_id').in(Cart).exec((error, products) => {
        if (error) throw err;
        const currentTotal = products.map(product => product.price).reduce((x, y) => x + y, 0);
        const addresses = user.address;
        return res.json({
          currentTotal: currentTotal,
          addresses: addresses
        })
      });
    }
  })
})

router.post("/api/placeOrder", isAuthenticated, (req, res) => {
  const stripe = new Stripe(process.env.SECRET_KEY);
  const userId = req.user._id;
  const paymentId = req.body.id;
  const orderTotal = req.body.orderTotal;

  db.User.findOne({ _id: userId }, 'cart', (err, user) => {
    if (err) throw err;
    const Cart = user.cart;
    if (Cart.length === 0) {
      return res.json({cartEmpty: true})
    } else if (Cart.length > 0) {
      db.Product.find().where("_id").in(Cart).exec((error, products) => {
        if (error) throw error;
        const totalPrice = products.map(product => product.price).reduce((x, y) => x + y, 0)
  
        if (totalPrice !== orderTotal) {
          return res.json({
            status: 400,
            error: "Error: it looks like the total price of you cart was recently changed. Please review your cart before making a purchase."
          })
        } else {
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
                  amount: totalPrice,
                  currency: "USD",
                  description: "Order ID #" + order._id,
                  payment_method: paymentId,
                  confirm: true
                })
                if (payment.status === 'succeeded') {
                  db.Order.findByIdAndUpdate(order._id, {
                    $set: {
                      successfulPurchase: true,
                      stripeId: payment.id
                    }
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
                  return res.json({
                    status: 400,
                    error: "Error: Invalid payment. Please try again."
                  })
                }
              } catch (error) {
                return res.json({
                  status: 400,
                  error: "Error: Something went wrong with your payment. Please try again."
                })
              }
            }
          })
        }
      })
    }
  })
})


module.exports = router;