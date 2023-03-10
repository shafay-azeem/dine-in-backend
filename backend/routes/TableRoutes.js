
const express = require("express");
const { tableCreate, getTablebyUserId, getTableCountbyUserId } = require("../controller/TableController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();


router.route("/createTables").post(isAuthenticatedUser, tableCreate); //userID
router.route("/getTablebyUserId").get(isAuthenticatedUser, getTablebyUserId); //userID
router.route("/getTableCountbyUserId").get(isAuthenticatedUser, getTableCountbyUserId); //userID

module.exports = router;