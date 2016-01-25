var express = require('express');
var http = require('http');

var app = express();

global.language = 'en';


app.use(function (req, res, next) {
    if (typeof req.query['language'] != 'undefined' && req.query['language'].length > 0) {
        global.language = req.query['language'];
    } else {
        global.language = 'en';
    }

    next();
});


// set the view engine to ejs
app.set('view engine', 'ejs');

// Content of this directory will be served directly
// but `public` will not be the part of URL
app.use(express.static('public'));
app.use('/courses', require('./app/routes/courses'));
app.use('/courses/', require('./app/routes/courses'));

module.exports = app;