const Section = require("../models/SectionModel");
const Menu = require("../models/MenuModel");
const Item = require("../models/ItemModal");
const asyncHandler = require("express-async-handler");

//Create Section ---Post
exports.createSection = asyncHandler(async (req, res, next) => {
  try {
    const {
      sectionName,
      sectionDescription,
      sectionNote,
      sectionLabel,
      sectionStatus,
      sectionToggle,
      sectionImage,
    } = req.body;

    const section = await Section.create({
      sectionName,
      sectionDescription,
      sectionNote,
      sectionLabel,
      sectionStatus,
      sectionToggle,
      sectionImage,
      menuId: req.params.id,
    });

    await updateMenu(req.params.id, section);

    res.status(201).json({
      success: true,
      section,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
});

//Update Function
async function updateMenu(menuId, sectionRes) {
  let menu = await Menu.findById(menuId);
  if (!menu) {
    const error = new Error('Menu Not Foun')
    error.statusCode = 404
    throw error
  }
  menu.section.push(sectionRes);
  await menu.save({ validateBeforeSave: false });
}




//Delete Section ---Delete
exports.deleteSection = asyncHandler(async (req, res, next) => {
  try {
    let section = await Section.findById(req.params.id);
    if (!section) {
      const error = new Error('Section Not Found')
      error.statusCode = 404
      throw error
    }
    await section.remove();
    res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }

});

//Delete All Section
exports.deleteAllSection = asyncHandler(async (req, res, next) => {
  let section;
  try {
    section = await Section.deleteMany();
    res.status(200).json({
      success: true,
      message: "All Section Deleted Successfully",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }
});

//Get All Section ---Get
exports.getAllSection = asyncHandler(async (req, res, next) => {
  let section;
  try {
    section = await Section.find()
      .populate("item")
      .populate({
        path: "subSection", // populate subsectionsection
        populate: {
          path: "item", // in section, populate item
        },
      });

    if (!section) {
      const error = new Error('Section Not Found')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({
      success: true,
      section,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }

});




//Get All Section By Menu Id ---Get
exports.getAllSectionByMenuId = asyncHandler(async (req, res, next) => {
  try {
    let menuId = req.params.id;
    let section = await Section.find({ menuId: { $in: menuId } })
      .populate("item")
      .populate({
        path: "subSection", // populate subsectionsection
        populate: {
          path: "item", // in section, populate item
        },
      })

    if (!section) {
      const error = new Error('Section Not Found')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({
      success: true,
      section,
    });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
});



//Get Single Section ---Get
exports.getSingleSection = asyncHandler(async (req, res, next) => {
  try {
    let sectionId = req.params.id;
    let section = await Section.findById(sectionId)
      .populate("item")
      .populate({
        path: "subSection", // populate subsectionsection
        populate: {
          path: "item", // in section, populate item
        },
      })
    if (!section) {
      const error = new Error('Section Not Found')
      error.statusCode = 404
      throw error
    }
    return res.status(200).json({
      success: true,
      section,
    });


  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500
    }
    next(error)
  }

});

//Update Section By Id
exports.updateSection = asyncHandler(async (req, res, next) => {
  let section;
  try {
    section = await Section.findById(req.params.id);
    if (!section) {
      const error = new Error('Section Not Found')
      error.statusCode = 404
      throw error
    }
    section = await Section.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    })
      .populate("item")
      .populate({
        path: "subSection", // populate subsectionsection
        populate: {
          path: "item", // in section, populate item
        },
      });
    res.status(200).json({
      success: true,
      section,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
});
