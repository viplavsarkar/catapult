var httpHandler = require('../http/httpHandler.js');

var HelperClass = function(callback){
	this.callback = callback;
}

HelperClass.prototype.getEspId = function(academyUrl){
	var _ = this;
	/*_.callback({
      "name": "taru",
      "id": 20,
      "logoTitle": "not null hessplo ppwddodffg",
      "subDomainUrl": "taru.wiziq.authordm.com",
      "subDomainName": "taru",
      "academyBannerBasePath": "http://wqimg.authordm.com/prelogin/images/",
      "idCreator": 77524
    });*/

	var url = "http://192.168.17.186:8055/v1/academy/subdomain/"+academyUrl+"/";
	//url = "http://192.168.17.145/catapultui/data/getTestDataHeader.txt";
	//url = "http://localhost/catapultui/data/getTestDataHeader.txt";
	var req = new httpHandler({url:url},function(err, data){
			if(err){
				console.log('error has occured');
			}else{
				//console.log(" hhhhhhhhhhhhh> ");
				console.log(data);
				//return data;
				_.callback(data.academy);
			}
	}).SIMPLE_REST();
	//return 495;
}

module.exports = HelperClass;