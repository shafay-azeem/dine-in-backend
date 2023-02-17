const asyncHandler = require("express-async-handler");
const Cart = require("../models/CartModel");
const Order = require("../models/OrderModel");

//Create Order ---Post
exports.createOrder = asyncHandler(async (req, res, next) => {
  const {
    customerName,
    tableNumber,
    orderedItems,
    instructions,
    orderStatus,
    paymentStatus,
  } = req.body;

  let subtotal = 0;
  orderedItems.forEach((item) => {
    subtotal += item.itemPrice_Total;
  });

  const order = new Order({
    customerName,
    tableNumber,
    orderedItems,
    instructions,
    subtotal,
    orderStatus,
    paymentStatus,
  });

  try {
    await order.save();

    // Remove ordered items from the cart
    await removeCartByTableNumber(req.body.tableNumber);

    res.status(201).send({ message: "Order created successfully", order });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Remove cart item

async function removeCartByTableNumber(tableNumber) {
  try {
    await Cart.findOneAndDelete({ tableNumber });
  } catch (err) {
    console.error(`Error deleting cart for table ${tableNumber}:`, err);
  }
}
// async function removeCartItem(itemId) {
//   try {
//     await Cart.findOneAndDelete({ item_Id: itemId });
//   } catch (err) {
//     console.error(`Error deleting item with id ${itemId}:`, err);
//   }
// }

//Get Single Order ---Get
exports.getSingleOrder = asyncHandler(async (req, res, next) => {
  let orderId = req.params.id;
  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found with this id",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});
