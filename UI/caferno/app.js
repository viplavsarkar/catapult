var express         = require('express');
var path            = require('path');
var config          = require('./core/config/config');
var favicon         = require('serve-favicon');
//var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var cookies          = require('./core/middlewares/cookie');
var bodyParser      = require('body-parser');
var winston         = require('winston');
var winston_graylog = require('winston-graylog2');
//var config = require('./core/config/config');
var i18n            = require('./core/i18n');

winston.setLevels(winston.config.syslog.levels);
//{ emerg: 0, alert: 1, crit: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7 }
var console_options   = {
                          level: 'debug',
                          colorize: true,
                          timestamp: true,
                          stderrLevels: ['error', 'warning']
};
var file_options      = {
                          filename: 'somefile.log',
                          level: 'info',
                          maxsize: 10000000
};
var graylog_options   = {
                          name: 'LearnoLogs',
                          graylog: {
                            servers: [{ host: '192.168.17.187', port: 5555 }],
                            facility: "WizIq_Caferno"
                          }
};
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, console_options )
winston.add(winston.transports.File, file_options );
winston.add(winston_graylog, graylog_options );

//var routes = require('./routes/index');
var courses = require('./routes/rCourses');
var home    = require('./routes/rHome');
var mobileApp = require('./routes/rMobileApp');
var webinars = require('./routes/rWebinars');
var contactus= require('./routes/rContactUs');
var login= require('./routes/rLogin');
var others= require('./routes/rOthers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app/components')));
app.use(express.static(path.join(__dirname, 'html')));


global.academy = {
  // url: 'preportal.wiziq.authordm.com',
  //url: 'taru.wiziq.authordm.com',
  //url: 'imdb.wiziq.authordm.com',
  //url: 'ppttest.wiziq.com',
//  curr: 'USD'
};

cookies(app);

//app.use('/',                routes);
app.use('/publiccourse',    courses);
app.use('/course',          courses);
app.use('/home',            home);
app.use('/mobile',          mobileApp);
app.use('/webinars',        webinars);
app.use('/contactus',       contactus);
app.use('/online-class',    webinars);
app.use('/SignIn',          login);
app.use('/SignUp',          login);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handling 404 errors
app.use(function(err, req, res, next) {
  if(err.status !== 404) {
    return next();
  }  
  console.log('NOT FOUND - ' + req.originalUrl);
  res.send(err.message || '** no unicorns here **');
});

// error handlers

// development error handler
// will print stacktrace
global.env =  'dev';
//
//var language = new i18n('en-US');
//var language = new i18n('ar-AE');

//global.academy = {url:'newjon.wiziq.authordm.com'}
//global.academy = {url:'kabza.wiziq.authordm.com'}
if (app.get('env') === 'development') {
//if (config.env === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
