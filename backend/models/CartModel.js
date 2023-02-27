const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
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
  itemPrice_Total: {
    type: Number,
  },
  item_Img: {
    type: String,
  },
  item_Size: {
    type: String,
  },
  Modifier: [{
    Modifier_Name: {
      type: String,
    },
    Modifier_Price: {
      type: Number,
    },
    Modifier_Qty: {
      type: Number,
    }
  }]
});

// Define the Cart schema
const cartSchema = new mongoose.Schema({
  cartItems: [cartItemSchema],
  total_Price: {
    type: Number,
  },
  tableNumber: {
    type: String,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
