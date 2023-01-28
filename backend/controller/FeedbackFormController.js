const FeedbackForm = require("../models/FeedbackFormModel");
const FormQuestion = require("../models/FormQuestionModel");
const FormResponse = require("../models/FeedbackResponseModel");
const asyncHandler = require("express-async-handler");

//Create FeedBack Form --Post
exports.createFeedbackForm = asyncHandler(async (req, res, next) => {
  try {
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
      message: "Form Created Successfully",
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Request Body",
        error: err.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the form",
      error: err,
    });
  }
});

//Update Form By Id --Put
exports.updateForm = asyncHandler(async (req, res, next) => {
  let feedbackForm;
  try {
    feedbackForm = await FeedbackForm.findById(req.params.id);
    if (!feedbackForm) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id",
      });
    }

    feedbackForm = await FeedbackForm.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
        useUnified: false,
      }
    ).populate("formQuestions");
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Id",
        error: err.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the form",
      error: err,
    });
  }

  res.status(200).json({
    success: true,
    feedbackForm,
  });
});

//Get All Form --Get
exports.getAllForm = asyncHandler(async (req, res, next) => {
  try {
    const feedbackForm = await FeedbackForm.find({
      userId: { $in: req.user.id },
    }).populate("formQuestions");

    res.status(200).json({
      success: true,
      feedbackForm,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});

//Get Single Form By ID --Get
exports.getSingleForm = asyncHandler(async (req, res, next) => {
  try {
    let formId = req.params.id;

    const feedbackForm = await FeedbackForm.findById(formId).populate(
      "formQuestions"
    );

    res.status(200).json({
      success: true,
      feedbackForm,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});

//Delete Form by Id ---Delete
exports.deleteForm = asyncHandler(async (req, res, next) => {
  try {
    let feedbackForm = await FeedbackForm.findById(req.params.id);

    if (!feedbackForm) {
      return res.status(404).json({
        success: false,
        message: "Invalid Id",
      });
    }

    await feedbackForm.remove();

    res.status(200).json({
      success: true,
      message: "feedbackForm deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});

//Delete All Form --Delete
exports.deleteAllForm = asyncHandler(async (req, res, next) => {
  try {
    let feedbackForm = await FeedbackForm.deleteMany();

    res.status(200).json({
      success: true,
      message: "All Form Deleted Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});

//Delete Form Question --Delete
exports.deleteFormQuestion = asyncHandler(async (req, res, next) => {
  try {
    let formQuestion = await FormQuestion.deleteMany();

    res.status(200).json({
      success: true,
      message: "All Form Question Deleted Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});

//Delete Question by Id ---Delete
exports.deleteSingleQuestion = asyncHandler(async (req, res, next) => {
  try {
    let formQuestion = await FormQuestion.findById(req.params.id);

    if (!formQuestion) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id",
      });
    }

    await formQuestion.remove();

    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the question",
      error: err,
    });
  }
});

//Create Form Question --Post
exports.createFormQuestion = asyncHandler(async (req, res, next) => {
  try {
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
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Request Data",
        error: err,
      });
    }
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the form question",
      error: err,
    });
  }
});

//Update Form Question Function
async function updateFormQuestion(formId, formQuestionResponse) {
  let feedbackForm = await FeedbackForm.findById(formId);
  //console.log(feedbackForm, "feedbackForm");
  feedbackForm.formQuestions.push(formQuestionResponse);
  await feedbackForm.save({ validateBeforeSave: false });
}

//Get All Questions --Get
exports.getAllQuestion = asyncHandler(async (req, res, next) => {
  let formId = req.params.id;
  await FormQuestion.find({ feedbackFormId: { $in: formId } })
    .then((formQuestion) => {
      return res.status(200).json({
        success: true,
        formQuestion,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        error: err,
      });
    });
});

//Get Single Questions ---Get
exports.getSingleQuestion = asyncHandler(async (req, res, next) => {
  let questionId = req.params.id;

  try {
    const formQuestion = await FormQuestion.findById(questionId);

    res.status(200).json({
      success: true,
      formQuestion,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
    });
  }
});

//Update Question By Id --Put
exports.updateFormQuestion = asyncHandler(async (req, res, next) => {
  let formQuestion;
  try {
    formQuestion = await FormQuestion.findById(req.params.id);
    if (!formQuestion) {
      throw new Error("Invalid Id");
    }

    formQuestion = await FormQuestion.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
        useUnified: false,
      }
    );
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  res.status(200).json({
    success: true,
    formQuestion,
  });
});

//Create Result Form --Post
exports.createResultForm = asyncHandler(async (req, res, next) => {
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
});

//Delete Form Results --Delete
exports.deleteFormResults = asyncHandler(async (req, res, next) => {
  try {
    await FormResponse.deleteMany();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  res.status(200).json({
    success: true,
    message: "All Form Results Deleted Successfully",
  });
});

//Get ALL Results --Get
exports.getAllResults = asyncHandler(async (req, res, next) => {
  try {
    const formResponse = await FormResponse.find({
      userId: { $in: req.user.id },
    });

    console.log(formResponse);

    res.status(200).json({
      success: true,
      formResponse,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "Error finding form response",
    });
  }
});

//Update Form Active staus --Put
exports.updateFormStatus = async (req, res) => {
  try {
    const feedbackForm = await FeedbackForm.findById(req.params.id);
    feedbackForm.active = !feedbackForm.active;
    await feedbackForm.save();
    if (feedbackForm.active) {
      await FeedbackForm.updateMany(
        { _id: { $ne: req.params.id } },
        { active: false }
      );
    }
    res.status(200).json({
      status: true,
      message: "Success",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
