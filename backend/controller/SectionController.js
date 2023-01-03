const Section = require("../models/SectionModel");
const Menu = require("../models/MenuModel");

exports.createSection = (async (req, res, next) => {
    let menu = await Menu.findById(req.params.id);

    const {
        sectionName,
        sectionDescription,
        sectionNote,
    } = req.body;

    const section = await Section.create({
        sectionName,
        sectionDescription,
        sectionNote,
    });

    await updateStock(req.params.id, section);

    res.status(201).json({
        success: true,
        section,
    });
});


async function updateStock(id, quantity) {
    let menu = await Menu.findById(id);
    menu.section.push(quantity)
    await menu.save({ validateBeforeSave: false });
}