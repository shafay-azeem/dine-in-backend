const Menu = require("../models/MenuModel");

exports.createMenu = (async (req, res, next) => {
    const {
        menuName,
        menuDescription,
        menuNote,
        section,
    } = req.body;

    console.log(req.body, "req.body")
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