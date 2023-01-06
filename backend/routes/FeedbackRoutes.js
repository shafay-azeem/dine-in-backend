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
} = require("../controller/FeedbackFormController");
const router = express.Router();

router.route("/createfeedback").post(createFeedbackForm);
router.route("/updateform/:id").put(updateForm);
router.route("/getallform").get(getAllForm);
router.route("/getsingleform/:id").get(getSingleForm);
router.route("/deleteallform").delete(deleteAllForm);

router.route("/createquestions").post(createResultForm);
router.route("/createfeedbackquestion/:id").post(createFormQuestion);
router.route("/deleteallquestion").delete(deleteFormQuestion);

module.exports = router;
