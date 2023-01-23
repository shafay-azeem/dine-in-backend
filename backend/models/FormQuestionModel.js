const mongoose = require("mongoose");

const formQuestionSchema = new mongoose.Schema({
  feedbackFormId: {
    type: mongoose.Schema.ObjectId,
    ref: "FeedbackForm",
  },

  Questions: [
    {
      question: {
        type: String,
      },
      questionType: {
        type: String,
      },
    },
  ],

  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("FormQuestion", formQuestionSchema);
