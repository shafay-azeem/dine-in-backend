const express = require("express");
const {
  makePayment,
  getPaymentDetail,
  getRevenueOnDailyBasis,
  revenueRange,
  totalRevenue,
} = require("../controller/PaymentController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

//Payment
router.route("/makePayment/:id").post(makePayment); //userID
router.route("/paymentDetail/:id").get(getPaymentDetail); //paymentID

// router.route("/paymentDetail/:id").get(isAuthenticatedUser, getPaymentDetail); //paymentID have some work

router.route("/getRevenueOnDailyBasis/:id").get(isAuthenticatedUser, getRevenueOnDailyBasis); //userID
router.route("/revenueRange/:id").get(isAuthenticatedUser, revenueRange); //userID
router.route("/totalRevenue/:id").get(isAuthenticatedUser, totalRevenue); //userID

module.exports = router;
