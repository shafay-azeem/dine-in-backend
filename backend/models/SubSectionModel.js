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
    type: Number,
  },
  sectionLabel: [
    {
      Name: {
        type: String,
      },
      Signature: {
        type: String,
      }
    }
  ],
  sectionStatus: {
    type: Boolean,
    default: false
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
