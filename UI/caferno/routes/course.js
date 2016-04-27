var express         = require('express');
var router          = express.Router();

var path            = require('path');
var scriptName      = path.basename(__filename);
var controllerName  = scriptName.slice(0, scriptName.length - 3);
var winston         = require('winston');

/* GET home page. */
router.get('/', function(req, res, next) {

    winston.info("request at /course", {url: '/course'});

    var pCourse         = require('../app/pages/pCourses/pCourse.js');
    var bCourse         = new pCourse(req, res, next);
    bCourse.query       = req.query;
    bCourse.controller  = controllerName;
    bCourse.getCoursesScreenNew();
});

router.get('/bundle.js', function(req, res, next){

    var pCourse         = require('../app/pages/pCourses/pCourse.js');
    var bCourse         = new pCourse(req, res, next);
    bCourse.query       = req.query;
    bCourse.controller  = controllerName;
    bCourse.getBundle();
});


module.exports = router;