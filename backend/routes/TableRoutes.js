
const express = require("express");
const { tableCreate } = require("../controller/TableController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();


router.route("/createTables").post(isAuthenticatedUser, tableCreate); //userID

module.exports = router;