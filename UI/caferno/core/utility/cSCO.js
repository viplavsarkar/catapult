var Comp            = require('./dComponent.js');
var CONST           = require('../constants/components.js');
var ORCH           	= require('../http/orchEndPoints.js');
var DATA_ACCESS_TYPE  = require('../constants/componentParams.js');

var cSCO = function(componentId, params, templateVariableName, presetData, dataAccessType){
	this.component 	= componentId;
	this.params		= params;
	this.varName 	= templateVariableName ? templateVariableName : componentId;
	this.presetData = presetData ? presetData : null;
	this.dataAccessType = dataAccessType ? dataAccessType : DATA_ACCESS_TYPE.REQUEST_ONLY;
	//return this.getComponent();
};

cSCO.prototype.getComponent = function(){
	var _ = this;
	//console.log(_.component);
	switch(_.component){
		case CONST.HEADER:
			return new Comp('cHeader_header.jsx', _.presetData, false, "cHeader", null,
	            {
	                url: ORCH.header + _.params.subDomainUrl + '/'
	            },
	            _.varName, _.dataAccessType
	        );
			break;
		case CONST.FOOTER:
			return new Comp('cFooter_footer.jsx', _.presetData, false, null, null,
	            {
	                url: ORCH.footer
	            },
	            _.varName, _.dataAccessType
	        );
			break;
		case CONST.DISCOVER:
			return new Comp('cDiscover_discover.jsx', _.presetData, true, null, null,
	            {
	                url: ORCH.discover + "espId="+_.params.espId+"&pageSize=20"
	            },
	            _.varName, _.dataAccessType
	        );
			break;
		case CONST.DISCOVER_BANNER:
			return new Comp('cDiscover_banner.jsx', _.presetData, false, null, null,
	            {
	                url: ORCH.discoverBanner + _.params.subDomainUrl + '/'
	            },
	            _.varName, _.dataAccessType
	        );
			break;
		case CONST.COURSE_LIST:
			return new Comp('cCourses_cCourseList.jsx', _.presetData , true, "cCourses", null,
	            {
	                 url: ORCH.courseList + "espId="+_.params.espId+"&page=0&pageSize=20"
	            },
	            _.varName, _.dataAccessType
	        )
			break;
		case CONST.COURSE_DETAIL:
			return new Comp('cCourses_cCourseDetail.jsx', _.presetData , false, "cCourses", null,
	            {
	                 url: ORCH.courseDetail + _.params.courseId
	            },
	            _.varName, _.dataAccessType
	        )
			break;
		case CONST.COURSE_DETAIL_NEW:
			return new Comp('cCourses_cCourseDetailNew.jsx', _.presetData , true, "cCourses", null,
	            {
	                 url: ORCH.courseDetailNew
	            },
	            _.varName, _.dataAccessType
	        )
			break;
		case CONST.CLASS_LIST:
			return new Comp('cWebinars_testList.jsx', _.presetData , true, "cWebinars", null,
	            {
	                 url: ORCH.classList + _.params.espId + "?pageSize=1000&page=0"
	            },
	            _.varName, _.dataAccessType
	        )
			break;
		case CONST.CLASS_DETAIL:
			return new Comp('cWebinars_detail.jsx', _.presetData , false, "cWebinars", null,
	            {
	                 url: ORCH.classDetail+"webinar/detail/"+_.params.idClassMaster
	            },
	            _.varName, _.dataAccessType
	        )
			break;
		case CONST.CLASS_DETAIL_META:
			return new Comp('cWebinars_detailMeta.jsx', _.presetData , false, "cWebinars", null,
	            {
	                 url: ORCH.classDetailMeta
	            },
	            _.varName, _.dataAccessType
	        )
	     case CONST.MOBILE_HEAD:
			return new Comp('cMobileApp_mobileHead.jsx', _.presetData , false, "cMobileApp", null,
	            {
	                 url: null
	            },
	            _.varName, _.dataAccessType
	        )
			break;
		case CONST.MOBILE_BODY:
			return new Comp('cMobileApp_mobileBody.jsx', _.presetData , false, "cMobileApp", null,
	            {
	                 url: null
	            },
	            _.varName, _.dataAccessType
	        )
			break;
		case CONST.CONTACT_US:
			return new Comp('cContactUs_contactus.jsx', _.presetData , false, "cContactUs", null,
	            {
	                 url: null
	            },
	            _.varName, _.dataAccessType
	        )
			break;
		case CONST.SIGN_IN:
			return new Comp('cLogin_signin.jsx', _.presetData , false, "cLogin", null,
	            {
	                 url: null
	            },
	            _.varName, _.dataAccessType
	        )
			break;
		case CONST.SIGN_UP:
			return new Comp('cLogin_signup.jsx', _.presetData , false, "cLogin", null,
	            {
	                 url: null
	            },
	            _.varName, _.dataAccessType
	        )
			break;
		default:
			console.log('no component found')
			break;
	}
}

module.exports = cSCO;