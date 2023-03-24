
const express = require("express");
const { tableCreate, getTablebyUserId, getTableCountbyUserId, deleteTableDeleteByTableId, updateTableByTableId, updateTableStatus } = require("../controller/TableController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();


router.route("/createTables").post(isAuthenticatedUser, tableCreate); //userID
router.route("/getTablebyUserId").get(isAuthenticatedUser, getTablebyUserId); //userID
router.route("/getTableCountbyUserId").get(isAuthenticatedUser, getTableCountbyUserId); //userID
router.route("/deleteTableDeleteByTableId/:tableId").delete(isAuthenticatedUser, deleteTableDeleteByTableId); //userID
router.route("/updateTableByTableId/:tableId").put(isAuthenticatedUser, updateTableByTableId); //userID
router.route("/updateTableStatus/:tableId").put(isAuthenticatedUser, updateTableStatus); //userID

module.exports = router;