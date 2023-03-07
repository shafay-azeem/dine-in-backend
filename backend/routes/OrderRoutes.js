const express = require("express");
const {
  createOrder,
  getSingleOrder,
  getPaidUnpaidOrders,
  filterOrder,
  rangeOrder,
  pendingAmount,
  updateStatusOfOrder,
} = require("../controller/OrderController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

//Order
router.route("/createOrder/:id").post(createOrder); //userID
router.route("/getSingleOrder/:id").get(getSingleOrder); //orderID

// router.route("/getSingleOrder/:id").get(getSingleOrder); //orderID //have somework


router.route("/getPaidUnpaidOrders/:id").get(isAuthenticatedUser, getPaidUnpaidOrders);//userID
router.route("/filterOrder/:id").get(isAuthenticatedUser, filterOrder);//userID
router.route("/rangeOrder/:id").get(isAuthenticatedUser, rangeOrder);//userID
router.route("/pendingAmount/:id").get(isAuthenticatedUser, pendingAmount);//userID


router.route("/updateStatusOfOrder/:id").get(isAuthenticatedUser, updateStatusOfOrder);//userID


module.exports = router;
