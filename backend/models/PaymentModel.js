const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  order_Id: {
    type: mongoose.Schema.ObjectId,
    ref: "Order",
  },
  email: {
    type: String,
  },
  phone_Number: {
    type: String,
  },
  payment_method: {
    type: String,
  },
  transaction_id: {
    type: String,
  },
  amount: {
    type: Number,
  },
  payment_status: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Payment", PaymentSchema);
