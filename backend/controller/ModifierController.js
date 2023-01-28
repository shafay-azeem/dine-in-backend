const Modifier = require("../models/ModifierModel");
const asyncHandler = require("express-async-handler");

//Create Menu ---Post
exports.createModifier = asyncHandler(async (req, res, next) => {
  try {
    const { Groupname, modifiers } = req.body;
    const modifier = await Modifier.create({
      userName: req.user.name,
      userId: req.user._id,
      Groupname,
      modifiers,
    });

    res.status(201).json({
      success: true,
      message: "Modifier Created Successfully",
      modifier,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//Update Modifier By Id
exports.updateModifier = asyncHandler(async (req, res, next) => {
  let modifier = await Modifier.findById(req.params.id);

  try {
    if (!modifier) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id",
      });
    }
    modifier = await Modifier.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useUnified: false,
    });
    res.status(200).json({
      success: true,
      message: "Modifier Update Successfully",
      modifier,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error while updating modifier. Please try again later.",
      error: err.message,
    });
  }
});

//Delete Modifier By Id
exports.deleteModifierById = asyncHandler(async (req, res, next) => {
  let modifier;
  try {
    modifier = await Modifier.findById(req.params.id);
    if (!modifier) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id",
      });
    }

    await modifier.remove();

    res.status(200).json({
      success: true,
      message: "Modifier deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting modifier. Please try again later.",
      error: err.message,
    });
  }
});

//Get Single Modifier By Id ---Get
exports.getSingleModifer = asyncHandler(async (req, res, next) => {
  let modifierId = req.params.id;
  try {
    const modifier = await Modifier.findById(modifierId);

    if (!modifier) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id",
      });
    }

    res.status(200).json({
      success: true,
      modifier,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching modifier. Please try again later.",
      error: err.message,
    });
  }
});

//Get All Modifier ---Get
exports.getAllModifier = asyncHandler(async (req, res, next) => {
  try {
    const modifier = await Modifier.find({ userId: { $in: req.user.id } });

    res.status(200).json({
      success: true,
      modifier,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

//Delete All Menu
exports.deleteAllModifiers = asyncHandler(async (req, res, next) => {
  let modifier = await Modifier.deleteMany();

  try {
    if (!modifier) {
      return res.status(400).json({
        success: false,
        message: "No modifier found",
      });
    }
    res.status(200).json({
      success: true,
      message: "All Modifier Deleted Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting modifier. Please try again later.",
      error: err.message,
    });
  }
});
