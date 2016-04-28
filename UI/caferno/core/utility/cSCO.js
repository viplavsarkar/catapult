var Comp            = require('./dComponent.js');
var CONST           = require('../constants/components.js');
var ORCH           	= require('../http/orchEndPoints.js');

var cSCO = function(componentId, params, templateVariableName){
	this.component 	= componentId;
	this.params		= params;
	this.varName 	= templateVariableName ? templateVariableName : componentId;

	//return this.getComponent();
};

cSCO.prototype.getComponent = function(){
	var _ = this;
	//console.log(_.component);
	switch(_.component){
		case CONST.HEADER:
			return new Comp('cHeader_header.jsx', null, false, "cHeader", null, 
	            {
	                url: ORCH.header + _.params.subDomainUrl + '/'
	            },
	            _.varName
	        );
			break;
		case CONST.FOOTER:
			return new Comp('cFooter_footer.jsx', null, false, null, null, 
	            {
	                url: ORCH.footer
	            },
	            _.varName 
	        );
			break;
		case CONST.DISCOVER:
			return new Comp('cDiscover_discover.jsx', null, true, null, null, 
	            {
	                url: ORCH.discover + "espId="+_.params.espId+"&pageSize=20"
	            },
	            _.varName 
	        );
			break;
		case CONST.DISCOVER_BANNER:
			return new Comp('cDiscover_banner.jsx', null, false, null, null, 
	            {
	                url: ORCH.discoverBanner + _.params.subDomainUrl + '/'
	            },
	            _.varName 
	        );
			break;
		case CONST.COURSE_LIST:
			return new Comp('cCourses_cCourseList.jsx', null , false, "cCourses", null, 
	            {
	                 url: ORCH.courseList + "espId="+_.params.espId+"&pageSize=20"
	            },
	            _.varName
	        )
			break;
		case CONST.COURSE_DETAIL:
			return new Comp('cCourses_cCourseDetail.jsx', null , false, "cCourses", null, 
	            {
	                 url: ORCH.courseDetail
	            },
	            _.varName
	        )
			break;
		case CONST.COURSE_DETAIL_NEW:
			return new Comp('cCourses_cCourseDetailNew.jsx', null , true, "cCourses", null, 
	            {
	                 url: ORCH.courseDetailNew
	            },
	            _.varName
	        )
			break;
		case CONST.CLASS_LIST:
			return new Comp('cWebinars_testList.jsx', null , false, "cWebinars", null, 
	            {
	                 url: ORCH.classList
	            },
	            _.varName
	        )
			break;
		case CONST.CLASS_DETAIL:
			return new Comp('cWebinars_detail.jsx', null , false, "cWebinars", null, 
	            {
	                 url: ORCH.classDetail
	            },
	            _.varName
	        )
			break;
		case CONST.CLASS_DETAIL_META:
			return new Comp('cWebinars_detailMeta.jsx', null , false, "cWebinars", null, 
	            {
	                 url: ORCH.classDetailMeta
	            },
	            _.varName
	        )
	     case CONST.MOBILE_HEAD:
			return new Comp('cMobileApp_mobileHead.jsx', null , false, "cMobileApp", null, 
	            {
	                 url: null
	            },
	            _.varName
	        )
			break;
		case CONST.MOBILE_BODY:
			return new Comp('cMobileApp_mobileBody.jsx', null , false, "cMobileApp", null, 
	            {
	                 url: null
	            },
	            _.varName
	        )
			break;
		case CONST.CONTACT_US:
			return new Comp('cContactUs_contactus.jsx', null , false, "cContactUs", null, 
	            {
	                 url: null
	            },
	            _.varName
	        )
			break;
		case CONST.SIGN_IN:
			return new Comp('cLogin_signin.jsx', null , false, "cLogin", null, 
	            {
	                 url: null
	            },
	            _.varName
	        )
			break;
		case CONST.SIGN_UP:
			return new Comp('cLogin_signup.jsx', null , false, "cLogin", null, 
	            {
	                 url: null
	            },
	            _.varName
	        )
			break;
		default:
			console.log('no component found')
			break;
	}
}

module.exports = cSCO;