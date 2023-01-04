const express = require("express");
const {
  createMenu,
  getSingleMenu,
  getAllSMenu,
  deleteMenu,
  updateMenu,
} = require("../controller/MenuController");
const {
  createSection,
  deleteSection,
  createItem,
  getAllSection,
  updateSection,
} = require("../controller/SectionController");
const router = express.Router();

router.route("/createmenu").post(createMenu);
router.route("/getallmenu").get(getAllSMenu);
router.route("/getsinglemenu/:id").get(getSingleMenu);
router.route("/menudelete/:id").delete(deleteMenu);
router.route("/updatemenu/:id").put(updateMenu);

router.route("/createsection/:id").post(createSection);
router.route("/sectiondelete/:id").delete(deleteSection);
router.route("/getallsection").get(getAllSection);
router.route("/updatesection/:id").put(updateSection);

router.route("/createitem/:id").post(createItem);

module.exports = router;
