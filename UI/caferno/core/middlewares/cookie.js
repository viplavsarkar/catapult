/**
 *  Cookies initialization script to be used as `express` middleware.
 *  @author Ashutosh Dhundhara
 */

var Helper = require('../utility/hHelper');
var i18n            = require('../i18n');
var request         = require('request');
var httpHandler = require('../http/httpHandler.js');

var SetGlobalContext = function(academyCookie){
    global.academy.espId = academyCookie.id;
    if(academyCookie.defaultLanguage){
        var language = new i18n(academyCookie.defaultLanguage);
    }else{
        var language = new i18n('en-US');
    }
    if(academyCookie.countryCode){
        global.academy.countryCode = academyCookie.countryCode;
    }
    if(academyCookie.webinar){
        global.academy.webinar = academyCookie.webinar;
    }
    if(academyCookie.curr){
        global.academy.curr = academyCookie.curr;
    }
}

var GetCountryFromIp = function(ip, callback){
    var url = "http://freegeoip.net/json/" + ip;
    var request = new httpHandler({url:url},function(err, data){
            callback(err,data);            
        }).SIMPLE_REST_FULL_RESPONSE();
    /*
    //sample response
    { ip: '61.12.79.2',
      country_code: 'IN',
      country_name: 'India',
      region_code: '',
      region_name: '',
      city: '',
      zip_code: '',
      time_zone: 'Asia/Kolkata',
      latitude: 20,
      longitude: 77,
      metro_code: 0 }    
    */
}

var GetEspIdAndCountry = function(req, res, next, academyUrl){
    var ip = req.headers['x-forwarded-for'] || 
                 req.connection.remoteAddress || 
                 req.socket.remoteAddress ||
                 req.connection.socket.remoteAddress;
    var ipProper = ip.split(':')[ip.split(':').length-1];
    console.log('Actual IP is ' + ipProper + '. IP in DEV MODE is 61.12.79.2');
    ipProper = '61.12.79.2';
    GetCountryFromIp(ipProper, function(err, data){
        var countryCode = "US";
        if(err){
                console.log('error has occured');               
               // next(err); //not exiting!
            }else{
                if(data && data.country_code){
                    countryCode = data.country_code;
                    //GetEspId(req, res, next, academyUrl, countryCode);
                }
            }
        GetEspId(req, res, next, academyUrl, countryCode);
    });

}

var GetEspId = function(req, res, next, academyUrl, countryCode){
    var academy = new Helper(function (err, data) {
                if(err) next(err);
                else{
                    var academy = data.academy;
                    academy.webinar = data.webinar;
                    if(countryCode){
                        academy.countryCode = countryCode;
                        if(countryCode != 'IN'){
                            academy.curr = 'USD';
                        }
                    }
                    res.cookie(
                        'academy',
                        academy,
                        {
                            maxAge: 90000,
                            httpOnly: true
                        }
                    );

                    SetGlobalContext(academy);                
                    next();
                }
            })
            .getEspId(academyUrl);
}

module.exports = function (app) {
    app.use(function(req, res, next) {
        console.log(req.headers.host);
        console.log(req.cookies);
        var academyUrl = req.headers.host.split(':')[0];
        //set URL into global context
        global.academy.url = academyUrl;
        //GetCountryFromIp(req, res, next, "12");
      
        var academyCookie = req.cookies.academy;
        if (academyCookie) {
            SetGlobalContext(academyCookie);
            next();
        } else {
            // Set academy cookie if not set
            
            GetEspIdAndCountry(req, res, next, academyUrl);
        }
    });
}