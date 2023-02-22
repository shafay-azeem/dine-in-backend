const asyncHandler = require("express-async-handler");
const Order = require("../models/OrderModel");
const Payment = require("../models/PaymentModel");

//Make Payment --Post
exports.makePayment = asyncHandler(async (req, res, next) => {
  let userId = req.params.id;
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
    userId: userId,
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
        { new: true, query: { userId: { $in: userId } } }
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
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

//daily basis
exports.getRevenueOnDailyBasis = asyncHandler(async (req, res) => {
  let userId = req.params.id;
  const date = new Date(req.query.date);
  const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  try {
    await Payment.aggregate([
      {
        $match: {
          userId: { $in: userId },
          createdAt: { $gte: startOfDay, $lt: endOfDay }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" }
        }
      }
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
          res.status(200).json({
            success: true,
            message: "No revenue on entered date",
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
})

//range
exports.revenueRange = asyncHandler(async (req, res) => {
  let userId = req.params.id;
  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1);
  try {
    await Payment.aggregate([
      {
        $match: {
          userId: { $in: userId },
          createdAt: { $gte: start, $lt: end }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" }
        }
      }
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
        }
        else {
          res.status(200).json({
            success: true,
            message: "No revenue on entered date",
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
})

//total
exports.totalRevenue = asyncHandler(async (req, res) => {
  let userId = req.params.id;
  try {
    const totalAmount = await Payment.aggregate([
      {
        $match: {
          userId: { $in: userId }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    res.json({ totalAmount: totalAmount[0]?.total });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
