const FeedbackForm = require("../models/FeedbackFormModel");
const FormQuestion = require("../models/FormQuestionModel");
const FormResponse = require("../models/FeedbackResponseModel");


//Create FeedBack Form --Post
exports.createFeedbackForm = async (req, res, next) => {
    const { formName, active, formQuestions } = req.body;

    const feedbackForm = await FeedbackForm.create({
        formName,
        active,
        formQuestions
    });

    res.status(201).json({
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
    console.log(feedbackForm, "feedbackForm")
    feedbackForm.formQuestions.push(formQuestionResponse);
    await feedbackForm.save({ validateBeforeSave: false });
}


//Create Result Form --Post
exports.createResultForm = async (req, res, next) => {

    let feedbackForm = await FeedbackForm.findById(req.query.id);
    // let feedbackForm = await FeedbackForm.findById(req.query.id);
    // let form_name = feedbackForm.formName

    console.log(feedbackForm, "feedbackForm")
    // const { answer } = req.body;

    // for (let i in req.body.answer) {

    // }

    // const formResponse = await FormResponse.create({
    //     form_name,
    //     answer
    // });

    res.status(201).json({
        success: true,
        // formResponse,
    });
};


