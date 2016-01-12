var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  	//res.render('index', { title: 'Express' });
  	//res.json({message:'welcome to login page'});
 	var fLogin = require('../core/bLogin.js');
	var bLogin = new fLogin(req, res, next);
	bLogin.query = req.query;

	bLogin.getLogScreen();
});

router.get('/bundle.js', function(req, res, next){
	var fLogin = require('../core/bLogin.js');
	var bLogin = new fLogin(req, res, next);
	bLogin.query = req.query;

	bLogin.getBundle();
	
});


module.exports = router;
