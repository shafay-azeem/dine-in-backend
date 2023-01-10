const SubSectionItem = require("../models/SubSectionItemModel");
const SubSection = require("../models/SubSectionModel");

//Create SubSection Item  ---Post
exports.createSubSectionItem = async (req, res, next) => {
  const { itemName, itemDescription } = req.body;

  const subSectionItem = await SubSectionItem.create({
    itemName,
    itemDescription,
  });

  await updateSubSection(req.params.id, subSectionItem);

  res.status(201).json({
    success: true,
    subSectionItem,
  });
};

//Update Section Function
async function updateSubSection(subSectionId, subSectionItemRes) {
  let subSection = await SubSection.findById(subSectionId);
  subSection.item.push(subSectionItemRes);
  await subSection.save({ validateBeforeSave: false });
}

//Delete All Item
exports.deleteAllSubItem = async (req, res) => {
  let subSectionItem = await SubSectionItem.deleteMany();

  res.status(200).json({
    success: true,
    message: "All SubSection Item Deleted Successfully",
  });
};

//Get All SubSection Item ---Get
exports.getAllSubItem = async (req, res, next) => {
  const subSectionItem = await SubSectionItem.find();

  res.status(200).json({
    success: true,
    subSectionItem,
  });
};

//Get Single Section ---Get
exports.getSingleSubItem = async (req, res, next) => {
  let subItemId = req.params.id;

  const subSectionItem = await SubSectionItem.findById(subItemId);

  res.status(200).json({
    success: true,
    subSectionItem,
  });
};
