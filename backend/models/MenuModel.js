const mongoose = require("mongoose");
const Section = require("../models/SectionModel");



const menuSchema = new mongoose.Schema({
    menuName: {
        type: String,
    },
    menuDescription: {
        type: String,
    },
    menuNote: {
        type: Number,
    },

    section: [{
        type: mongoose.Schema.ObjectId,
        ref: "Section",
    }
    ],
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Menu", menuSchema);

