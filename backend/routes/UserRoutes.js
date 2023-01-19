const express = require("express");
const {
  createUser,
  loginUser,
  updateProfile,
  deleteUser,
  getAllUsers,
  deleteAllUsers,
} = require("../controller/UserController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

//user
router.route("/createUser").post(createUser);
router.route("/login").post(loginUser);
router.route("/getAllUsers").get(isAuthenticatedUser, getAllUsers);
router.route("/updateProfile").put(isAuthenticatedUser, updateProfile);
router.route("/deleteUser/:id").delete(isAuthenticatedUser, deleteUser);
router.route("/deleteAllUsers").delete(deleteAllUsers);

module.exports = router;
