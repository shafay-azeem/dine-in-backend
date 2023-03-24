const mongoose = require("mongoose");

const labelSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },

    itemLabel: [
        {
            label: {
                type: String,

            },
            value: {
                type: String,
            },
            svg: {
                type: String,
            },
        },
    ],
});

module.exports = mongoose.model("Label", labelSchema);
