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
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

//Update Form By Id --Put
exports.updateForm = asyncHandler(async (req, res, next) => {

  try {
    let feedbackForm;
    feedbackForm = await FeedbackForm.findById(req.params.id);
    if (!feedbackForm) {
      const error = new Error('Feedback Form Not Found')
      error.statusCode = 404
      throw error
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

    res.status(200).json({
      success: true,
      feedbackForm,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

});

//Get All Form --Get
exports.getAllForm = asyncHandler(async (req, res, next) => {
  try {
    const feedbackForm = await FeedbackForm.find({
      userId: { $in: req.user.id },
    }).populate("formQuestions");
    if (!feedbackForm) {
      const error = new Error('Feedback Form Not Found')
      error.statusCode = 404
      throw error
    }

    res.status(200).json({
      success: true,
      feedbackForm,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

//Get Single Form By ID --Get
exports.getSingleForm = asyncHandler(async (req, res, next) => {
  try {
    let formId = req.params.id;
    const feedbackForm = await FeedbackForm.findById(formId).populate(
      "formQuestions"
    );
    if (!feedbackForm) {
      const error = new Error('Feedback Form Not Found')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({
      success: true,
      feedbackForm,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

//Delete Form by Id ---Delete
exports.deleteForm = asyncHandler(async (req, res, next) => {
  try {
    let feedbackForm = await FeedbackForm.findById(req.params.id);

    if (!feedbackForm) {
      const error = new Error('Feedback Form Not Found')
      error.statusCode = 404
      throw error
    }

    await feedbackForm.remove();

    res.status(200).json({
      success: true,
      message: "Feedback Form deleted successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

//Delete All Form --Delete
exports.deleteAllForm = asyncHandler(async (req, res, next) => {
  try {
    await FeedbackForm.deleteMany();

    res.status(200).json({
      success: true,
      message: "All Form Deleted Successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

//Delete Form Question --Delete
exports.deleteFormQuestion = asyncHandler(async (req, res, next) => {
  try {
    await FormQuestion.deleteMany();

    res.status(200).json({
      success: true,
      message: "All Form Question Deleted Successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

//Delete Question by Id ---Delete
exports.deleteSingleQuestion = asyncHandler(async (req, res, next) => {
  try {
    let formQuestion = await FormQuestion.findById(req.params.id);

    if (!formQuestion) {
      const error = new Error('Form Question Not Found')
      error.statusCode = 404
      throw error


    }

    await formQuestion.remove();

    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
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

    await updateFormQuestion(req.params.id, formQuestion);

    res.status(201).json({
      success: true,
      formQuestion,
    });
  } catch (err) {

    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

//Update Form Question Function
async function updateFormQuestion(formId, formQuestionResponse) {
  let feedbackForm = await FeedbackForm.findById(formId);
  if (!feedbackForm) {
    const error = new Error('Feedback Form Not Found')
    error.statusCode = 404
    throw error
  }
  feedbackForm.formQuestions.push(formQuestionResponse);
  await feedbackForm.save({ validateBeforeSave: false });
}

//Get All Questions --Get
exports.getAllQuestion = asyncHandler(async (req, res, next) => {
  try {
    let formId = req.params.id;
    let formQuestion = await FormQuestion.find({ feedbackFormId: { $in: formId } }).exec()
    if (!formQuestion) {
      const error = new Error('Form Question Not Found')
      error.statusCode = 404
      throw error

    }
    res.status(200).json({
      success: true,
      formQuestion,
    });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

});

//Get Single Questions ---Get
exports.getSingleQuestion = asyncHandler(async (req, res, next) => {


  try {
    let questionId = req.params.id;
    const formQuestion = await FormQuestion.findById(questionId);
    if (!formQuestion) {
      const error = new Error('Form Question Not Found')
      error.statusCode = 404
      throw error

    }
    res.status(200).json({
      success: true,
      formQuestion,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

//Update Question By Id --Put
exports.updateFormQuestion = asyncHandler(async (req, res, next) => {

  try {
    let formQuestion;
    formQuestion = await FormQuestion.findById(req.params.id);
    if (!formQuestion) {
      const error = new Error('Form Question Not Found')
      error.statusCode = 404
      throw error
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
    res.status(200).json({
      success: true,
      formQuestion,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }


});

//Create Result Form --Post
exports.createResultForm = asyncHandler(async (req, res, next) => {
  try {
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
      const error = new Error('Something Went Wrong')
      error.statusCode = 404
      throw error
    }
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

});

//Delete Form Results --Delete
exports.deleteFormResults = asyncHandler(async (req, res, next) => {
  try {
    await FormResponse.deleteMany();
    res.status(200).json({
      success: true,
      message: "All Form Results Deleted Successfully",
    }); s
  } catch (err) {
    res.status(200).json({
      success: true,
      message: "All Form Results Deleted Successfully",
    });
  }


});

//Get ALL Results --Get
exports.getAllResults = asyncHandler(async (req, res, next) => {

  const currentPage = req.query.page || 1;
  const perPage = 10;
  try {
    const formResponseCount = await FormResponse.find({
      userId: { $in: req.user.id },
    }).countDocuments();
    const formResponse = await FormResponse.find({
      userId: { $in: req.user.id },
    }).sort({ createdAt: -1 }).skip((currentPage - 1) * perPage)
      .limit(perPage);
    if (!formResponse) {
      const error = new Error('Form Response not found')
      error.statusCode = 404
      throw error
    }
    res.status(200).json({
      success: true,
      formResponse,
      formResponseCount
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

//Update Form Active staus --Put
exports.updateFormStatus = async (req, res) => {
  try {
    const feedbackForm = await FeedbackForm.findById(req.params.id);
    if (!feedbackForm) {
      const error = new Error('Feedback Form  not found')
      error.statusCode = 404
      throw error
    }
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
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
