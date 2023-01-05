const mongoose = require("mongoose");
const FormQuestion = require('./FormQuestionModel')

const feedbackFormSchema = new mongoose.Schema({
    formName: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false
    },
    formQuestions: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "FormQuestion",
        },
    ],
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("FeedbackForm", feedbackFormSchema);
