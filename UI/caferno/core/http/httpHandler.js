var request         = require('request');
var async 			= require("async");

var HttpHandler = function(reqObj, callback){
	this.reqObj = reqObj;
	this.callback = callback ? callback : null;
}

HttpHandler.prototype.getMethodForAsynch = function(merhodName){
	var _ = this;

	return function(callback){
		_.callback = callback;
		switch(merhodName){
			case "SIMPLE_REST":
				_.SIMPLE_REST();
				break;
			default:
				_.reqObj.callback(error);
				break;
		}
		//_.SIMPLE_REST();
		//method();
	}
}

HttpHandler.prototype.SIMPLE_REST = function(){
    var _ = this;

    var dateTimeNow = new Date();
    var startTime = new Date().getTime();
    console.log(dateTimeNow + '(' + startTime + ')');
    console.log('REQUEST >>>>>>>> ' + _.reqObj.url);
    console.log();
    if(_.reqObj.url == null){
        _.callback(null,{});
    }else{
        request({
            url: _.reqObj.url,
            qs: {from: 'caferno', time: +new Date()},
            method: 'GET',
            headers: {
                'Content-Type': 'MyContentType',
                'Custom-Header': 'Custom Value'
            }
        }, function(error, response, body){
            if(error) {
                console.log(error.message);
                return _.callback(error);
                //return;
            } else {

                console.log('RESPONSE <<<<<<<<< ' + _.reqObj.url);
                var dateTimeNow = new Date();
                var endTime = dateTimeNow.getTime();
                console.log(dateTimeNow + '(' + endTime + ')');

                var timeTaken = endTime - startTime;
                console.log('('+timeTaken+' miliseconds)');
                console.log();
                //console.log(response.statusCode, body);
                var bodyObj = JSON.parse(body);

                _.callback(null, bodyObj.data);
            }
        });
    }
}

module.exports = HttpHandler;