const express = require('express');
const { createMenu, getSingleMenu } = require('../controller/MenuController');
const { createSection } = require('../controller/SectionController');
const router = express.Router();

router.route("/createmenu").post(createMenu)
router.route("/createsection/:id").post(createSection)
router.route("/getSingleMenu/:id").get(getSingleMenu)


module.exports = router

