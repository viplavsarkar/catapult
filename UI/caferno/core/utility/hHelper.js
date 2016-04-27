var httpHandler = require('../http/httpHandler.js');

var HelperClass = function(callback){
	this.callback = callback;
}

HelperClass.prototype.getEspId = function(academyUrl){
	var _ = this;
	var req = new httpHandler({url:"http://192.168.17.186:8055/v1/academy/subdomain/"+academyUrl+"/"},function(err, data){
			if(err){
				console.log('error has occured');
			}else{
				console.log(" hhhhhhhhhhhhh> ");
				console.log(data);
				//return data;
				_.callback(data.academy);
			}
	}).SIMPLE_REST();
	//return 495;
}

module.exports = HelperClass;