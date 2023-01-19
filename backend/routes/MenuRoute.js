const express = require("express");
const {
  createMenu,
  getSingleMenu,
  getAllSMenu,
  deleteMenu,
  updateMenu,
  deleteAllMenu,
  getAllMenu,
} = require("../controller/MenuController");
const {
  createSection,
  deleteSection,
  getAllSection,
  updateSection,
  getSingleSection,
  deleteAllSection,
  getAllSectionByMenuId,
} = require("../controller/SectionController");

const {
  createItem,
  getAllItem,
  getSingleItem,
  deleteItem,
  deleteAllItem,
  updateItem,
  getAllItemBySectionId,
} = require("../controller/ItemController");
const {
  createSubSection,
  deleteSubSection,
  deleteAllSubSection,
  getAllSubSection,
  getSingleSubSection,
  updateSubSection,
  getAllSubSectionBySectionId,
} = require("../controller/SubSectionController");
const {
  createSubSectionItem,
  deleteAllSubItem,
  getAllSubItem,
  getSingleSubItem,
  getAllItemBySubSectionId,
  deleteSubItemById,
  updateSubItem,
} = require("../controller/SubSectionItemController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

//Menu
router.route("/createMenu").post(isAuthenticatedUser, createMenu);
router.route("/getAllMenu").get(isAuthenticatedUser, getAllMenu);
router.route("/getSingleMenu/:id").get(isAuthenticatedUser, getSingleMenu);
router.route("/deleteMenu/:id").delete(isAuthenticatedUser, deleteMenu);
router.route("/deleteAllMenu").delete(isAuthenticatedUser, deleteAllMenu);
router.route("/updateMenu/:id").put(isAuthenticatedUser, updateMenu);

//Section
router.route("/createSection/:id").post(createSection);
router.route("/getAllSectionByMenuId/:id").get(getAllSectionByMenuId);
router.route("/getAllSection").get(getAllSection);
router.route("/getSingleSection/:id").get(getSingleSection);
router.route("/updateSection/:id").put(updateSection);
router.route("/deleteSection/:id").delete(deleteSection);
router.route("/deleteAllSection").delete(deleteAllSection);

//Item
router.route("/createItem/:id").post(createItem);
router.route("/getSingleItem/:id").get(getSingleItem);
router.route("/getAllItemBySectionId/:id").get(getAllItemBySectionId);
router.route("/deleteItem/:id").delete(deleteItem);
router.route("/deleteAllItem").delete(deleteAllItem);
router.route("/updateItem/:id").put(updateItem);

//Sub Section
router.route("/createSubSection/:id").post(createSubSection);
router
  .route("/getAllSubSectionBySectionId/:id")
  .get(getAllSubSectionBySectionId);
router.route("/getAllSubSection").get(getAllSubSection);
router.route("/getSingleSubSection/:id").get(getSingleSubSection);
router.route("/updateSubSection/:id").put(updateSubSection);
router.route("/deleteSubSection/:id").delete(deleteSubSection);
router.route("/deleteAllSubSection").delete(deleteAllSubSection);

//Sub Section Item deleted
router.route("/createSubSectionItem/:id").post(createSubSectionItem);
router.route("/getSingleSubItem/:id").get(getSingleSubItem);
router.route("/getAllItemBySubSectionId/:id").get(getAllItemBySubSectionId);
router.route("/getAllSubItem").get(getAllSubItem);
router.route("/updateSubItem/:id").put(updateSubItem);
router.route("/deleteSubItemById/:id").delete(deleteSubItemById);
router.route("/deleteAllSubItem").delete(deleteAllSubItem);

module.exports = router;
