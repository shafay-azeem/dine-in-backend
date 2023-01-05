const mongoose = require("mongoose");

const formQuestionSchema = new mongoose.Schema({
    question: {
        type: String,

    },
    questionType: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("FormQuestion", formQuestionSchema);
