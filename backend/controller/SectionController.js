const Section = require("../models/SectionModel");
const Menu = require("../models/MenuModel");
const Item = require("../models/ItemModal");

//Create Section ---Post
exports.createSection = async (req, res, next) => {
  const {
    sectionName,
    sectionDescription,
    sectionNote,
    sectionLabel,
    sectionStatus,
    sectionImage,
  } = req.body;

  const section = await Section.create({
    sectionName,
    sectionDescription,
    sectionNote,
    sectionLabel,
    sectionStatus,
    sectionImage,

    menuId: req.params.id,
  });

  await updateMenu(req.params.id, section);

  res.status(201).json({
    success: true,
    section,
  });
};

//Update Function
async function updateMenu(menuId, sectionRes) {
  let menu = await Menu.findById(menuId);
  menu.section.push(sectionRes);
  await menu.save({ validateBeforeSave: false });
}

//Delete Section ---Delete
exports.deleteSection = async (req, res) => {
  let section = await Section.findById(req.params.id);

  if (!section) {
    return res.status(500).json({
      success: false,
      message: "Invalid Id",
    });
  }

  await section.remove();

  res.status(200).json({
    success: true,
    message: "Section deleted successfully",
  });
};

//Delete All Section
exports.deleteAllSection = async (req, res) => {
  let section = await Section.deleteMany();

  res.status(200).json({
    success: true,
    message: "All Section Deleted Successfully",
  });
};

//Get All Section ---Get
exports.getAllSection = async (req, res, next) => {
  const section = await Section.find()
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
};

//Get All Section By Menu Id ---Get
exports.getAllSectionByMenuId = async (req, res, next) => {
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

  // const section = await Section.find().then((sec) => {
  //   const secArr = sec.filter((section) => {
  //     return section.menuId == menuId;
  //   });

  //   return res.status(200).json({
  //     success: true,
  //     secArr,
  //   });
  // });
};

//Get Single Section ---Get
exports.getSingleSection = async (req, res, next) => {
  let sectionId = req.params.id;

  const section = await Section.findById(sectionId)
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
};

//Update Section By Id
exports.updateSection = async (req, res) => {
  let section = await Section.findById(req.params.id);

  if (!section) {
    return res.status(500).json({
      success: false,
      message: "Invalid Id",
    });
  }

  section = await Section.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
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
};
