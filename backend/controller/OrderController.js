const asyncHandler = require("express-async-handler");
const Cart = require("../models/CartModel");
const Order = require("../models/OrderModel");

//Create Order ---Post
exports.createOrder = asyncHandler(async (req, res, next) => {

  try {
    let userId = req.params.id;
    const {
      customerName,
      tableNumber,
      TableNumber,
      orderedItems,
      instructions,
      paymentStatus,
      address,
      type,
      uniqueOrderId,
    } = req.body;

    let subtotal = 0;
    orderedItems.forEach((item) => {
      subtotal += item.itemPrice_Total;
    });

    const order = new Order({
      userId: userId,
      customerName,
      tableNumber,
      TableNumber,
      orderedItems,
      instructions,
      subtotal,
      paymentStatus,
      address,
      type,
      uniqueOrderId
    });


    await order.save();

    // Remove ordered items from the cart
    await removeCartByTableNumber(req.body.tableNumber);

    res.status(201).json({ success: true, message: "Order created successfully", order });

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }

});

// Remove cart item

async function removeCartByTableNumber(tableNumber) {
  let cart = await Cart.findOneAndDelete({ tableNumber });
  if (!cart) {
    const error = new Error('cart Not Found')
    error.statusCode = 404
    throw error
  }

}

//Get Single Order ---Get
exports.getSingleOrder = asyncHandler(async (req, res, next) => {
  try {
    let userId = req.params.id;
    let orderId = req.query.orderId;
    const order = await Order.findOne({
      userId: { $in: userId },
      _id: orderId,
    });
    if (!order) {
      const error = new Error('Order Not Found')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({
      success: true,
      message: 'Order get Successfully',
      order: order,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});


///UPdate Status of Order


exports.updateStatusOfOrder = asyncHandler(async (req, res, next) => {
  try {
    let userId = req.params.id;
    let orderId = req.query.orderId;
    const { orderStatus } = req.body
    const order = await Order.findOne({
      userId: { $in: userId },
      _id: orderId,
    });
    if (!order) {
      const error = new Error('Order Not Found')
      error.statusCode = 404
      throw error
    }

    order.orderStatus = orderStatus;
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Status Updated Successfully'
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

//---------------




exports.getPaidUnpaidOrders = asyncHandler(async (req, res, next) => {

  try {
    let userId = req.params.id;
    let status = req.query.paymentStatus;
    let type = req.query.type;
    const currentPage = req.query.page || 1;
    const perPage = 10;
    if (type != "undefined") {
      if (status === "Payment Paid") {
        let totalOrders = await Order.find({
          userId: { $in: userId },
          paymentStatus: status,
          type: type,
        }).countDocuments();
        const orders = await Order.find({
          userId: { $in: userId },
          paymentStatus: status,
          type: type,
        })
          .sort({ createdAt: -1 })
          .skip((currentPage - 1) * perPage)
          .limit(perPage);
        res.status(200).json({
          message: "succefully get paid orders",
          orders: orders,
          totalOrders: totalOrders,
        });
      } else if (status === "Pending") {
        let totalOrders = await Order.find({
          userId: { $in: userId },
          paymentStatus: status,
          type: type,
        }).countDocuments();
        const orders = await Order.find({
          userId: { $in: userId },
          paymentStatus: status,
          type: type,
        })
          .sort({ createdAt: -1 })
          .skip((currentPage - 1) * perPage)
          .limit(perPage);
        res.status(200).json({
          message: "succefully get unpaid orders",
          orders: orders,
          totalOrders: totalOrders,
        });
      } else {
        let totalOrders = await Order.find({
          userId: { $in: userId },
          type: type,
        }).countDocuments();
        const orders = await Order.find({ userId: { $in: userId }, type: type })
          .sort({ createdAt: -1 })
          .skip((currentPage - 1) * perPage)
          .limit(perPage);
        res.status(200).json({
          message: "succefully get unpaid orders",
          orders: orders,
          totalOrders: totalOrders,
        });
      }
    } else {
      if (status === "Payment Paid") {
        let totalOrders = await Order.find({
          userId: { $in: userId },
          paymentStatus: status,
        }).countDocuments();
        const orders = await Order.find({
          userId: { $in: userId },
          paymentStatus: status,
        })
          .sort({ createdAt: -1 })
          .skip((currentPage - 1) * perPage)
          .limit(perPage);
        res.status(200).json({
          message: "succefully get paid orders",
          orders: orders,
          totalOrders: totalOrders,
        });
      } else if (status === "Pending") {
        let totalOrders = await Order.find({
          userId: { $in: userId },
          paymentStatus: status,
        }).countDocuments();
        const orders = await Order.find({
          userId: { $in: userId },
          paymentStatus: status,
        })
          .sort({ createdAt: -1 })
          .skip((currentPage - 1) * perPage)
          .limit(perPage);
        res.status(200).json({
          message: "succefully get unpaid orders",
          orders: orders,
          totalOrders: totalOrders,
        });
      } else {
        let totalOrders = await Order.find({
          userId: { $in: userId },
        }).countDocuments();

        const orders = await Order.find({ userId: { $in: userId } })
          .sort({ createdAt: -1 })
          .skip((currentPage - 1) * perPage)
          .limit(perPage);
        res.status(200).json({
          message: "succefully get unpaid orders",
          orders: orders,
          totalOrders: totalOrders,
        });
      }
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

exports.filterOrder = asyncHandler(async (req, res, next) => {

  try {
    let userId = req.params.id;
    let date = req.query.date;
    let status = req.query.paymentStatus;
    let type = req.query.type;
    const today = new Date(date);
    today.setUTCHours(0, 0, 0, 0);
    const currentPage = req.query.page || 1;
    const perPage = 10;
    if (type != "undefined") {
      if (status == "Payment Paid" || status == "Pending") {
        let totalOrders = await Order.find({
          createdAt: {
            $gte: today,
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // set the end of the day to 24 hours after the beginning of the day
          },
          userId: { $in: userId },
          paymentStatus: status,
          type: type,
        }).countDocuments();
        const orders = await Order.find({
          userId: { $in: userId },
          createdAt: {
            $gte: today,
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // set the end of the day to 24 hours after the beginning of the day
          },
          paymentStatus: status,
          type: type,
        })
          .sort({ createdAt: -1 })
          .skip((currentPage - 1) * perPage)
          .limit(perPage);
        res.status(200).json({
          message: "Orders Fetched",
          orders: orders,
          totalOrders: totalOrders,
        });
      } else {
        let totalOrders = await Order.find({
          userId: { $in: userId },
          createdAt: {
            $gte: today,
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // set the end of the day to 24 hours after the beginning of the day
          },
          type: type,
        }).countDocuments();
        const orders = await Order.find({
          userId: { $in: userId },
          createdAt: {
            $gte: today,
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // set the end of the day to 24 hours after the beginning of the day
          },
          type: type,
        })
          .sort({ createdAt: -1 })
          .skip((currentPage - 1) * perPage)
          .limit(perPage);
        res.status(200).json({
          message: "Orders Fetched",
          orders: orders,
          totalOrders: totalOrders,
        });
      }
    } else {
      if (status == "Payment Paid" || status == "Pending") {
        let totalOrders = await Order.find({
          createdAt: {
            $gte: today,
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // set the end of the day to 24 hours after the beginning of the day
          },
          userId: { $in: userId },
          paymentStatus: status,
        }).countDocuments();
        const orders = await Order.find({
          userId: { $in: userId },
          createdAt: {
            $gte: today,
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // set the end of the day to 24 hours after the beginning of the day
          },
          paymentStatus: status,
        })
          .sort({ createdAt: -1 })
          .skip((currentPage - 1) * perPage)
          .limit(perPage);
        res.status(200).json({
          message: "Orders Fetched",
          orders: orders,
          totalOrders: totalOrders,
        });
      } else {
        let totalOrders = await Order.find({
          userId: { $in: userId },
          createdAt: {
            $gte: today,
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // set the end of the day to 24 hours after the beginning of the day
          },
        }).countDocuments();
        const orders = await Order.find({
          userId: { $in: userId },
          createdAt: {
            $gte: today,
            $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // set the end of the day to 24 hours after the beginning of the day
          },
        })
          .sort({ createdAt: -1 })
          .skip((currentPage - 1) * perPage)
          .limit(perPage);
        res.status(200).json({
          message: "Orders Fetched",
          orders: orders,
          totalOrders: totalOrders,
        });
      }
    }

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

exports.rangeOrder = asyncHandler(async (req, res, next) => {


  try {
    let userId = req.params.id;
    let status = req.query.paymentStatus;
    let type = req.query.type;
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
    const start = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
    const end = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate() + 1
    );

    const currentPage = req.query.page || 1;
    const perPage = 10;
    if (type != "undefined") {
      if (status == "Payment Paid" || status == "Pending") {
        let totalOrders = await Order.find({
          userId: { $in: userId },
          createdAt: { $gte: start, $lt: end },
          paymentStatus: status,
          type: type,
        }).countDocuments();

        const orders = await Order.find({
          userId: { $in: userId },
          createdAt: { $gte: start, $lt: end },
          paymentStatus: status,
          type: type,
        })
          .sort({ createdAt: -1 })
          .skip((currentPage - 1) * perPage)
          .limit(perPage);
        res.status(200).json({
          message: "Orders Fetched",
          orders: orders,
          totalOrders: totalOrders,
        });
      } else {
        let totalOrders = await Order.find({
          userId: { $in: userId },
          createdAt: { $gte: start, $lt: end },
          type: type,
        }).countDocuments();
        const orders = await Order.find({
          userId: { $in: userId },
          createdAt: { $gte: start, $lt: end },
          type: type,
        })
          .sort({ createdAt: -1 })
          .skip((currentPage - 1) * perPage)
          .limit(perPage);
        res.status(200).json({
          message: "Orders Fetched",
          orders: orders,
          totalOrders: totalOrders,
        });
      }
    } else {
      if (status == "Payment Paid" || status == "Pending") {
        let totalOrders = await Order.find({
          userId: { $in: userId },
          createdAt: { $gte: start, $lt: end },
          paymentStatus: status,
        }).countDocuments();

        const orders = await Order.find({
          userId: { $in: userId },
          createdAt: { $gte: start, $lt: end },
          paymentStatus: status,
        })
          .sort({ createdAt: -1 })
          .skip((currentPage - 1) * perPage)
          .limit(perPage);
        res.status(200).json({
          message: "Orders Fetched",
          orders: orders,
          totalOrders: totalOrders,
        });
      } else {
        let totalOrders = await Order.find({
          userId: { $in: userId },
          createdAt: { $gte: start, $lt: end },
        }).countDocuments();
        const orders = await Order.find({
          userId: { $in: userId },
          createdAt: { $gte: start, $lt: end },
        })
          .sort({ createdAt: -1 })
          .skip((currentPage - 1) * perPage)
          .limit(perPage);
        res.status(200).json({
          message: "Orders Fetched",
          orders: orders,
          totalOrders: totalOrders,
        });
      }
    }

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

exports.pendingAmount = asyncHandler(async (req, res, next) => {



  try {
    let userId = req.params.id;
    const orders = await Order.find({
      userId: userId,
      paymentStatus: "Pending",
    });

    if (!orders) {
      const error = new Error('orders Not Found')
      error.statusCode = 404
      throw error
    }
    const totalSubtotal = orders.reduce(
      (acc, order) => acc + order.subtotal,
      0
    );

    res
      .status(200)
      .json({ message: "Pending Amount", pendingAmount: totalSubtotal });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});
