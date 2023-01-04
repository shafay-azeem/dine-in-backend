const express = require("express");
const {
  createMenu,
  getSingleMenu,
  getAllSMenu,
  deleteMenu,
} = require("../controller/MenuController");
const {
  createSection,
  deleteSection,
  createItem,
  getAllSection,
} = require("../controller/SectionController");
const router = express.Router();

router.route("/createmenu").post(createMenu);
router.route("/getallmenu").get(getAllSMenu);
router.route("/getsinglemenu/:id").get(getSingleMenu);
router.route("/menudelete/:id").delete(deleteMenu);

router.route("/createsection/:id").post(createSection);
router.route("/sectiondelete/:id").delete(deleteSection);
router.route("/getallsection").get(getAllSection);

router.route("/createitem/:id").post(createItem);

module.exports = router;
