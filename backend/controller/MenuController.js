const Menu = require("../models/MenuModel");


//Create Menu Post
exports.createMenu = (async (req, res, next) => {
    const {
        menuName,
        menuDescription,
        menuNote,
        section,
    } = req.body;

    const menu = await Menu.create({
        menuName,
        menuDescription,
        menuNote,
        section,
    });

    res.status(201).json({
        success: true,
        menu
    });
});

//Get Single Menu
exports.getSingleMenu = (async (req, res, next) => {
    let menuId = req.params.id
    const menu = await Menu.findById(menuId).populate(
        "section",
    );
    res.status(200).json({
        success: true,
        menu
    });
})