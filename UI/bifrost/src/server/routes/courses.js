var express = require('express');
var path = require('path');
var config = require('../config/config');
var Page = require('../pages/Page');
var Courses = require('../pages/Courses')
var router = express.Router();
var request = require('request');
require('babel-core/register');

Page = new Page();
Courses = new Courses();

router.get('/', function (req, res) {
   // var courseListData4 = Courses.getPublicCoursesData();
    var courseListData3 = [{
            
            "logo": '/asset/image/courses/courses_1_221x140.jpg',
            title: 'Hadoop Introduction',
            academy: {
                logo: '/asset/image/academy/niit.jpg',
                name: 'LearnDesk'
            },
            liveFor: 3,
            publishDate: 1457342156,
            courseComposition: {
                tutorials: 1,
                classes: 3,
                tests: 2
            },
            enrollees: [
                'Ashutosh'
            ],
            price: 10
        }];
    var courseListData = [{
        "courseId": "5333",
        "title": "Demo Course 1",
        "price": 2000,
        logo: '/asset/image/courses/courses_1_221x140.jpg',
        academy: {
                logo: '/asset/image/academy/niit.jpg',
                name: 'LearnDesk'
            },
        courseComposition: {
            tutorials: 1,
            classes: 3,
            tests: 2
        },
        liveFor: 3,
        enrollees: [
                'Ashutosh'
            ],
        "publishDate": "2016-03-11 01:49:00.000"
    }];
    var courseListUrl = 'http://192.168.17.175:8080/v1/courses/427';


    var section = path.join('courses', 'PublicCourses.jsx');
    Page.prepareAndSendResponse(res, section, courseListData);
});

module.exports = router;