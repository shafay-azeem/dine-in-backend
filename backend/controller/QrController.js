const Menu = require("../models/MenuModel");
const Section = require("../models/SectionModel");
const FeedbackForm = require("../models/FeedbackFormModel");

//Get All Menu QR ---Get
exports.getAllMenuQr = async (req, res, next) => {
  try {
    const menu = await Menu.find({ menuStatus: { $in: true } }).populate({
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

exports.getAllFormQr = async (req, res, next) => {
  const feedbackForm = await FeedbackForm.find({
    active: { $in: true },
  }).populate("formQuestions");

  res.status(200).json({
    success: true,
    feedbackForm,
  });
};
