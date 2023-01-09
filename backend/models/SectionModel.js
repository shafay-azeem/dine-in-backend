const mongoose = require("mongoose");
const Item = require("../models/ItemModal");
const SubSection = require("../models/SubSectionModal");

const sectionSchema = new mongoose.Schema({
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
  subSection: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "SubSection",
    },
  ],

  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Section", sectionSchema);
