const express = require("express");
const {
  createMenu,
  getSingleMenu,
  getAllSMenu,
  deleteMenu,
  updateMenu,
  deleteAllMenu,
} = require("../controller/MenuController");
const {
  createSection,
  deleteSection,
  getAllSection,
  updateSection,
  getSingleSection,
  deleteAllSection,
} = require("../controller/SectionController");

const {
  createItem,
  getAllItem,
  getSingleItem,
  deleteItem,
  deleteAllItem,
} = require("../controller/ItemController");
const {
  createSubSection,
  deleteSubSection,
  deleteAllSubSection,
  getAllSubSection,
  getSingleSubSection,
  updateSubSection,
} = require("../controller/SubSectionController");

const router = express.Router();

router.route("/createmenu").post(createMenu);
router.route("/getallmenu").get(getAllSMenu);
router.route("/getsinglemenu/:id").get(getSingleMenu);
router.route("/menudelete/:id").delete(deleteMenu);
router.route("/deleteallmenu").delete(deleteAllMenu);
router.route("/updatemenu/:id").put(updateMenu);

router.route("/createsection/:id").post(createSection);
router.route("/sectiondelete/:id").delete(deleteSection);
router.route("/deleteallsection").delete(deleteAllSection);
router.route("/getallsection").get(getAllSection);
router.route("/getsinglesection/:id").get(getSingleSection);
router.route("/updatesection/:id").put(updateSection);

router.route("/createitem/:id").post(createItem);
router.route("/getsingleitem/:id").get(getSingleItem);
router.route("/getallitem").get(getAllItem);
router.route("/itemdelete/:id").delete(deleteItem);
router.route("/deleteallitem").delete(deleteAllItem);

//Sub Section
router.route("/createSubSection/:id").post(createSubSection);
router.route("/deleteSubSection/:id").delete(deleteSubSection);
router.route("/deleteAllSubSection").delete(deleteAllSubSection);
router.route("/getAllSubSection").get(getAllSubSection);
router.route("/getSingleSubSection/:id").get(getSingleSubSection);
router.route("/updateSubSection/:id").put(updateSubSection);

module.exports = router;
