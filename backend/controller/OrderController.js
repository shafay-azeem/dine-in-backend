const asyncHandler = require("express-async-handler");
const Cart = require("../models/CartModel");
const Order = require("../models/OrderModel");

//Create Order ---Post
exports.createOrder = asyncHandler(async (req, res, next) => {
  let userId = req.params.id;
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
    userId: userId,
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

exports.getPaidUnpaidOrders = asyncHandler(async (req, res, next) => {
  let userId = req.params.id;
  let status = req.query.paymentStatus;
  const currentPage = req.query.page || 1
  const perPage = 7
  try {
    if (status === "Payment Paid") {
      let totalOrders = await Order.find({ userId: { $in: userId }, paymentStatus: status }).countDocuments();
      const orders = await Order.find({ userId: { $in: userId }, paymentStatus: status }).skip((currentPage - 1) * perPage).limit(perPage)
      res.status(200).json({ message: 'succefully get paid orders', orders: orders, totalOrders: totalOrders })
    }
    else if (status === "Pending") {

      let totalOrders = await Order.find({ userId: { $in: userId }, paymentStatus: status }).countDocuments()
      const orders = await Order.find({ userId: { $in: userId }, paymentStatus: status }).skip((currentPage - 1) * perPage).limit(perPage)
      res.status(200).json({ message: 'succefully get unpaid orders', orders: orders, totalOrders: totalOrders })
    }
    else {
      let totalOrders = await Order.find({ userId: { $in: userId } }).countDocuments()
      const orders = await Order.find({ userId: { $in: userId } }).skip((currentPage - 1) * perPage).limit(perPage)
      res.status(200).json({ message: 'succefully get unpaid orders', orders: orders, totalOrders: totalOrders })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });

  }

})

exports.filterOrder = asyncHandler(async (req, res, next) => {
  let userId = req.params.id;
  let date = req.query.date;
  let status = req.query.paymentStatus;
  const today = new Date(date);
  today.setUTCHours(0, 0, 0, 0)

  try {
    // console.log(date, 'date')
    const orders = await Order.find({
      userId: { $in: userId },
      createdAt: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) // set the end of the day to 24 hours after the beginning of the day
      },
      paymentStatus: status
    });

    res.status(200).json({ message: 'Orders Fetched', orders: orders })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }


})