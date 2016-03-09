var express = require('express');
var path = require('path');
var config = require('../config/config');
var Page = require('../pages/Page');
var Courses = require('../pages/Courses')
var router = express.Router();
require('babel-core/register');

Page = new Page();
Courses = new Courses();

router.get('/', function (req, res) {
    var courseListData = Courses.getPublicCoursesData();
    var section = path.join('courses', 'PublicCourses.jsx');
    Page.prepareAndSendResponse(res, section, courseListData);
});

module.exports = router;