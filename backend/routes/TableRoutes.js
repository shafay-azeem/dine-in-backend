
const express = require("express");
const { tableCreate, getTablebyUserId } = require("../controller/TableController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();


router.route("/createTables").post(isAuthenticatedUser, tableCreate); //userID
router.route("/getTablebyUserId").get(isAuthenticatedUser, getTablebyUserId); //userID

module.exports = router;