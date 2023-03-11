const Menu = require("../models/MenuModel");
const Section = require("../models/SectionModel");
const FeedbackForm = require("../models/FeedbackFormModel");
const Item = require("../models/ItemModal");
const SubSection = require("../models/SubSectionModel");
const SubSectionItem = require("../models/SubSectionItemModel");
const asyncHandler = require("express-async-handler");

//Get All Menu QR ---Get
exports.getAllMenuQr = async (req, res, next) => {


  try {
    let userId = req.params.id;
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
    if (!menu) {
      const error = new Error('Menu Not Found')
      error.statusCode = 404
      throw error
    }

    res.status(200).json({
      success: true,
      menu,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//Get All Section By Menu Id QR ---Get
exports.getAllSectionByMenuIdQr = async (req, res, next) => {

  try {
    let menuId = req.params.id;

    let section = await Section.find({
      menuId: { $in: menuId },
      sectionStatus: true,
    })
      .populate("item")
      .populate({
        path: "subSection", // populate subsectionsection
        populate: {
          path: "item", // in section, populate item
        },
      }).exec()

    if (!section) {
      const error = new Error('Section Not Found')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({
      success: true,
      section,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }

};

//Get All Item by Section ID Qr ---Get
exports.getAllItemBySectionIdQr = asyncHandler(async (req, res, next) => {
  try {
    let sectionId = req.params.id;
    let item = await Item.find({ sectionId: { $in: sectionId }, active: true }).exec()
    if (!item) {
      const error = new Error('Item Not Found')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({
      success: true,
      item,

    })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

//Get Single Item Qr ---Get
exports.getSingleItemQr = asyncHandler(async (req, res, next) => {
  try {
    let itemId = req.params.id;
    const item = await Item.findById(itemId);
    if (!item) {
      const error = new Error('Item Item Not Found')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({
      success: true,
      item,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

//Get All SubSection Qr By Section ID ---Get
exports.getAllSubSectionBySectionIdQr = asyncHandler(async (req, res, next) => {
  try {
    let sectionId = req.params.id;
    const subSection = await SubSection.find({
      sectionId: { $in: sectionId },
      sectionStatus: true,
    }).populate("item").exec();
    if (!subSection) {
      const error = new Error('SubSection  Not Found')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({
      success: true,
      subSection,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

//Get All Item by Subsection Qr ID ---Get
exports.getAllItemBySubSectionIdQr = asyncHandler(async (req, res, next) => {
  try {
    let subSectionId = req.params.id;
    let item = await SubSectionItem.find({ subSectionId: { $in: subSectionId }, active: true }).exec()
    if (!item) {
      const error = new Error('SubSection Item  Not Found')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({
      success: true,
      item,
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }


});

//Get Single Sub Item Qr ---Get
exports.getSingleSubItemQr = asyncHandler(async (req, res, next) => {
  try {
    let itemId = req.params.id;
    const item = await SubSectionItem.findById(itemId);
    if (!item) {
      const error = new Error('SubSection Item  Not Found')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({
      success: true,
      item,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

//Get Single Sub Item Qr ---Get
exports.getSingleSubItemQr = asyncHandler(async (req, res, next) => {
  try {
    let itemId = req.params.id;
    const item = await SubSectionItem.findById(itemId);
    if (!item) {
      const error = new Error('SubSection Item  Not Found')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({
      success: true,
      item,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

exports.getAllFormQr = async (req, res, next) => {
  try {
    let userId = req.params.id;

    const feedbackForm = await FeedbackForm.find({
      active: { $in: true },
      userId: { $in: userId },
    }).populate("formQuestions").exec();
    if (!feedbackForm) {
      const error = new Error('Feedback Form  Not Found')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({
      success: true,
      feedbackForm,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

};
