const mongoose = require("mongoose");
const Item = require("../models/ItemModal");
const SubSection = require("./SubSectionModel");

const sectionSchema = new mongoose.Schema({
  menuId: {
    type: mongoose.Schema.ObjectId,
    ref: "Menu",
  },
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
      ref: "Item",
    },
  ],

  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Section", sectionSchema);
