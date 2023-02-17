const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerName: {
    type: String,
  },
  tableNumber: {
    type: Number,
  },
  orderedItems: [
    {
      itemId: {
        type: mongoose.Schema.ObjectId,
        ref: "Item",
      },
      itemName: {
        type: String,
      },
      itemPrice: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
      itemImg: {
        type: String,
      },
      itemPrice_Total: {
        type: Number,
      },
    },
  ],

  instructions: {
    type: String,
  },
  subtotal: {
    type: Number,
    default: 0,
  },
  orderStatus: {
    type: String,
  },
  paymentStatus: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Order", OrderSchema);
