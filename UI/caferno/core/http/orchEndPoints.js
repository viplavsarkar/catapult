
var o = new Object();

o.root 				= "http://192.168.17.145";
//o.root 				= "http://localhost";
//o.root 			= "http://192.168.17.186";

//o.header 			= o.root + '/catapultui/data/getTestDataHeader.txt';
o.header			= "http://192.168.17.186:8055/v1/academy/subdomain/";
o.footer			= o.root + '/catapultui/data/getTestDataFooter.txt';

//courses
//o.courseList		= o.root + '/catapultui/data/getTestDataCourseList.txt';
o.courseList		= "http://192.168.17.186:8070/v1/courses?";
o.courseDetail 		= o.root + "/catapultui/data/getTestDataOfCourseDetail.txt";
o.courseDetailNew 	= o.root + "/catapultui/data/getTestDataOfCourseDetailNew.txt";

//classes
o.classList  		= o.root + "/catapultui/data/getTestDataForWebinars.txt";
o.classDetail 		= o.root + "/catapultui/data/getTestDataForWebinarDetail.txt";
o.classDetailMeta	= o.root + "/catapultui/data/getTestDataForWebinarDetailMeta.txt";

//discover
//o.discover 			= o.root + "/catapultui/data/getTestDataForDiscover.txt";
//o.discover 		= "http://192.168.17.186:8070/v1/courses?espId=1521";
o.discover 		= "http://192.168.17.186:8070/v1/courses?";
//o.discoverBanner	= o.root + "/catapultui/data/getTestDataForDiscoverBanner.txt";
o.discoverBanner	= "http://192.168.17.186:8055/v1/academy/subdomain/";

module.exports = o;