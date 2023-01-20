
const SubSectionItem = require("../models/SubSectionItemModel");
const SubSection = require("../models/SubSectionModel");

//Create SubSection Item  ---Post
exports.createSubSectionItem = async (req, res, next) => {
  const {
    itemName,
    itemDescription,
    active,
    itemCalorie,
    itemTag,
    itemLabel,
    itemWarning,
    itemPrepTime,
    itemPrice,
    itemCalories,
    itemPriceOption,
    itemSaturatedFatPercentage,
    itemTransFat,
    itemCholesterol,
    itemCholesterolPercentage,
    itemSodium,
    itemSodiumPercentage,
    itemTotalCarbs,
    itemTotalCarbsPercentage,
    itemDietaryFiber,
    itemDietaryFiberPercentage,
    itemSugar,
    itemSugarPercentage,
    itemProtein,
    itemProteinPercentage,
    itemVitaminA,
    itemVitaminC,
    itemIron,
    itemCalcium,
    itemTotalFat,
    itemTotalFatPercentage,
    itemSaturatedFat,
    itemNutritionCalories,
    itemCaloriesFat,
    itemServingSize,
    itemModifier,
  } = req.body;


  const subSectionItem = await SubSectionItem.create({
    subSectionId: req.params.id,
    itemName,
    itemDescription,
    active,
    itemCalorie,
    itemTag,
    itemLabel,
    itemWarning,
    itemPrepTime,
    itemPrice,
    itemCalories,
    itemPriceOption,
    itemSaturatedFatPercentage,
    itemTransFat,
    itemCholesterol,
    itemCholesterolPercentage,
    itemSodium,
    itemSodiumPercentage,
    itemTotalCarbs,
    itemTotalCarbsPercentage,
    itemDietaryFiber,
    itemDietaryFiberPercentage,
    itemSugar,
    itemSugarPercentage,
    itemProtein,
    itemProteinPercentage,
    itemVitaminA,
    itemVitaminC,
    itemIron,
    itemCalcium,
    itemTotalFat,
    itemTotalFatPercentage,
    itemSaturatedFat,
    itemNutritionCalories,
    itemCaloriesFat,
    itemServingSize,
    itemModifier,
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
  const subSectionItem = await SubSectionItem.find()

  res.status(200).json({
    success: true,
    subSectionItem,
  });
};

//Get All Item by Subsection ID ---Get
exports.getAllItemBySubSectionId = async (req, res, next) => {
  let subSectionId = req.params.id;
  await SubSectionItem.find({ subSectionId: { $in: subSectionId } }).then((item) => {
    return res.status(200).json({
      success: true,
      item,
    });
  });
};

//Get Single Sub Item ---Get
exports.getSingleSubItem = async (req, res, next) => {
  let itemId = req.params.id;
  const item = await SubSectionItem.findById(itemId)
  res.status(200).json({
    success: true,
    item,
  });
};


//Delete Item ---Delete
exports.deleteSubItemById = async (req, res) => {
  let item = await SubSectionItem.findById(req.params.id);

  if (!item) {
    return res.status(500).json({
      success: false,
      message: "Invalid Id",
    });
  }

  await item.remove();

  res.status(200).json({
    success: true,
    message: "Item deleted successfully",
  });
};

//Delete All Item
exports.deleteAllSubItem = async (req, res) => {
  let item = await SubSectionItem.deleteMany();

  res.status(200).json({
    success: true,
    message: "All Item Deleted Successfully",
  });
};

//Update Item By Id
exports.updateSubItem = async (req, res) => {
  let item = await SubSectionItem.findById(req.params.id);

  if (!item) {
    return res.status(500).json({
      success: false,
      message: "Invalid Id",
    });
  }

  item = await SubSectionItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  })

  res.status(200).json({
    success: true,
    item,
  });
};

