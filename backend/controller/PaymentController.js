const asyncHandler = require("express-async-handler");
const Order = require("../models/OrderModel");
const Payment = require("../models/PaymentModel");

//Make Payment --Post
exports.makePayment = asyncHandler(async (req, res, next) => {
  const {
    email,
    phone_Number,
    order_Id,
    payment_method,
    transaction_id,
    amount,
    payment_status,
  } = req.body;

  const payment = new Payment({
    email,
    phone_Number,
    order_Id,
    payment_method,
    transaction_id,
    amount,
    payment_status,
  });

  try {
    await payment.save();

    if (payment_status === "Success") {
      const order = await Order.findByIdAndUpdate(
        order_Id,
        { $set: { paymentStatus: "Payment Paid" } },
        { new: true } //You should set the new option to true to return the document after update was applied.
      );

      res
        .status(201)
        .send({ message: "Payment created successfully", payment });
    } else {
      res.status(400).send({ error: "Payment status not found" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//Get Payment Detail By Id --Get
exports.getPaymentDetail = asyncHandler(async (req, res) => {
  let paymentId = req.params.id;
  try {
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({
        success: false,
        error: "Payment not found with this id",
      });
    }

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});
