const mongoose = require("mongoose");

const formResponseSchema = new mongoose.Schema({
    formQuestions: {
        formName: {
            type: String
        },
        formQuestionsRef: {
            type: mongoose.Schema.ObjectId,
            ref: "FormQuestion",
        },


    },
    response: [
        {
            questionRef: {
                type: mongoose.Schema.ObjectId,
                ref: "FeedbackForm",
            },
            question: {
                type: String
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
