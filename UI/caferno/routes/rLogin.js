var express         = require('express');
var router          = express.Router();

var path            = require('path');
var scriptName      = path.basename(__filename);
var controllerName  = scriptName.slice(0, scriptName.length - 3);
var winston         = require('winston');

/* GET home page. */
router.get('/:url?', function(req, res, next) {
	var pathname = req._parsedOriginalUrl.pathname;
	
	var pathArr = pathname.split('/');
	switch(pathArr[1]){
		case 'SignIn':
			getSignInScreen(req, res, next);
			break;
		case 'SignUp':
			getSignUpScreen(req, res, next, pathArr[2]);
			break;
		default:
			console.log('no "webinars" controller definition found');
			res.send('no "webinars" controller found');
			break;
	}


});

var getSignInScreen = function(req, res, next){
	winston.info("request at /mobile", {url:'/mobile'});
	console.log('Webinar List Page: ' + new Date().toISOString());
    var fCourses        = require('../app/pages/pLogin/pSignIn.js');
    var bCourses        = new fCourses(req, res, next);
    bCourses.query      = req.query;
    bCourses.controller = controllerName;
    bCourses.getScreen();
}

var getSignUpScreen = function(req, res, next, classURL){
	console.log('class url = ' + classURL);
	winston.info("request at /mobile", {url:'/mobile'});
	console.log('Webinar List Page: ' + new Date().toISOString());
    var fCourses        = require('../app/pages/pLogin/pSignUp.js');
    var bCourses        = new fCourses(req, res, next);
    bCourses.query      = req.query;
    bCourses.controller = controllerName;
    bCourses.getScreen();
}

module.exports = router;