const express = require("express");
const { createModifier, deleteModifierById, updateModifier, getSingleModifer } = require("../controller/ModifierController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();


//Modifier
router.route("/createModifier").post(isAuthenticatedUser, createModifier);
router.route("/getSingleModifer/:id").get(isAuthenticatedUser, getSingleModifer);
router.route("/deleteModifierById/:id").delete(isAuthenticatedUser, deleteModifierById);
router.route("/updateModifier/:id").put(isAuthenticatedUser, updateModifier);


module.exports = router;