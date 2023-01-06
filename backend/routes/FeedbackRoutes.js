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
const router = express.Router();

//Feedback
router.route("/createfeedback").post(createFeedbackForm);
router.route("/updateform/:id").put(updateForm);
router.route("/getallform").get(getAllForm);
router.route("/getsingleform/:id").get(getSingleForm);
router.route("/deleteallform").delete(deleteAllForm);
router.route("/deleteform/:id").delete(deleteForm);

//Questions
router.route("/createquestions").post(createResultForm);
router.route("/getallquestion").get(getAllQuestion);
router.route("/getsinglequestion/:id").get(getSingleQuestion);
router.route("/deleteallquestion").delete(deleteFormQuestion);
router.route("/deletesinglequestion/:id").delete(deleteSingleQuestion);
router.route("/updateFormQuestion/:id").put(updateFormQuestion);

//Result
router.route("/createfeedbackquestion/:id").post(createFormQuestion);
router.route("/deleteformresults").delete(deleteFormResults);

module.exports = router;
