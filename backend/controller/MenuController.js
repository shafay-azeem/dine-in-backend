const { populate } = require("../models/ItemModal");
const Menu = require("../models/MenuModel");

//Create Menu ---Post
exports.createMenu = async (req, res, next) => {
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
};

//Get All Menu ---Get
exports.getAllMenu = async (req, res, next) => {
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
};
