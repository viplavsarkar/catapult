var express         = require('express');
var router          = express.Router();

var path            = require('path');
var scriptName      = path.basename(__filename);
var controllerName  = scriptName.slice(0, scriptName.length - 3);
var winston         = require('winston');

/* GET home page. */
router.get('/', function(req, res, next) {

    winston.info("request at /courses", {url:'/courses'});

    var fCourses        = require('../app/pages/pCourses/pCourses.js');
    var bCourses        = new fCourses(req, res, next);
    bCourses.query      = req.query;
    bCourses.controller = controllerName;
    //bCourses.getCoursesScreenNew();
    bCourses.getCoursesScreen();
});

router.get('/bundle.js', function(req, res, next){

    var fCourses        = require('../app/pages/pCourses/pCourses.js');
    var bCourses        = new fCourses(req, res, next);
    bCourses.query      = req.query;
    bCourses.controller = controllerName;
    bCourses.getBundle();
});


module.exports = router;