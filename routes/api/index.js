const router = require("express").Router();
const APIRoutes = require("./api-routes");
const productAPIRoutes = require("./product-api-routes");
const userAPIRoutes = require("./user-api-routes");

router.use(APIRoutes);
router.use(productAPIRoutes);
router.use(userAPIRoutes);

module.exports = router;