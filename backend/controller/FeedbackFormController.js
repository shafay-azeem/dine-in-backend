const FeedbackForm = require("../models/FeedbackFormModel");
const FormQuestion = require("../models/FormQuestionModel");
const FormResponse = require("../models/FeedbackResponseModel");
const { all } = require("../app");

//Create FeedBack Form --Post
exports.createFeedbackForm = async (req, res, next) => {
  const { formName, active } = req.body;

  const feedbackForm = await FeedbackForm.create({
    userName: req.user.name,
    userId: req.user._id,
    formName,
    active,
  });

  res.status(201).json({
    success: true,
    feedbackForm,
    message: "Form Created SuccessFully",
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
  const feedbackForm = await FeedbackForm.find({
    userId: { $in: req.user.id },
  }).populate("formQuestions");

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

//Delete Form by Id ---Delete
exports.deleteForm = async (req, res) => {
  let feedbackForm = await FeedbackForm.findById(req.params.id);

  if (!feedbackForm) {
    return res.status(500).json({
      success: false,
      message: "Invalid Id",
    });
  }

  await feedbackForm.remove();

  res.status(200).json({
    success: true,
    message: "feedbackForm deleted successfully",
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

//Delete Question by Id ---Delete
exports.deleteSingleQuestion = async (req, res) => {
  let formQuestion = await FormQuestion.findById(req.params.id);

  if (!formQuestion) {
    return res.status(500).json({
      success: false,
      message: "Invalid Id",
    });
  }

  await formQuestion.remove();

  res.status(200).json({
    success: true,
    message: "Question deleted successfully",
  });
};

//Create Form Question --Post
exports.createFormQuestion = async (req, res, next) => {
  const { Questions } = req.body;

  const formQuestion = await FormQuestion.create({
    feedbackFormId: req.params.id,
    Questions,
  });

  console.log(req.params.id);

  await updateFormQuestion(req.params.id, formQuestion);

  res.status(201).json({
    success: true,
    formQuestion,
  });
};

//Update Form Question Function
async function updateFormQuestion(formId, formQuestionResponse) {
  let feedbackForm = await FeedbackForm.findById(formId);
  //console.log(feedbackForm, "feedbackForm");
  feedbackForm.formQuestions.push(formQuestionResponse);
  await feedbackForm.save({ validateBeforeSave: false });
}

//Get All Questions --Get
exports.getAllQuestion = async (req, res, next) => {
  let formId = req.params.id;

  await FormQuestion.find({ feedbackFormId: { $in: formId } }).then(
    (formQuestion) => {
      return res.status(200).json({
        success: true,
        formQuestion,
      });
    }
  );
};

//Get Single Questions ---Get
exports.getSingleQuestion = async (req, res, next) => {
  let questionId = req.params.id;

  const formQuestion = await FormQuestion.findById(questionId);

  res.status(200).json({
    success: true,
    formQuestion,
  });
};

//Update Question By Id --Put
exports.updateFormQuestion = async (req, res) => {
  let formQuestion = await FormQuestion.findById(req.params.id);

  if (!formQuestion) {
    return res.status(500).json({
      success: false,
      message: "Invalid Id",
    });
  }

  formQuestion = await FormQuestion.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  });

  res.status(200).json({
    success: true,
    formQuestion,
  });
};

//Create Result Form --Post
exports.createResultForm = async (req, res, next) => {
  let feedbackForm = await FeedbackForm.findById(req.params.id).populate(
    "formQuestions"
  );

  let userName = feedbackForm.userName;
  let userId = feedbackForm.userId;
  let form_name = feedbackForm.formName;
  let question = feedbackForm.formQuestions[0].Questions;

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
      userName,
      userId,
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
      message: "Something went wrong",
    });
  }
};

//Delete Form Results --Delete
exports.deleteFormResults = async (req, res) => {
  let formresponse = await FormResponse.deleteMany();

  res.status(200).json({
    success: true,
    message: "All Form Result Deleted Successfully",
  });
};

//Get ALL Results --Get
exports.getAllResults = async (req, res, next) => {
  const formResponse = await FormResponse.find({
    userId: { $in: req.user.id },
  });

  console.log(formResponse);

  res.status(200).json({
    success: true,
    formResponse,
  });
};
