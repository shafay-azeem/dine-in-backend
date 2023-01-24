const mongoose = require("mongoose");

const formResponseSchema = new mongoose.Schema({
  userName: {
    type: String,
    ref: "User",
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  formName: {
    type: String,
  },
  response: [
    {
      question: {
        type: String,
      },
      answer: {
        type: String,
      },
    },
  ],

  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("FormResponse", formResponseSchema);
