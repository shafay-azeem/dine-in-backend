const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
  sectionId: {
    type: mongoose.Schema.ObjectId,
    ref: "Section",
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
      ref: "SubSectionItem",
    },
  ],

  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("SubSection", subSectionSchema);
