const asyncHandler = require("express-async-handler");
const Order = require("../models/OrderModel");
const Payment = require("../models/PaymentModel");
const mongoose = require("mongoose");

//Make Payment --Post
exports.makePayment = asyncHandler(async (req, res, next) => {

  try {
    let userId = req.params.id;
    const {
      email,
      phone_Number,
      order_Id,
      payment_method,
      transaction_id,
      amount,
      payment_status,
      uniqueOrderId
    } = req.body;

    const payment = new Payment({
      userId: userId,
      email,
      phone_Number,
      order_Id,
      payment_method,
      transaction_id,
      amount,
      payment_status,
      uniqueOrderId
    });

    await payment.save();

    if (payment_status === "Success") {
      const order = await Order.findByIdAndUpdate(
        order_Id,
        { $set: { paymentStatus: "Payment Paid" } },
        { new: true, query: { userId: { $in: userId } } }
      );

      res.status(201).json({ succces: true, message: "Payment created successfully", payment });
    } else {
      const error = new Error('Payment status not found')
      error.statusCode = 404
      throw error
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

//get PaymentListAll
exports.getAllPayment = asyncHandler(async (req, res, next) => {

  try {
    const currentPage = req.query.page || 1;
    const perPage = 10;
    const totalPaymentCount = await Payment.find({ userId: req.params.id }).countDocuments()
    const payments = await Payment.find({ userId: req.params.id }).sort({ createdAt: -1 }).skip((currentPage - 1) * perPage)
      .limit(perPage);
    res.status(200).json({ payments: payments, totalPaymentCount: totalPaymentCount });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

//getSingleDatePayment
exports.getSingleDatePayment = asyncHandler(async (req, res, next) => {

  try {
    const currentPage = req.query.page || 1;
    const perPage = 10;
    let date = req.query.date;
    const today = new Date(date);
    today.setHours(0, 0, 0, 0); // Set the time to the beginning of the current day
    const endOfToday = new Date(today.getTime() + 24 * 60 * 60 * 1000); // Set the time to the end of the current day

    const totalPaymentCount = await Payment.find({
      userId: req.params.id,
      createdAt: {
        $gte: today,
        $lt: endOfToday,
      },
    }).countDocuments()
    const payments = await Payment.find({
      userId: req.params.id,
      createdAt: {
        $gte: today,
        $lt: endOfToday,
      },
    }).sort({ createdAt: -1 }).skip((currentPage - 1) * perPage)
      .limit(perPage);
    res.status(200).json({ payments: payments, totalPaymentCount: totalPaymentCount });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

//get Multi date 
exports.getMultiDatePayment = asyncHandler(async (req, res, next) => {

  try {
    const currentPage = req.query.page || 1;
    const perPage = 10;
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

    const totalPaymentCount = await Payment.find({
      userId: req.params.id,
      createdAt: { $gte: start, $lt: end },
    }).countDocuments()
    const payments = await Payment.find({
      userId: req.params.id,
      createdAt: { $gte: start, $lt: end },
    }).sort({ createdAt: -1 }).skip((currentPage - 1) * perPage)
      .limit(perPage);
    res.status(200).json({ payments: payments, totalPaymentCount: totalPaymentCount });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

//Get Payment Detail By Id --Get
exports.getPaymentDetail = asyncHandler(async (req, res) => {

  try {
    let paymentId = req.params.id;
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      const error = new Error('Payment Not Found')
      error.statusCode = 404
      throw error
    }

    res.status(200).json({
      success: true,
      message: 'Payment Get Successfully',
      payment,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error)
  }
});

//daily basis
exports.getRevenueOnDailyBasis = asyncHandler(async (req, res) => {

  try {
    let userId = req.params.id;
    const date = new Date(req.query.date);
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );
    await Payment.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
          createdAt: { $gte: startOfDay, $lt: endOfDay },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]).exec((err, result) => {
      if (err) {
        res.status(400).json({
          success: false,
          error: err.message,
        });
      } else {
        if (result.length == 1) {
          const totalRevenue = result[0].totalRevenue;
          res.status(200).json({
            success: true,
            totalRevenue,
          });
        } else {
          let totalRevenue = 0
          res.status(200).json({
            success: true,
            totalRevenue,
          });
        }
      }
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

//range
exports.revenueRange = asyncHandler(async (req, res) => {

  try {
    let userId = req.params.id;
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
    await Payment.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
          createdAt: { $gte: start, $lt: end },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]).exec((err, result) => {
      if (err) {
        res.status(400).json({
          success: false,
          error: err.message,
        });
      } else {
        if (result.length == 1) {
          const totalRevenue = result[0].totalRevenue;
          res.status(200).json({
            success: true,
            totalRevenue,
          });
        } else {
          let totalRevenue = 0
          res.status(200).json({
            success: true,
            totalRevenue,
          });
        }
      }
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

//total
exports.totalRevenue = asyncHandler(async (req, res) => {

  try {
    let userId = req.params.id;
    const totalAmount = await Payment.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json({
      succes: true,
      message: 'Total Revenue',
      totalAmount: totalAmount[0]?.total
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});


exports.paymentDetailByOrderId = asyncHandler(async (req, res) => {

  try {
    let userId = req.params.id;
    let orderId = req.query.orderId
    let payment = await Payment.findOne({
      userId: { $in: userId },
      order_Id: orderId,
    })

    if (!payment) {
      const error = new Error('payment Not Found')
      error.statusCode = 404
      throw error
    }

    res.status(200).json({
      success: true,
      message: 'Payment get Successfully',
      payment: payment
    });

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
})

