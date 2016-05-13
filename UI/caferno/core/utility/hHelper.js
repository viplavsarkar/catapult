var httpHandler = require('../http/httpHandler.js');
var ORCH        = require('../http/orchEndPoints.js');
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

	var url = ORCH.academy + academyUrl + "/";
	//url = "http://192.168.17.145/catapultui/data/getTestDataHeader.txt";
	//url = "http://localhost/catapultui/data/getTestDataHeader.txt";
	var req = new httpHandler({url:url},function(err, data){
			if(err){
				console.log('error has occured');
				_.callback(err);
			}else{
				//console.log(" hhhhhhhhhhhhh> ");
				console.log(data);
				//return data;
				if(data && data.academy){
					_.callback(null,data);
				}else{
					var invalidDomain = new Error('Invalid academy.');
                    invalidDomain.status = 404;
                    //return _.next(invalidDomain);

					_.callback(invalidDomain);
				}
			}
	}).SIMPLE_REST();
	//return 495;
}

module.exports = HelperClass;