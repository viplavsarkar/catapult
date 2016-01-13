var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    //res.json({message:'welcome to login page'});
    var fCourses = require('../core/bCourses.js');
    var bCourses = new fCourses(req, res, next);
    bCourses.query = req.query;

    bCourses.getCoursesScreen();
});

router.get('/bundle.js', function(req, res, next){
    var fCourses = require('../core/bCourses.js');
    var bCourses = new fCourses(req, res, next);
    bCourses.query = req.query;
    //res.json({res:'hi'});
    bCourses.getBundle();

});


module.exports = router;