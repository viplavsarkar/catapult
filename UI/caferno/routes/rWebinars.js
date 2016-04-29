var express         = require('express');
var router          = express.Router();

var path            = require('path');
var scriptName      = path.basename(__filename);
var controllerName  = scriptName.slice(0, scriptName.length - 3);
var winston         = require('winston');

/* GET home page. */
router.get('/:url?', function(req, res, next) {

	var pathname = req._parsedOriginalUrl.pathname;
	/*
	if(pathname.startsWith('/')){
		pathname = pathname.substring(1);
	}
	*/
	var pathArr = pathname.split('/');
	//console.log(pathArr);
	switch(pathArr[1]){
		case 'webinars':
			getOnlineClassListScreen(req, res, next);
			break;
		case 'online-class':
			getOnlineClassDetailScreen(req, res, next, pathArr[2]);
			break;
		default:
			console.log('no "webinars" controller definition found');
			res.send('no "webinars" controller found');
			break;
	}


});

var getOnlineClassListScreen = function(req, res, next){
	winston.info("request at /mobile", {url:'/mobile'});
	console.log('Webinar List Page: ' + new Date().toISOString());
    var fCourses        = require('../app/pages/pWebinars/pWebinars.js');
    var bCourses        = new fCourses(req, res, next);
    bCourses.query      = req.query;
    bCourses.controller = controllerName;
    bCourses.getScreen();
}

var getOnlineClassDetailScreen = function(req, res, next, classURL){
	if(!classURL){
		res.send('inadequate url');
	}
	console.log('class url = ' + classURL);
	winston.info("request at /mobile", {url:'/mobile'});
	console.log('Webinar List Page: ' + new Date().toISOString());
    var fCourses        = require('../app/pages/pWebinars/pWebinarDetail.js');
    var bCourses        = new fCourses(req, res, next);
    bCourses.query      = req.query;
    bCourses.controller = controllerName;
    bCourses.seoUrl = classURL;
    bCourses.getScreen();
}

module.exports = router;