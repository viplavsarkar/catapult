
var o = new Object();
o.prod = new Object();
o.dev = new Object();


o.prod.root 			= "http://192.168.17.186";
o.dev.root 				= "http://192.168.17.145";
//o.dev.root 				= "http://localhost";

o.prod.academy 			= o.prod.root + ":8055/v1/academy/subdomain/";
o.dev.academy 	 		= o.dev.root + "/catapultui/data/getTestDataForAcademy.txt?";

o.dev.header 			= o.dev.root + '/catapultui/data/getTestDataHeader.txt?';
o.prod.header			= o.prod.root + ":8055/v1/academy/subdomain/";
o.dev.footer			= o.dev.root + '/catapultui/data/getTestDataFooter.txt';
o.prod.footer			= o.dev.root + '/catapultui/data/getTestDataFooter.txt';

//COURSES
o.dev.courseList		= o.dev.root + '/catapultui/data/getTestDataCourseList.txt?';
o.dev.courseDetail 		= o.dev.root + "/catapultui/data/getTestDataOfCourseDetail.txt?";
o.prod.courseList		= o.prod.root + ":8070/v1/courses?";
o.prod.courseDetail 	= o.prod.root + ":8070/v1/courses/";
//o.prod.courseDetailNew 	= o.dev.root + "/catapultui/data/getTestDataOfCourseDetailNew.txt";

//CLASSES
o.dev.classList  		= o.dev.root + "/catapultui/data/getTestDataForWebinars.txt?";
o.dev.classDetail 		= o.dev.root + "/catapultui/data/getTestDataForWebinarDetail.txt?";
o.prod.classList 		= o.prod.root + ":8050/v1/class/esp/webinars/";
o.prod.classDetail		= o.prod.root + ":8050/v1/class/";
//o.classDetail 		= o.root + "/catapultui/data/getTestDataForWebinarDetail.txt";


o.dev.classDetailMeta	= o.dev.root + "/catapultui/data/getTestDataForWebinarDetailMeta.txt";
o.prod.classDetailMeta	= o.dev.root + "/catapultui/data/getTestDataForWebinarDetailMeta.txt";

//discover
o.dev.discover 			= o.dev.root + "/catapultui/data/getTestDataForDiscover.txt?";
o.dev.discoverBanner	= o.dev.root + "/catapultui/data/getTestDataForDiscoverBanner.txt?";
o.prod.discover 		= o.prod.root + ":8070/v1/courses?";
o.prod.discoverBanner	= o.prod.root + ":8055/v1/academy/subdomain/";

module.exports = o.prod;