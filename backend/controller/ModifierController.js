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
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});


//Update Modifier By Id
exports.updateModifier = asyncHandler(async (req, res, next) => {


  try {
    let modifier
    modifier = await Modifier.findById(req.params.id);
    if (!modifier) {
      const error = new Error('Modifier  Not Found')
      error.statusCode = 404
      throw error
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
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

//Delete Modifier By Id
exports.deleteModifierById = asyncHandler(async (req, res, next) => {
  try {
    let modifier;
    modifier = await Modifier.findById(req.params.id);
    if (!modifier) {
      const error = new Error('Modifier Not Found')
      error.statusCode = 404
      throw error
    }

    await modifier.remove();

    res.status(200).json({
      success: true,
      message: "Modifier deleted successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

//Get Single Modifier By Id ---Get
exports.getSingleModifer = asyncHandler(async (req, res, next) => {
  try {
    let modifierId = req.params.id;
    const modifier = await Modifier.findById(modifierId);

    if (!modifier) {
      const error = new Error('Modifier  Not Found')
      error.statusCode = 404
      throw error

    }

    res.status(200).json({
      success: true,
      modifier,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

//Get All Modifier ---Get
exports.getAllModifier = asyncHandler(async (req, res, next) => {
  try {
    const modifier = await Modifier.find({ userId: { $in: req.user.id } }).exec();
    if (!modifier) {
      const error = new Error('Modifier Not Found')
      error.statusCode = 404
      throw error
    }

    res.status(200).json({
      success: true,
      modifier,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

//Delete All Menu
exports.deleteAllModifiers = asyncHandler(async (req, res, next) => {


  try {
    let modifier = await Modifier.deleteMany();
    if (!modifier) {
      const error = new Error('Modifier Not Found')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({
      success: true,
      message: "All Modifier Deleted Successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});
