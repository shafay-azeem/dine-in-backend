const FeedbackForm = require("../models/FeedbackFormModel");
const FormQuestion = require("../models/FormQuestionModel");
const FormResponse = require("../models/FeedbackResponseModel");
const { all } = require("../app");

//Create FeedBack Form --Post
exports.createFeedbackForm = async (req, res, next) => {
  const { formName, active, formQuestions } = req.body;

  const feedbackForm = await FeedbackForm.create({
    formName,
    active,
    formQuestions,
  });

  res.status(201).json({
    success: true,
    feedbackForm,
  });
};

//Update Form By Id --Put
exports.updateForm = async (req, res) => {
  let feedbackForm = await FeedbackForm.findById(req.params.id);

  if (!feedbackForm) {
    return res.status(500).json({
      success: false,
      message: "Invalid Id",
    });
  }

  feedbackForm = await FeedbackForm.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  }).populate("formQuestions");

  res.status(200).json({
    success: true,
    feedbackForm,
  });
};

//Get All Form --Get
exports.getAllForm = async (req, res, next) => {
  const feedbackForm = await FeedbackForm.find().populate("formQuestions");

  res.status(200).json({
    success: true,
    feedbackForm,
  });
};

//Get Single Form By ID --Get
exports.getSingleForm = async (req, res, next) => {
  let formId = req.params.id;

  const feedbackForm = await FeedbackForm.findById(formId).populate(
    "formQuestions"
  );

  res.status(200).json({
    success: true,
    feedbackForm,
  });
};

//Delete All Form --Delete
exports.deleteAllForm = async (req, res) => {
  let feedbackForm = await FeedbackForm.deleteMany();

  res.status(200).json({
    success: true,
    message: "All Form Deleted Successfully",
  });
};

//Delete Form Question --Delete
exports.deleteFormQuestion = async (req, res) => {
  let formQuestion = await FormQuestion.deleteMany();

  res.status(200).json({
    success: true,
    message: "All Form Question Deleted Successfully",
  });
};

//Create Form Question --Post
exports.createFormQuestion = async (req, res, next) => {
  const { question, questionType } = req.body;

  const formQuestion = await FormQuestion.create({
    question,
    questionType,
  });

  await updateFormQuestion(req.params.id, formQuestion);

  res.status(201).json({
    success: true,
    formQuestion,
  });
};

//Update Form Question Function
async function updateFormQuestion(formId, formQuestionResponse) {
  let feedbackForm = await FeedbackForm.findById(formId);
  console.log(feedbackForm, "feedbackForm");
  feedbackForm.formQuestions.push(formQuestionResponse);
  await feedbackForm.save({ validateBeforeSave: false });
}

//Create Result Form --Post
exports.createResultForm = async (req, res, next) => {
  let feedbackForm = await FeedbackForm.findById(req.query.id).populate(
    "formQuestions"
  );
  let form_name = feedbackForm.formName;
  let question = feedbackForm.formQuestions;

  let allow;
  if (form_name === req.body.formName) {
    if (question.length === req.body.response.length) {
      for (let i = 0; i < req.body.response.length; i++) {
        allow = true;
        let a = question[i].question.toString();
        let b = req.body.response[i].question.toString();
        if (a !== b) {
          allow = false;
          break;
        }
      }
    } else {
      allow = false;
    }
  }

  if (allow === true) {
    const { formName, response } = req.body;
    const formResponse = await FormResponse.create({
      formName,
      response,
    });

    res.status(201).json({
      success: true,
      formResponse,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "question not match",
    });
  }
};
