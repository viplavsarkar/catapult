
var o = new Object();

o.root 				= "http://192.168.17.145";

o.header 			= o.root + '/catapultui/data/getTestDataHeader.txt';
o.footer			= o.root + '/catapultui/data/getTestDataFooter.txt';

//courses
o.courseList		= o.root + '/catapultui/data/getTestDataCourseList.txt';
o.courseDetail 		= o.root + "/catapultui/data/getTestDataOfCourseDetail.txt";

//classes
o.classList  		= o.root + "/catapultui/data/getTestDataForWebinars.txt";
o.classDetail 		= o.root + "/catapultui/data/getTestDataForWebinarDetail.txt";
o.classDetailMeta	= o.root + "/catapultui/data/getTestDataForWebinarDetailMeta.txt";

//discover
o.discover 			= o.root + "/catapultui/data/getTestDataForDiscover.txt";
o.discoverBanner	= o.root + "/catapultui/data/getTestDataForDiscoverBanner.txt";

module.exports = o;