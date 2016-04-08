var index = require('../routes');
var courses = require('../routes/courses');
var mobile	= require('../routes/mobile');

module.exports = function (app) {
    app.use('/', index);
    app.use('/courses', courses);
    app.use('/mobile', mobile);
};