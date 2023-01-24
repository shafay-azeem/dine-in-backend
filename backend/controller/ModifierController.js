const Modifier = require("../models/ModifierModel");

//Create Menu ---Post
exports.createModifier = async (req, res, next) => {
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
};

//Update Modifier By Id
exports.updateModifier = async (req, res) => {
  let modifier = await Modifier.findById(req.params.id);

  if (!modifier) {
    return res.status(500).json({
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
};

//Delete Modifier By Id
exports.deleteModifierById = async (req, res) => {
  let modifier = await Modifier.findById(req.params.id);

  if (!modifier) {
    return res.status(500).json({
      success: false,
      message: "Invalid Id",
    });
  }

  await modifier.remove();

  res.status(200).json({
    success: true,
    message: "Modifier deleted successfully",
  });
};

//Get Single Modifier By Id ---Get
exports.getSingleModifer = async (req, res, next) => {
  let modifierId = req.params.id;
  const modifier = await Modifier.findById(modifierId);

  res.status(200).json({
    success: true,
    modifier,
  });
};

//Get All Modifier ---Get
exports.getAllModifier = async (req, res, next) => {
  const modifier = await Modifier.find({ userId: { $in: req.user.id } });

  res.status(200).json({
    success: true,
    modifier,
  });
};

//Delete All Menu
exports.deleteAllModifiers = async (req, res) => {
  let modifier = await Modifier.deleteMany();

  res.status(200).json({
    success: true,
    message: "All Modifier Deleted Successfully",
  });
};
