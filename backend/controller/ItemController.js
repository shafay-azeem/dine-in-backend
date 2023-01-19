const Item = require("../models/ItemModal");
const Section = require("../models/SectionModel");
const SubSection = require("../models/SubSectionModel");

//Create Item  ---Post
exports.createItem = async (req, res, next) => {
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
    itemSaturatedFat,
    itemNutritionCalories,
    itemCaloriesFat,
    itemServingSize,
    itemModifier,
  } = req.body;

  const item = await Item.create({
    sectionId: req.params.id,
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
};

//Update Section Function
async function updateSection(Id, itemRes) {
  let section = await Section.findById(Id);
  section.item.push(itemRes);
  await section.save({ validateBeforeSave: false });
}

//Get All Item by Section ID ---Get
exports.getAllItemBySectionId = async (req, res, next) => {
  let sectionId = req.params.id;
  await Item.find({ sectionId: { $in: sectionId } }).then((item) => {
    return res.status(200).json({
      success: true,
      item,
    });
  });
};

//Get Single Item ---Get
exports.getSingleItem = async (req, res, next) => {
  let itemId = req.params.id;
  const item = await Item.findById(itemId);
  res.status(200).json({
    success: true,
    item,
  });
};

//Delete Item ---Delete
exports.deleteItem = async (req, res) => {
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
};

//Delete All Item
exports.deleteAllItem = async (req, res) => {
  let item = await Item.deleteMany();

  res.status(200).json({
    success: true,
    message: "All Item Deleted Successfully",
  });
};

//Update Item By Id
exports.updateItem = async (req, res) => {
  let item = await Item.findById(req.params.id);

  if (!item) {
    return res.status(500).json({
      success: false,
      message: "Invalid Id",
    });
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
};
