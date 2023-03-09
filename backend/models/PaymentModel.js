const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  order_Id: {
    type: mongoose.Schema.ObjectId,
    ref: "Order",
  },
  uniqueOrderId: {
    type: String
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

}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);
