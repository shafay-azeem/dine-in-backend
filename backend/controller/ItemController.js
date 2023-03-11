const Item = require("../models/ItemModal");
const Section = require("../models/SectionModel");
const SubSection = require("../models/SubSectionModel");
const asyncHandler = require("express-async-handler");

//Create Item  ---Post
exports.createItem = asyncHandler(async (req, res, next) => {
  try {
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
    const item = await Item.create({
      sectionId: req.params.id,
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
    await updateSection(req.params.id, item);
    res.status(201).json({
      success: true,
      item,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
});

//Update Section Function
async function updateSection(Id, itemRes) {
  let section = await Section.findById(Id);
  if (!section) {
    const error = new Error('Section Not Found')
    error.statusCode = 404
    throw error
  }
  section.item.push(itemRes);
  await section.save({ validateBeforeSave: false });
}

//Get All Item by Section ID ---Get
exports.getAllItemBySectionId = asyncHandler(async (req, res, next) => {

  try {
    let sectionId = req.params.id;
    let item = await Item.find({ sectionId: { $in: sectionId } }).exec()
    if (!item) {
      const error = new Error('Item Not Found')
      error.statusCode = 404
      throw error
    }
    return res.status(200).json({
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

//Get Single Item ---Get
exports.getSingleItem = asyncHandler(async (req, res, next) => {
  try {
    let itemId = req.params.id;
    const item = await Item.findById(itemId);
    if (!item) {
      const error = new Error('Item Not Found')
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

//Delete Item ---Delete
exports.deleteItem = asyncHandler(async (req, res, next) => {
  try {
    let item = await Item.findById(req.params.id);
    if (!item) {
      const error = new Error('Item Not Found')
      error.statusCode = 404
      throw error
    }
    await item.remove();
    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

//Delete All Item
exports.deleteAllItem = asyncHandler(async (req, res, next) => {
  try {
    await Item.deleteMany();
    res.status(200).json({
      success: true,
      message: "All Item Deleted Successfully",
    });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

//Update Item By Id
exports.updateItem = asyncHandler(async (req, res, next) => {

  try {
    let item;
    item = await Item.findById(req.params.id);
    if (!item) {
      const error = new Error('Item Not Found')
      error.statusCode = 404
      throw error
    }
    item = await Item.findByIdAndUpdate(req.params.id, req.body, {
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
