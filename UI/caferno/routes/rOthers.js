var express         = require('express');
var router          = express.Router();

var path            = require('path');
var scriptName      = path.basename(__filename);
var controllerName  = scriptName.slice(0, scriptName.length - 3);
var winston         = require('winston');

/* GET home page. */
router.get('/:classURL', function(req, res, next) {
	//console.log(req._parsedOriginalUrl.pathname);
	var pathname = req._parsedOriginalUrl.pathname;
	if(pathname.startsWith('/')){
		pathname = pathname.substring(1);
	}

	var pathArr = pathname.split('/');
	console.log(pathArr);
	switch(pathArr[0]){
		case 'online-class':
			//getOnlineClassDetailScreen(req, res, next);
			break;
		default:
			console.log('no "others" controller definition found');
			res.send('no "other" controller found');
			break;
	}


});

var getOnlineClassDetailScreen = function(req, res, next){
	console.log('its online-class');
			winston.info("request at /mobile", {url:'/mobile'});
			console.log('Webinar List Page: ' + new Date().toISOString());
		    var fCourses        = require('../app/pages/pWebinars/pWebinarDetail.js');
		    var bCourses        = new fCourses(req, res, next);
		    bCourses.query      = req.query;
		    bCourses.controller = controllerName;
		    bCourses.getScreen();
}

module.exports = router;