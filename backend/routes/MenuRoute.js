const express = require("express");
const {
  createMenu,
  getSingleMenu,
  getAllSMenu,
  deleteMenu,
  updateMenu,
  deleteAllMenu,
  getAllMenu,
  getAllMenuQr,
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
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/[\/\\:]/g, "_") + file.originalname
    );
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimeType === "image/jpeg" || file.mimeType === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
});

const router = express.Router();

//Menu
router.route("/createMenu").post(isAuthenticatedUser, createMenu);
router.route("/getAllMenu").get(isAuthenticatedUser, getAllMenu);
router.route("/getSingleMenu/:id").get(isAuthenticatedUser, getSingleMenu);
router.route("/deleteMenu/:id").delete(isAuthenticatedUser, deleteMenu);
router.route("/deleteAllMenu").delete(isAuthenticatedUser, deleteAllMenu);
router.route("/updateMenu/:id").put(isAuthenticatedUser, updateMenu);

//Section
router.route("/createSection/:id").post(isAuthenticatedUser, createSection);
router
  .route("/getAllSectionByMenuId/:id")
  .get(isAuthenticatedUser, getAllSectionByMenuId);
router.route("/getAllSection").get(isAuthenticatedUser, getAllSection);
router
  .route("/getSingleSection/:id")
  .get(isAuthenticatedUser, getSingleSection);
router.route("/updateSection/:id").put(isAuthenticatedUser, updateSection);
router.route("/deleteSection/:id").delete(isAuthenticatedUser, deleteSection);
router.route("/deleteAllSection").delete(deleteAllSection);

//Item
router.route("/createItem/:id").post(isAuthenticatedUser, createItem);
router.route("/getSingleItem/:id").get(isAuthenticatedUser, getSingleItem);
router
  .route("/getAllItemBySectionId/:id")
  .get(isAuthenticatedUser, getAllItemBySectionId);
router.route("/deleteItem/:id").delete(isAuthenticatedUser, deleteItem);
router.route("/deleteAllItem").delete(deleteAllItem);
router.route("/updateItem/:id").put(isAuthenticatedUser, updateItem);

//Sub Section
router
  .route("/createSubSection/:id")
  .post(isAuthenticatedUser, createSubSection);
router
  .route("/getAllSubSectionBySectionId/:id")
  .get(isAuthenticatedUser, getAllSubSectionBySectionId);
router.route("/getAllSubSection").get(isAuthenticatedUser, getAllSubSection);
router
  .route("/getSingleSubSection/:id")
  .get(isAuthenticatedUser, getSingleSubSection);
router
  .route("/updateSubSection/:id")
  .put(isAuthenticatedUser, updateSubSection);
router
  .route("/deleteSubSection/:id")
  .delete(isAuthenticatedUser, deleteSubSection);
router.route("/deleteAllSubSection").delete(deleteAllSubSection);

//Sub Section Item deleted
router
  .route("/createSubSectionItem/:id")
  .post(isAuthenticatedUser, createSubSectionItem);
router
  .route("/getSingleSubItem/:id")
  .get(isAuthenticatedUser, getSingleSubItem);
router
  .route("/getAllItemBySubSectionId/:id")
  .get(isAuthenticatedUser, getAllItemBySubSectionId);
router.route("/getAllSubItem").get(isAuthenticatedUser, getAllSubItem);
router.route("/updateSubItem/:id").put(isAuthenticatedUser, updateSubItem);
router
  .route("/deleteSubItemById/:id")
  .delete(isAuthenticatedUser, deleteSubItemById);
router.route("/deleteAllSubItem").delete(deleteAllSubItem);

module.exports = router;
