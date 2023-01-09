const mongoose = require("mongoose");
const SubSectionItem = require("../models/SubSectionItemModel");

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
      ref: "SubSectionItem",
    },
  ],

  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("SubSection", subSectionSchema);
