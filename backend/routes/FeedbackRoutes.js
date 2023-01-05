const express = require("express");
const { createFeedbackForm, createFormQuestion, getAllForm, deleteAllForm, deleteFormQuestion, createResultForm } = require("../controller/FeedbackFormController");
const router = express.Router();

router.route("/createfeedback").post(createFeedbackForm);
router.route("/createfeedbackquestion/:id").post(createFormQuestion);
router.route("/getallform").get(getAllForm);
router.route("/deleteallform").delete(deleteAllForm);
router.route("/deleteallquestion").delete(deleteFormQuestion);
router.route("/createquestions").post(createResultForm);
module.exports = router;