const mongoose = require("mongoose");

const modifierSchema = new mongoose.Schema({
    Groupname: {
        type: String,
    },
    modifiers: [
        {
            Name: {
                type: String,

            },
            Price: {
                type: String,
            },
            Calorie: {
                type: String,
            },
        },
    ],

    createAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Modifier", modifierSchema);
