const Menu = require("../models/MenuModel");
const Section = require("../models/SectionModel");
const FeedbackForm = require("../models/FeedbackFormModel");
const Item = require("../models/ItemModal");
const SubSection = require("../models/SubSectionModel");
const SubSectionItem = require("../models/SubSectionItemModel");
const asyncHandler = require("express-async-handler");

//Get All Menu QR ---Get
exports.getAllMenuQr = async (req, res, next) => {
  let userId = req.params.id;

  try {
    const menu = await Menu.find({
      userId: { $in: userId },
      menuStatus: true,
    }).populate({
      path: "section",
      populate: [
        { path: "item" },
        {
          path: "subSection",
          populate: [
            {
              path: "item",
            },
          ],
        },
      ],
    });
    // console.log(menu.length);
    res.status(200).json({
      success: true,
      menu,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//Get All Section By Menu Id QR ---Get
exports.getAllSectionByMenuIdQr = async (req, res, next) => {
  let menuId = req.params.id;

  await Section.find({
    menuId: { $in: menuId },
    sectionStatus: true,
  })
    .populate("item")
    .populate({
      path: "subSection", // populate subsectionsection
      populate: {
        path: "item", // in section, populate item
      },
    })

    .then((section) => {
      console.log(section.length);
      return res.status(200).json({
        success: true,
        section,
      });
    });
};

//Get All Item by Section ID Qr ---Get
exports.getAllItemBySectionIdQr = asyncHandler(async (req, res, next) => {
  let sectionId = req.params.id;

  await Item.find({ sectionId: { $in: sectionId }, active: true })
    .then((item) => {
      return res.status(200).json({
        success: true,
        item,
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(400).json({
        success: false,
        error: "Error finding items",
      });
    });
});

//Get Single Item Qr ---Get
exports.getSingleItemQr = asyncHandler(async (req, res, next) => {
  try {
    let itemId = req.params.id;
    const item = await Item.findById(itemId);
    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      error: "Error finding item",
    });
  }
});

//Get All SubSection Qr By Section ID ---Get
exports.getAllSubSectionBySectionIdQr = asyncHandler(async (req, res, next) => {
  let sectionId = req.params.id;
  try {
    const subSection = await SubSection.find({
      sectionId: { $in: sectionId },
      sectionStatus: true,
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

//Get All Item by Subsection Qr ID ---Get
exports.getAllItemBySubSectionIdQr = asyncHandler(async (req, res, next) => {
  let subSectionId = req.params.id;
  SubSectionItem.find({ subSectionId: { $in: subSectionId }, active: true })
    .then((item) => {
      res.status(200).json({
        success: true,
        item,
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    });
});

//Get Single Sub Item Qr ---Get
exports.getSingleSubItemQr = asyncHandler(async (req, res, next) => {
  try {
    let itemId = req.params.id;
    const item = await SubSectionItem.findById(itemId);
    if (!item) {
      return res.status(400).json({
        success: false,
        message: "Item is not found with this id",
      });
    }
    res.status(200).json({
      success: true,
      item,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error occured while trying to get item",
      error: err,
    });
  }
});

//Get Single Sub Item Qr ---Get
exports.getSingleSubItemQr = asyncHandler(async (req, res, next) => {
  try {
    let itemId = req.params.id;
    const item = await SubSectionItem.findById(itemId);
    if (!item) {
      return res.status(400).json({
        success: false,
        message: "Item is not found with this id",
      });
    }
    res.status(200).json({
      success: true,
      item,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error occured while trying to get item",
      error: err,
    });
  }
});

exports.getAllFormQr = async (req, res, next) => {
  const feedbackForm = await FeedbackForm.find({
    active: { $in: true },
  }).populate("formQuestions");

  res.status(200).json({
    success: true,
    feedbackForm,
  });
};
