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
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
});

//Update Function
async function updateSection(sectionId, subSectionRes) {
  let section = await Section.findById(sectionId);

  if (!section) {
    const error = new Error('section Not Found')
    error.statusCode = 404
    throw error
  }
  section.subSection.push(subSectionRes);
  await section.save({ validateBeforeSave: false });
}

//Delete Sub Section ---Delete
exports.deleteSubSection = asyncHandler(async (req, res, next) => {
  let subSection;
  try {
    subSection = await SubSection.findById(req.params.id);
    if (!subSection) {
      const error = new Error('subSection Not Found')
      error.statusCode = 404
      throw error
    }
    await subSection.remove();
    res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
    });
  } catch (errors) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
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
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
});

//Get All Sub Section ---Get
exports.getAllSubSection = asyncHandler(async (req, res, next) => {
  try {
    const subSection = await SubSection.find()
      .populate("item")
      .catch((error) => {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      });

    if (!subSection) {
      const error = new Error('SubSection Not Found')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({
      success: true,
      subSection,
    });

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }

});

//Get All SubSection By Section ID ---Get
exports.getAllSubSectionBySectionId = asyncHandler(async (req, res, next) => {
  let sectionId = req.params.id;
  try {
    const subSection = await SubSection.find({
      sectionId: { $in: sectionId },
    }).populate("item");


    if (!subSection) {
      const error = new Error('SubSection Not Found')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({
      success: true,
      subSection,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
});

//Get Single Sub Section By Id ---Get
exports.getSingleSubSection = asyncHandler(async (req, res, next) => {
  let subSectionId = req.params.id;
  try {
    const subSection = await SubSection.findById(subSectionId).populate("item");

    if (!subSection) {
      const error = new Error('SubSection Not Found')
      error.statusCode = 404
      throw error
    }

    res.status(200).json({
      success: true,
      subSection,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
});

//Update Sub Section By Id
exports.updateSubSection = asyncHandler(async (req, res, next) => {

  try {
    let subSection = await SubSection.findById(req.params.id);
    if (!subSection) {
      const error = new Error('SubSection Not Found')
      error.statusCode = 404
      throw error
    }
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
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err);
  }
});
