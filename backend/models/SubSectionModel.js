const mongoose = require("mongoose");
const Item = require("../models/ItemModal");

const subSectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
  },
  sectionDescription: {
    type: String,
  },
  sectionNote: {
    type: Number,
  },
  item: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Item",
    },
  ],

  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("SubSection", subSectionSchema);
