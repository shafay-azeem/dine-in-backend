const express = require("express");
const {
  makePayment,
  getPaymentDetail,
} = require("../controller/PaymentController");

const router = express.Router();

//Payment
router.route("/makePayment").post(makePayment);
router.route("/paymentDetail/:id").get(getPaymentDetail);

module.exports = router;
