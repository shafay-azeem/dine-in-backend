const SubSectionItem = require("../models/SubSectionItemModel");
const SubSection = require("../models/SubSectionModel");
const asyncHandler = require("express-async-handler");

//Create SubSection Item  ---Post
exports.createSubSectionItem = asyncHandler(async (req, res, next) => {
  const {
    itemName,
    itemImage,
    itemDescription,
    active,
    itemCalorie,
    itemTag,
    itemLabel,
    itemRecommendedItems,
    itemWarning,
    itemPrepTime,
    itemPrice,
    itemCalories,
    video,
    itemPriceOption,
    itemSaturatedFatPercentage,
    itemTransFat,
    itemTransFatPercentage,
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
  try {
    const subSectionItem = await SubSectionItem.create({
      subSectionId: req.params.id,
      itemName,
      itemImage,
      itemDescription,
      active,
      itemCalorie,
      itemTag,
      itemLabel,
      itemRecommendedItems,
      itemWarning,
      itemPrepTime,
      itemPrice,
      itemCalories,
      video,
      itemPriceOption,
      itemSaturatedFatPercentage,
      itemTransFat,
      itemTransFatPercentage,
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
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//Update Section Function
async function updateSubSection(subSectionId, subSectionItemRes) {
  let subSection = await SubSection.findById(subSectionId);
  subSection.item.push(subSectionItemRes);
  await subSection.save({ validateBeforeSave: false });
}

//Delete All Sub Item
exports.deleteAllSubItem = asyncHandler(async (req, res, next) => {
  let subSectionItem;
  try {
    subSectionItem = await SubSectionItem.deleteMany();
    res.status(200).json({
      success: true,
      message: "All SubSection Item Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//Get All SubSection Item ---Get
exports.getAllSubItem = asyncHandler(async (req, res, next) => {
  const subSectionItem = await SubSectionItem.find().catch((err) => {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  });
  if (!subSectionItem) {
    return res.status(400).json({
      success: false,
      message: "No subSection item found",
    });
  }
  res.status(200).json({
    success: true,
    subSectionItem,
  });
});

//Get All Item by Subsection ID ---Get
exports.getAllItemBySubSectionId = asyncHandler(async (req, res, next) => {
  let subSectionId = req.params.id;
  SubSectionItem.find({ subSectionId: { $in: subSectionId } })
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

//Get Single Sub Item ---Get
exports.getSingleSubItem = asyncHandler(async (req, res, next) => {
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

//Delete Sub Item By Id -- Delete
exports.deleteSubItemById = asyncHandler(async (req, res, next) => {
  let itemId = req.params.id;
  try {
    let item = await SubSectionItem.findById(itemId);
    if (!item) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id",
      });
    }
    await item.remove();
    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error deleting item",
      error: err,
    });
  }
});

//Delete All Sub Item
exports.deleteAllSubItem = asyncHandler(async (req, res, next) => {
  let item;
  try {
    item = await SubSectionItem.deleteMany();
    res.status(200).json({
      success: true,
      message: "All Item Deleted Successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

//Update Sub Item By Id
exports.updateSubItem = asyncHandler(async (req, res, next) => {
  let item = await SubSectionItem.findById(req.params.id);
  if (!item) {
    return res.status(400).json({
      success: false,
      message: "Invalid Id",
    });
  }
  try {
    item = await SubSectionItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useUnified: false,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
  res.status(200).json({
    success: true,
    item,
  });
});
