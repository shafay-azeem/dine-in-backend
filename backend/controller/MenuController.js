const { populate } = require("../models/ItemModal");
const Menu = require("../models/MenuModel");
const asyncHandler = require("express-async-handler");

//Create Menu ---Post
exports.createMenu = asyncHandler(async (req, res, next) => {
  try {
    const {
      menuName,
      menuDescription,
      menuStatus,
      availaibility,
      menuNote,
      section,
    } = req.body;
    const menu = await Menu.create({
      userName: req.user.name,
      userId: req.user._id,
      menuName,
      menuDescription,
      menuNote,
      section,
      menuStatus,
      availaibility,
    });
    res.status(201).json({
      success: true,
      message: "Menu Created Successfully",
      menu,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create menu",
      error: err.message,
    });
  }
});

//Get Single Menu ---Get

exports.getSingleMenu = asyncHandler(async (req, res, next) => {
  let menuId = req.params.id;
  try {
    const menu = await Menu.findById(menuId).populate({
      path: "section",
      populate: [
        { path: "item" },
        {
          path: "subSection",
          populate: [
            {
              path: "item",
            },
          ],
        },
      ],
    });

    if (!menu) {
      return res.status(404).json({
        success: false,
        error: "Menu not found",
      });
    }

    res.status(200).json({
      success: true,
      menu,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

//Get All Menu ---Get
exports.getAllMenu = asyncHandler(async (req, res, next) => {
  try {
    const menu = await Menu.find({ userId: { $in: req.user.id } }).populate({
      path: "section",
      populate: [
        { path: "item" },
        {
          path: "subSection",
          populate: [
            {
              path: "item",
            },
          ],
        },
      ],
    });
    res.status(200).json({
      success: true,
      menu,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

//Delete Menu By Menu Id
exports.deleteMenu = asyncHandler(async (req, res, next) => {
  try {
    let menu = await Menu.findById(req.params.id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found with this Id",
      });
    }

    await menu.remove();

    res.status(200).json({
      success: true,
      message: "Menu deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//Delete All Menu
exports.deleteAllMenu = asyncHandler(async (req, res, next) => {
  try {
    let menu = await Menu.deleteMany();

    res.status(200).json({
      success: true,
      message: "All Menu Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting all menus",
      error: error.message,
    });
  }
});

//Update Menu By Id
exports.updateMenu = asyncHandler(async (req, res, next) => {
  let menu = await Menu.findById(req.params.id);

  if (!menu) {
    return res.status(400).json({
      success: false,
      message: "Invalid Id",
    });
  }

  try {
    menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useUnified: false,
    }).populate({
      path: "section",
      populate: [
        { path: "item" },
        {
          path: "subSection",
          populate: [
            {
              path: "item",
            },
          ],
        },
      ],
    });
    res.status(200).json({
      success: true,
      message: "Menu Update Successfully",
      menu,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid Data",
      error: error.message,
    });
  }
});
