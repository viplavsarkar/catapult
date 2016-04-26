var HomePageType    = require('../../presenter/pGenerateHomePage.js');
var Comp            = require('../../../core/utility/dComponent.js');
var CompObj         = require('../../../core/utility/cSCO.js');
var CONST           = require('../../../core/constants/components.js');
//var winston = require('winston');

var PCourseDetail = function(req, res, next){
    this.req    = req;
    this.res    = res;
    this.next   = next;

    this.controller = '';
    this.presenter  = new HomePageType(req, res ,next);
    this.template   = '';
    this.components = [];
    this.pageData   = {};
};

PCourseDetail.prototype.getScreen = function(){
    var _ = this;

    var hUnitTestData = require('../../../core/helper/hUnitTestData.js');
    var hTestData = new hUnitTestData();

    //set the template to use
    _.template = 'tCourseDetail.ejs';
    
    //add the header
    _.components.push(new CompObj(CONST.HEADER,{}, null).getComponent());
  
    //add the react component to add in the page
    _.components.push(new CompObj(CONST.COURSE_DETAIL,{}).getComponent());
   
    //add the footer
    _.components.push(new CompObj(CONST.FOOTER,{}).getComponent());
   
    _.pageData = {};

    //calling the generate page after the components were obtained asynchronously and collected by this point.   
    _.generatePage();
}

PCourseDetail.prototype.generatePage = function(){
    var _this = this;
    //winston.info("PCourses:getCoursesScreen()", {url:this.controller, page:'pCourse.js', components:['cCourseList.jsx']});
    _this.presenter.controller = _this.controller;
    _this.presenter.getCoursesScreenActual(_this.template, _this.components, _this.pageData);
}

module.exports = PCourseDetail;