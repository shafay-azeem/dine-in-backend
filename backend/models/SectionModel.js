const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    sectionName: {
    },
    sectionDescription: {

    },
    sectionName: {

    },


    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Section", sectionSchema)
