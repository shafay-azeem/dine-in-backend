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
    activeNutritionInfo,
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
      activeNutritionInfo,
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
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

//Update Section Function
async function updateSubSection(subSectionId, subSectionItemRes) {
  let subSection = await SubSection.findById(subSectionId);

  if (!subSection) {
    const error = new Error('SubSection  Not Found')
    error.statusCode = 404
    throw error
  }
  subSection.item.push(subSectionItemRes);
  await subSection.save({ validateBeforeSave: false });
}

//Delete All Sub Item
exports.deleteAllSubItem = asyncHandler(async (req, res, next) => {

  try {
    let subSectionItem;
    subSectionItem = await SubSectionItem.deleteMany();
    res.status(200).json({
      success: true,
      message: "All SubSection Item Deleted Successfully",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

//Get All SubSection Item ---Get
exports.getAllSubItem = asyncHandler(async (req, res, next) => {

  try {
    const subSectionItem = await SubSectionItem.find().exec()
    if (!subSectionItem) {
      const error = new Error('SubSection Item Not Found')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({
      success: true,
      subSectionItem,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

//Get All Item by Subsection ID ---Get
exports.getAllItemBySubSectionId = asyncHandler(async (req, res, next) => {
  try {
    let subSectionId = req.params.id;
    let item = await SubSectionItem.find({ subSectionId: { $in: subSectionId } }).exec()
    if (!item) {
      const error = new Error('SubSection Item Item Not Found')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({
      success: true,
      item,
    });

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }


});

//Get Single Sub Item ---Get
exports.getSingleSubItem = asyncHandler(async (req, res, next) => {
  try {
    let itemId = req.params.id;
    const item = await SubSectionItem.findById(itemId);
    if (!item) {
      const error = new Error('SubSection Item Not Found')
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

//Delete Sub Item By Id -- Delete
exports.deleteSubItemById = asyncHandler(async (req, res, next) => {
  let itemId = req.params.id;
  try {
    let item = await SubSectionItem.findById(itemId);
    if (!item) {
      const error = new Error('SubSection Item Not Found')
      error.statusCode = 404
      throw error
    }
    await item.remove();
    res.status(200).json({
      success: true,
      message: "SubSection Item deleted successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

//Delete All Sub Item
exports.deleteAllSubItem = asyncHandler(async (req, res, next) => {
  try {
    await SubSectionItem.deleteMany();
    res.status(200).json({
      success: true,
      message: "All Sub Section Item Deleted Successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

//Update Sub Item By Id
exports.updateSubItem = asyncHandler(async (req, res, next) => {

  try {
    let item
    item = await SubSectionItem.findById(req.params.id);
    if (!item) {
      const error = new Error('SubSection Item Not Found')
      error.statusCode = 404
      throw error
    }
    item = await SubSectionItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useUnified: false,
    });
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
