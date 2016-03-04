var index = require('../routes');
var courses = require('../routes/courses');

module.exports = function (app) {
    app.use('/', index);
    app.use('/courses', courses);
};