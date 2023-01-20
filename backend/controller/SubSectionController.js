const SubSection = require("../models/SubSectionModel");
const Section = require("../models/SectionModel");

//Create Sub Section ---Post
exports.createSubSection = async (req, res, next) => {
  const { sectionName, sectionDescription, sectionNote, sectionLabel, sectionStatus, sectionImage } = req.body;

  const subSection = await SubSection.create({
    sectionName,
    sectionDescription,
    sectionNote,
    sectionLabel,
    sectionStatus,
    sectionImage,
    sectionId: req.params.id
  });

  await updateSection(req.params.id, subSection);

  res.status(201).json({
    success: true,
    subSection,
  });
};

//Update Function
async function updateSection(sectionId, subSectionRes) {
  let section = await Section.findById(sectionId);
  section.subSection.push(subSectionRes);
  await section.save({ validateBeforeSave: false });
}

//Delete Sub Section ---Delete
exports.deleteSubSection = async (req, res) => {
  let subSection = await SubSection.findById(req.params.id);

  if (!subSection) {
    return res.status(500).json({
      success: false,
      message: "Invalid Id",
    });
  }

  await subSection.remove();

  res.status(200).json({
    success: true,
    message: "SubSection deleted successfully",
  });
};

//Delete All SubSection
exports.deleteAllSubSection = async (req, res) => {
  let subSection = await SubSection.deleteMany();

  res.status(200).json({
    success: true,
    message: "All SubSection Deleted Successfully",
  });
};

//Get All Sub Section ---Get
exports.getAllSubSection = async (req, res, next) => {
  const subSection = await SubSection.find().populate('item');

  res.status(200).json({
    success: true,
    subSection,
  });
};


//Get All Sub Section BY Section ID ---Get
exports.getAllSubSectionBySectionId = async (req, res, next) => {
  let sectionId = req.params.id

  await SubSection.find({ sectionId: { $in: sectionId } }).populate('item').then((subSection) => {
    return res.status(200).json({
      success: true,
      subSection,
    });
  });
};

//Get Single Sub Section ---Get
exports.getSingleSubSection = async (req, res, next) => {
  let subSectionId = req.params.id;

  const subSection = await SubSection.findById(subSectionId).populate('item');

  res.status(200).json({
    success: true,
    subSection,
  });
};

//Update Sub Section By Id
exports.updateSubSection = async (req, res) => {
  let subSection = await SubSection.findById(req.params.id);

  if (!subSection) {
    return res.status(500).json({
      success: false,
      message: "Invalid Id",
    });
  }

  subSection = await SubSection.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  }).populate('item');

  res.status(200).json({
    success: true,
    subSection,
  });
};
