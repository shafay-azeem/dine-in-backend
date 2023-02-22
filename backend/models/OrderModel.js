const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    customerName: {
      type: String,
    },
    tableNumber: {
      type: Number,
    },
    orderedItems: [
      {
        item_Id: {
          type: mongoose.Schema.ObjectId,
          ref: "Item",
        },
        item_Name: {
          type: String,
        },
        item_Price: {
          type: Number,
        },
        item_Qty: {
          type: Number,
        },
        item_Img: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
