var express = require('express');
var router = express.Router();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var browserify = require('browserify');
var reactify = require('reactify');

var app = express();

router.get('/', function (req, res) {
    var NodeJSX = require('node-jsx');
    NodeJSX.install();

    res.setHeader('Content-Type', 'text/html');

    var messages = {
        ar: {
            next: 'التالى',
            learner: 'متعلم'
        },
        en: {
            next: 'Next',
            learner: 'Learner'
        }
    };

    var APP_PROPS = {
        courseBoxData: [
            {
                key: 1,
                title: 'MySQL Database Administration',
                logo: 'asset/image/courses/courses_1_221x140.jpg',
                session: {
                    title: 'Fundamentals of Data Structures',
                    time: 1452501069,
                },
                duration: 60,
                learners: [
                    {key: 1, name: 'Ashutosh', profileUrl: '#'},
                    {key: 2, name: 'Varinder', profileUrl: '#'},
                    {key: 3, name: 'Biplab', profileUrl: '#'},
                    {key: 4, name: 'Dinkar', profileUrl: '#'},
                ],
                weeks: 8,
                weeksCompleted: 2
            },
            {
                key: 2,
                title: 'MySQL Database Administration3',
                logo: 'asset/image/courses/courses_2_221x140.jpg',
                session: {
                    title: 'Fundamentals of Data Structures',
                    time: 1452501069,
                },
                duration: 60,
                learners: [
                    {key: 1, name: 'Ashutosh', profileUrl: '#'},
                    {key: 2, name: 'Varinder', profileUrl: '#'},
                    {key: 3, name: 'Biplab', profileUrl: '#'},
                    {key: 4, name: 'Dinkar', profileUrl: '#'},
                ],
                weeks: 8,
                weeksCompleted: 2
            }
        ],

        locales: language,
        messages: messages[language],
        formats: {
            "date": {
                "short": {
                    "day": "numeric",
                    "month": "long",
                    "year": "numeric"
                }
            }
        }
    };

    var CourseList = React.createFactory(require('../components/courses/CourseList.jsx'));
    var courseListHtml = ReactDOMServer.renderToString(CourseList({
        data: APP_PROPS.courseBoxData,
        locales: APP_PROPS.locales,
        messages: APP_PROPS.messages,
        formats: APP_PROPS.formats
    }));

    res.render('courses/CourseList', {courseList: courseListHtml, APP_PROPS: JSON.stringify(APP_PROPS)});
});

router.get('/bundle.js', function (req, res) {
    res.setHeader('Content-Type', 'text/javascript');

    browserify()
    .add('./app/components/courses/CourseList.jsx')
    .transform(reactify)
    .bundle()
    .pipe(res);
});

module.exports = router;