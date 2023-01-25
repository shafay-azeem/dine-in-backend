const {
  getAllMenuQr,
  getAllSectionByMenuIdQr,
  getAllFormQr,
} = require("../controller/QrController");
const express = require("express");

const router = express.Router();

//Menu Qr
router.route("/getAllMenuQr").get(getAllMenuQr);

router.route("/getAllSectionByMenuIdQr/:id").get(getAllSectionByMenuIdQr);

//FeedBack Form
router.route("/getAllFormQr").get(getAllFormQr);

module.exports = router;
