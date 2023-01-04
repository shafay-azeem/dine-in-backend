const Section = require("../models/SectionModel");
const Menu = require("../models/MenuModel");
const Item = require("../models/ItemModal");

//Create Section ---Post
exports.createSection = async (req, res, next) => {
  const { sectionName, sectionDescription, sectionNote, item } = req.body;

  const section = await Section.create({
    sectionName,
    sectionDescription,
    sectionNote,
    item,
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

//Get All Section ---Get
exports.getAllSection = async (req, res, next) => {
  const section = await Section.find().populate("item");

  res.status(200).json({
    success: true,
    section,
  });
};

//Create Item  ---Post
exports.createItem = async (req, res, next) => {
  const { itemName, itemDescription } = req.body;

  const item = await Item.create({
    itemName,
    itemDescription,
  });

  await updateSection(req.params.id, item);

  res.status(201).json({
    success: true,
    item,
  });
};

//Update Section Function
async function updateSection(sectionId, itemRes) {
  let section = await Section.findById(sectionId);
  section.item.push(itemRes);
  await section.save({ validateBeforeSave: false });
}

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
  });

  res.status(200).json({
    success: true,
    section,
  });
};
