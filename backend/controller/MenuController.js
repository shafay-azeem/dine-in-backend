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
      userResturant: req.user.resName,
      userResturantImage: req.user.resImage,
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
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
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
      const error = new Error('Menu not found')
      error.statusCode = 404
      throw error
    }

    res.status(200).json({
      success: true,
      menu,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
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

    if (!menu) {
      const error = new Error('Menu not found')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({
      success: true,
      menu,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
});



//Delete Menu By Menu Id
exports.deleteMenu = asyncHandler(async (req, res, next) => {
  try {
    let menu = await Menu.findById(req.params.id);
    if (!menu) {
      const error = new Error('Menu not found with this Id')
      error.statusCode = 404
      throw error
    }

    await menu.remove();

    res.status(200).json({
      success: true,
      message: "Menu deleted successfully",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
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
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
});



//Update Menu By Id
exports.updateMenu = asyncHandler(async (req, res, next) => {

  try {
    let menu
    menu = await Menu.findById(req.params.id);
    if (!menu) {
      const error = new Error('Menu Not FOund')
      error.statusCode = 404
      throw error
    }
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
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }


});
