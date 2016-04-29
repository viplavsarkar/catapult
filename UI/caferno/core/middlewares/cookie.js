/**
 *  Cookies initialization script to be used as `express` middleware.
 *  @author Ashutosh Dhundhara
 */

var Helper = require('../utility/hHelper');

module.exports = function (app) {
    app.use(function(req, res, next) {
        var academyCookie = req.cookies.academy;
        if (academyCookie) {
            global.academy.espId = academyCookie.id;
            next();
        } else {
            // Set academy cookie if not set
            var academy = new Helper(function (academy) {
                res.cookie(
                    'academy',
                    academy,
                    {
                        maxAge: 90000,
                        httpOnly: true
                    }
                );

                global.academy.espId = academy.id;
                next();
            })
            .getEspId(global.academy.url);
        }
    });
}