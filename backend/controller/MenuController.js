const { populate } = require("../models/ItemModal");
const Menu = require("../models/MenuModel");

//Create Menu ---Post
exports.createMenu = async (req, res, next) => {
  const { menuName, menuDescription, menuNote, section } = req.body;

  const menu = await Menu.create({
    menuName,
    menuDescription,
    menuNote,
    section,
  });

  res.status(201).json({
    success: true,
    message: "Menu Created Successfully",
    menu,
  });
};

//Get Single Menu ---Get
exports.getSingleMenu = async (req, res, next) => {
  let menuId = req.params.id;
  const menu = await Menu.findById(menuId).populate({
    path: "section",
    populate: [
      { path: "item" },
      {
        path: "subSection",
        populate: {
          path: "item",
        },
      },
    ],
  });

  res.status(200).json({
    success: true,
    menu,
  });
};

//Get All Menu ---Get
exports.getAllSMenu = async (req, res, next) => {
  const menu = await Menu.find().populate({
    path: "section",
    populate: [
      { path: "item" },
      {
        path: "subSection",
        populate: {
          path: "item",
        },
      },
    ],
  });

  res.status(200).json({
    success: true,
    menu,
  });
};

//Delete Menu
exports.deleteMenu = async (req, res) => {
  let menu = await Menu.findById(req.params.id);

  if (!menu) {
    return res.status(500).json({
      success: false,
      message: "Invalid Id",
    });
  }

  await menu.remove();

  res.status(200).json({
    success: true,
    message: "Menu deleted successfully",
  });
};

//Delete All Menu
exports.deleteAllMenu = async (req, res) => {
  let menu = await Menu.deleteMany();

  res.status(200).json({
    success: true,
    message: "All Menu Deleted Successfully",
  });
};

//Update Menu By Id
exports.updateMenu = async (req, res) => {
  let menu = await Menu.findById(req.params.id);

  if (!menu) {
    return res.status(500).json({
      success: false,
      message: "Invalid Id",
    });
  }
  menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  }).populate({
    path: "section", // populate section
    populate: {
      path: "item", // in section, populate item
    },
  });

  res.status(200).json({
    success: true,
    message: "Menu Update Successfully",
    menu,
  });
};
