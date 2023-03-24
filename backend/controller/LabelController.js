const Label = require("../models/LabelModel");
const asyncHandler = require("express-async-handler");

//Create Menu ---Post
exports.createLabel = asyncHandler(async (req, res, next) => {
    try {
        const labelData = req.body

        let label = await Label.findOne({ userId: req.user._id })
        if (label) {
            label.itemLabel.push(labelData)
            label.save()
            return res.status(201).json({
                success: true,
                message: "Label push Successfully",
                label,
            });
        } else {
            const label = await Label.create({
                userId: req.user._id,
                itemLabel: [labelData],
            });
            return res.status(201).json({
                success: true,
                message: "Label Created Successfully",
                label,
            });
        }

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});


//Update Label By Id
exports.updateLabel = asyncHandler(async (req, res, next) => {
    const labelId = req.params.labelId;
    const labelData = req.body;
    try {
        const label = await Label.findOne({ userId: { $in: req.user.id } }).exec();
        if (!label) {
            const error = new Error('Label not found');
            error.statusCode = 404;
            throw error;
        }
        const itemToUpdate = label.itemLabel.find((element) => element._id == labelId);
        if (!itemToUpdate) {
            const error = new Error('Label item not found');
            error.statusCode = 404;
            throw error;
        }
        Object.assign(itemToUpdate, labelData);
        await label.save();
        res.status(200).json({
            success: true,
            message: "Updated successfully",
            label
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});


//Delete Labels By Id
exports.deleteLabel = asyncHandler(async (req, res, next) => {
    let labelId = req.params.labelId
    try {
        const label = await Label.findOne({ userId: { $in: req.user.id } }).exec();
        if (!label) {
            const error = new Error('label Not Found')
            error.statusCode = 404
            throw error
        }
        await label.itemLabel.pull({ _id: labelId })
        await label.save()
        res.status(200).json({
            success: true,
            message: "Deleted Successfully",
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});



//Get Single Modifier By Id ---Get
exports.getSingleLabel = asyncHandler(async (req, res, next) => {
    const labelId = req.params.labelId;
    try {
        const label = await Label.findOne({ userId: { $in: req.user.id } }).exec();
        if (!label) {
            const error = new Error('Label not found');
            error.statusCode = 404;
            throw error;
        }
        const itemLabel = label.itemLabel.find((element) => element._id == labelId);
        if (!itemLabel) {
            const error = new Error('Label item not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "Item Label fetched successfully",
            itemLabel
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});

//Get All Label ---Get
exports.getLabels = asyncHandler(async (req, res, next) => {
    try {
        const label = await Label.findOne({ userId: { $in: req.user.id } }).exec();
        if (!label) {
            const error = new Error('label Not Found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            success: true,
            label,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});

