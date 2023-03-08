const express = require("express");
const {
  makePayment,
  getPaymentDetail,
  getRevenueOnDailyBasis,
  revenueRange,
  totalRevenue,
  getAllPayment,
  getSingleDatePayment,
  getMultiDatePayment,
  paymentDetailByOrderId,
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
router.route("/getAllPayment/:id").get(isAuthenticatedUser, getAllPayment); //userID
router.route("/getSingleDatePayment/:id").get(isAuthenticatedUser, getSingleDatePayment); //userID
router.route("/getMultiDatePayment/:id").get(isAuthenticatedUser, getMultiDatePayment); //userID


router.route("/paymentDetailByOrderId/:id").get(isAuthenticatedUser, paymentDetailByOrderId); //userID

module.exports = router;
