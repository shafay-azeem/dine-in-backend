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
    type: String,
  },
  sectionLabel: [
    {
      label: {
        type: String,
      },
      value: {
        type: String,
      },
    },
  ],
  sectionStatus: {
    type: Boolean,
    default: false,
  },
  sectionToggle: {
    type: Boolean,
    default: false,
  },
  sectionImage: {
    type: String,
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
