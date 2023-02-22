const express = require("express");
const {
  createOrder,
  getSingleOrder,
  getPaidUnpaidOrders,
  filterOrder,
} = require("../controller/OrderController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

//Order
router.route("/createOrder/:id").post(createOrder); //userID
router.route("/getSingleOrder/:id").get(getSingleOrder); //orderID

// router.route("/getSingleOrder/:id").get(getSingleOrder); //orderID //have somework


router.route("/getPaidUnpaidOrders/:id").get(isAuthenticatedUser, getPaidUnpaidOrders);//userID
router.route("/filterOrder/:id").get(isAuthenticatedUser, filterOrder);//userID


module.exports = router;
