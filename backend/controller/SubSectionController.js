const SubSection = require("../models/SubSectionModel");
const Section = require("../models/SectionModel");
const asyncHandler = require("express-async-handler");

//Create Sub Section ---Post
exports.createSubSection = asyncHandler(async (req, res, next) => {
  const {
    sectionName,
    sectionDescription,
    sectionNote,
    sectionLabel,
    sectionStatus,
    sectionToggle,
    sectionImage,
  } = req.body;
  try {
    const subSection = await SubSection.create({
      sectionName,
      sectionDescription,
      sectionNote,
      sectionLabel,
      sectionStatus,
      sectionToggle,
      sectionImage,
      sectionId: req.params.id,
    });
    await updateSection(req.params.id, subSection);
    res.status(201).json({
      success: true,
      subSection,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

//Update Function
async function updateSection(sectionId, subSectionRes) {
  let section = await Section.findById(sectionId);
  section.subSection.push(subSectionRes);
  await section.save({ validateBeforeSave: false });
}

//Delete Sub Section ---Delete
exports.deleteSubSection = asyncHandler(async (req, res, next) => {
  let subSection;
  try {
    subSection = await SubSection.findById(req.params.id);
    if (!subSection) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id",
      });
    }
    await subSection.remove();
    res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error deleting SubSection",
      error: err,
    });
  }
});

//Delete All SubSection
exports.deleteAllSubSection = asyncHandler(async (req, res, next) => {
  let subSection;
  try {
    subSection = await SubSection.deleteMany();
    res.status(200).json({
      success: true,
      message: "All SubSections Deleted Successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error deleting SubSections: " + err,
    });
  }
});

//Get All Sub Section ---Get
exports.getAllSubSection = asyncHandler(async (req, res, next) => {
  const subSection = await SubSection.find()
    .populate("item")
    .catch((error) => {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    });
  if (!subSection) {
    return res.status(500).json({
      success: false,
      message: "No SubSections found",
    });
  }
  res.status(200).json({
    success: true,
    subSection,
  });
});

//Get All SubSection By Section ID ---Get
exports.getAllSubSectionBySectionId = asyncHandler(async (req, res, next) => {
  let sectionId = req.params.id;
  try {
    const subSection = await SubSection.find({
      sectionId: { $in: sectionId },
    }).populate("item");
    res.status(200).json({
      success: true,
      subSection,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "An error occurred while trying to fetch the SubSection",
      error: err,
    });
  }
});

//Get Single Sub Section By Id ---Get
exports.getSingleSubSection = asyncHandler(async (req, res, next) => {
  let subSectionId = req.params.id;
  try {
    const subSection = await SubSection.findById(subSectionId).populate("item");
    res.status(200).json({
      success: true,
      subSection,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

//Update Sub Section By Id
exports.updateSubSection = asyncHandler(async (req, res, next) => {
  let subSection = await SubSection.findById(req.params.id);
  if (!subSection) {
    return res.status(400).json({
      success: false,
      message: "Invalid Id",
    });
  }
  try {
    subSection = await SubSection.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }).populate("item");
    res.status(200).json({
      success: true,
      subSection,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});
