const express = require('express');
const { createMenu } = require('../controller/MenuController');
const { createSection } = require('../controller/SectionController');
const router = express.Router();

router.route("/createmenu").post(createMenu)
router.route("/createsection/:id").post(createSection)


module.exports = router

