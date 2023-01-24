const mongoose = require("mongoose");

const formResponseSchema = new mongoose.Schema({
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
