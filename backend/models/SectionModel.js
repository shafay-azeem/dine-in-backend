const mongoose = require("mongoose");
const Item = require("../models/ItemModal");
const SubSection = require("./SubSectionModel");
const SubSectionItem = require("./SubSectionItemModel");

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

module.exports = mongoose.model("Section", sectionSchema);
