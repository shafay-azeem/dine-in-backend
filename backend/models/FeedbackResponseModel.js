const mongoose = require("mongoose");

const formResponseSchema = new mongoose.Schema({
    formQuestions:
    {
        type: mongoose.Schema.ObjectId,
        ref: "FormQuestion",
    },

    responses: [
        {
            question: {
                type: mongoose.Schema.ObjectId,
                ref: "FeedbackForm",
            },
            answer: {
                type: String,
            },
        }
    ],

    createAt: {
        type: Date,
        default: Date.now(),
    },


});

module.exports = mongoose.model("FormResponse", formResponseSchema);
