var express = require('express');
var path = require('path');
var app = express();
var config = require('./config/config');
var routes = require('./config/routes');
var i18n = require('./i18n');

/**
 * Set directly accessible directories
 * NOTE: `dirname` will not be part of URL
*/
console.log('__dirname=' + __dirname);
app.use(express.static(path.join(__dirname, '..', 'public')));
// As of now we're not using any bundler so exposing complete front-end `app`
//app.use(express.static(path.join(__dirname, '..', 'app')));
app.use(express.static(path.join(__dirname, '..', 'client')));
//app.use(express.static(path.join(__dirname, '..', '..', 'bower_components')));

/**
 * Set up View Engine
 */
app.set('views', config.views);
app.set('view engine', 'ejs');

/**
 * Initialize routes
 */
routes(app);

/**
 * Initialize language
 */
var language = new i18n('en-US');
//var language = new i18n('ar-AE');

module.exports = app;