const {
  getAllMenuQr,
  getAllSectionByMenuIdQr,
  getAllFormQr,
  getAllItemBySectionIdQr,
  getAllSubSectionBySectionIdQr,
  getAllItemBySubSectionIdQr,
  getSingleSubItemQr,
  getSingleItemQr,
} = require("../controller/QrController");
const express = require("express");

const router = express.Router();

//Menu Qr
router.route("/getAllMenuQr/:id").get(getAllMenuQr);

//Section Qr
router.route("/getAllSectionByMenuIdQr/:id").get(getAllSectionByMenuIdQr);

//Items Qr
router.route("/getAllItemBySectionIdQr/:id").get(getAllItemBySectionIdQr);
router.route("/getSingleItemQr/:id").get(getSingleItemQr);

//Sub Section Qr
router
  .route("/getAllSubSectionBySectionIdQr/:id")
  .get(getAllSubSectionBySectionIdQr);

router.route("/getAllItemBySubSectionIdQr/:id").get(getAllItemBySubSectionIdQr);

router.route("/getSingleSubItemQr/:id").get(getSingleSubItemQr);

//FeedBack Form
router.route("/getAllFormQr/:id").get(getAllFormQr);

module.exports = router;
