var express         = require('express');
var router          = express.Router();

var path            = require('path');
var scriptName      = path.basename(__filename);
var controllerName  = scriptName.slice(0, scriptName.length - 3);
var winston         = require('winston');

/* GET home page. */

router.get('/', function(req, res, next){
    winston.info("request at /home", {url:'/home'});
    console.log('Home Page: ' + new Date().toISOString());
    var fCourses        = require('../app/pages/pDiscover/pDiscover.js');
    var bCourses        = new fCourses(req, res, next);
    bCourses.query      = req.query;
    bCourses.controller = controllerName;
    bCourses.getScreen();
});
module.exports = router;