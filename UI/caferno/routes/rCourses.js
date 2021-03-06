var express         = require('express');
var router          = express.Router();

var path            = require('path');
var scriptName      = path.basename(__filename);
var controllerName  = scriptName.slice(0, scriptName.length - 3);
var winston         = require('winston');

/* GET home page. */
router.get('/', function(req, res, next) {

    winston.info("request at /courses", {url:'/courses'});
    console.log('Course Detail Page: ' + new Date().toISOString());
    var fCourses        = require('../app/pages/pCourses/pCourses.js');
    var bCourses        = new fCourses(req, res, next);
    bCourses.query      = req.query;
    bCourses.controller = controllerName;
    
    if (req.get('Content-Type') === 'application/json') {
        try {
            var payload = req.query.payload;
            payload.espId = global.academy.espId;
            bCourses.getPageJson(payload);
        } catch (ex) {
            console.log(ex);
        }
    } else {
        bCourses.query      = req.query;
        bCourses.controller = controllerName;
        //bCourses.getCoursesScreenNew();
        bCourses.getScreen();
    }
});

router.get('/bundle.js', function(req, res, next){

    var fCourses        = require('../app/pages/pCourses/pCourses.js');
    var bCourses        = new fCourses(req, res, next);
    bCourses.query      = req.query;
    bCourses.controller = controllerName;
    bCourses.getBundle();
});

router.get('/:id', function(req, res, next) {

    winston.info("request at /courses", {url:'/courses'});
    console.log('Course Detail Page: ' + new Date().toISOString());
    //var fCourses        = require('../app/pages/pCourses/pCourseDetail.js');
    var fCourses        = require('../app/pages/pCourses/pCourseDetail.js');
    var bCourses        = new fCourses(req, res, next);
    bCourses.query      = req.query;
    bCourses.controller = controllerName;
    bCourses.seoUrl     = req.params.id;
    bCourses.getScreen();
});


module.exports = router;