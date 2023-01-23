const express = require("express");
const {
  createFeedbackForm,
  createFormQuestion,
  getAllForm,
  deleteAllForm,
  deleteFormQuestion,
  createResultForm,
  updateForm,
  getSingleForm,
  deleteFormResults,
  getAllQuestion,
  deleteForm,
  getSingleQuestion,
  deleteSingleQuestion,
  updateFormQuestion,
} = require("../controller/FeedbackFormController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

//Feedback
router.route("/createfeedback").post(isAuthenticatedUser, createFeedbackForm);
router.route("/updateform/:id").put(isAuthenticatedUser, updateForm);
router.route("/getallform").get(isAuthenticatedUser, getAllForm);
router.route("/getsingleform/:id").get(isAuthenticatedUser, getSingleForm);
router.route("/deleteallform").delete(deleteAllForm);
router.route("/deleteform/:id").delete(isAuthenticatedUser, deleteForm);

//Questions
router
  .route("/createfeedbackquestion/:id")
  .post(isAuthenticatedUser, createFormQuestion);
router.route("/getallquestion/:id").get(isAuthenticatedUser, getAllQuestion);
router
  .route("/getsinglequestion/:id")
  .get(isAuthenticatedUser, getSingleQuestion);
router.route("/deleteallquestion").delete(deleteFormQuestion);
router
  .route("/deletesinglequestion/:id")
  .delete(isAuthenticatedUser, deleteSingleQuestion);
router
  .route("/updateFormQuestion/:id")
  .put(isAuthenticatedUser, updateFormQuestion);

//Result
router.route("/createquestions").post(createResultForm);
router.route("/deleteformresults").delete(deleteFormResults);

module.exports = router;
