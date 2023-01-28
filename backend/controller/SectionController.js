const Section = require("../models/SectionModel");
const Menu = require("../models/MenuModel");
const Item = require("../models/ItemModal");
const asyncHandler = require("express-async-handler");

//Create Section ---Post
exports.createSection = asyncHandler(async (req, res, next) => {
  try {
    const {
      sectionName,
      sectionDescription,
      sectionNote,
      sectionLabel,
      sectionStatus,
      sectionToggle,
      sectionImage,
    } = req.body;

    const section = await Section.create({
      sectionName,
      sectionDescription,
      sectionNote,
      sectionLabel,
      sectionStatus,
      sectionToggle,
      sectionImage,
      menuId: req.params.id,
    });

    await updateMenu(req.params.id, section);

    res.status(201).json({
      success: true,
      section,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

//Update Function
async function updateMenu(menuId, sectionRes) {
  let menu = await Menu.findById(menuId);
  menu.section.push(sectionRes);
  await menu.save({ validateBeforeSave: false });
}

//Delete Section ---Delete
exports.deleteSection = asyncHandler(async (req, res, next) => {
  let section = await Section.findById(req.params.id);
  if (!section) {
    return res.status(400).json({
      success: false,
      message: "Invalid Id",
    });
  }
  try {
    await section.remove();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
  res.status(200).json({
    success: true,
    message: "Section deleted successfully",
  });
});

//Delete All Section
exports.deleteAllSection = asyncHandler(async (req, res, next) => {
  let section;
  try {
    section = await Section.deleteMany();
    res.status(200).json({
      success: true,
      message: "All Section Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

//Get All Section ---Get
exports.getAllSection = asyncHandler(async (req, res, next) => {
  let section;
  try {
    section = await Section.find()
      .populate("item")
      .populate({
        path: "subSection", // populate subsectionsection
        populate: {
          path: "item", // in section, populate item
        },
      });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  res.status(200).json({
    success: true,
    section,
  });
});

//Get All Section By Menu Id ---Get
exports.getAllSectionByMenuId = asyncHandler(async (req, res, next) => {
  try {
    let menuId = req.params.id;

    await Section.find({ menuId: { $in: menuId } })
      .populate("item")
      .populate({
        path: "subSection", // populate subsectionsection
        populate: {
          path: "item", // in section, populate item
        },
      })
      .then((section) => {
        return res.status(200).json({
          success: true,
          section,
        });
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching sections",
      error: err.message,
    });
  }
});

//Get Single Section ---Get
exports.getSingleSection = asyncHandler(async (req, res, next) => {
  let sectionId = req.params.id;
  await Section.findById(sectionId)
    .populate("item")
    .populate({
      path: "subSection", // populate subsectionsection
      populate: {
        path: "item", // in section, populate item
      },
    })
    .then((section) => {
      if (!section) {
        return res.status(400).json({
          success: false,
          message: "Invalid section Id",
        });
      }
      return res.status(200).json({
        success: true,
        section,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
        error: err,
      });
    });
});

//Update Section By Id
exports.updateSection = asyncHandler(async (req, res, next) => {
  let section;
  try {
    section = await Section.findById(req.params.id);
    if (!section) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id",
      });
    }
    section = await Section.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    })
      .populate("item")
      .populate({
        path: "subSection", // populate subsectionsection
        populate: {
          path: "item", // in section, populate item
        },
      });
    res.status(200).json({
      success: true,
      section,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});
