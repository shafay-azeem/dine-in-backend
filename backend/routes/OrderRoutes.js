const express = require("express");
const {
  createOrder,
  getSingleOrder,
} = require("../controller/OrderController");
const router = express.Router();

//Order
router.route("/createOrder").post(createOrder);
router.route("/getSingleOrder/:id").get(getSingleOrder);

module.exports = router;
