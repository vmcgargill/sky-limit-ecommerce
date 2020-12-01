const router = require("express").Router();
const APIRoutes = require("./api-routes");
const productAPIRoutes = require("./product-api-routes");
const userAPIRoutes = require("./user-api-routes");
const orderAPIRoutes = require("./order-api-routes");
const reviewAPIRoutes = require("./review-api-routes")

router.use(APIRoutes);
router.use(productAPIRoutes);
router.use(userAPIRoutes);
router.use(orderAPIRoutes);
router.use(reviewAPIRoutes);

module.exports = router;
