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
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

//Update Section Function
async function updateSection(Id, itemRes) {
  let section = await Section.findById(Id);
  section.item.push(itemRes);
  await section.save({ validateBeforeSave: false });
}

//Get All Item by Section ID ---Get
exports.getAllItemBySectionId = asyncHandler(async (req, res, next) => {
  let sectionId = req.params.id;
  await Item.find({ sectionId: { $in: sectionId } })
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

//Get Single Item ---Get
exports.getSingleItem = asyncHandler(async (req, res, next) => {
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

//Delete Item ---Delete
exports.deleteItem = asyncHandler(async (req, res, next) => {
  try {
    let item = await Item.findById(req.params.id);
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
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      error: "Error deleting item",
    });
  }
});

//Delete All Item
exports.deleteAllItem = asyncHandler(async (req, res, next) => {
  try {
    let deletedItems = await Item.deleteMany();
    if (deletedItems.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: "All Item Deleted Successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No items to delete",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      error: "Error deleting items",
    });
  }
});

//Update Item By Id
exports.updateItem = asyncHandler(async (req, res, next) => {
  let item;
  try {
    item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id",
      });
    }
    item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useUnified: false,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the item",
      error: err,
    });
  }

  res.status(200).json({
    success: true,
    item,
  });
});
