const Section = require("../models/SectionModel");
const Menu = require("../models/MenuModel");


//Create Section Post
exports.createSection = (async (req, res, next) => {
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

    await updateMenu(req.params.id, section);

    res.status(201).json({
        success: true,
        section,
    });
});

//Update Function
async function updateMenu(menuId, sectionRes) {
    let menu = await Menu.findById(menuId);
    menu.section.push(sectionRes)
    await menu.save({ validateBeforeSave: false });
}