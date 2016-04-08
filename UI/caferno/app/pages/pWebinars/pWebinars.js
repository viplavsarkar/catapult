var HomePageType    = require('../../presenter/pGenerateHomePage.js');
var Comp            = require('../../../core/utility/dComponent.js');
var async = require("async");
//var winston = require('winston');

var PCourses = function(req, res, next){
    this.req    = req;
    this.res    = res;
    this.next   = next;

    this.controller = '';
    this.presenter  = new HomePageType(req, res ,next);
    this.template   = '';
    this.components = [];
    this.pageData   = {};
};



PCourses.prototype.getScreen = function(){
    var _ = this;

    var hUnitTestData = require('../../../core/helper/hUnitTestData.js');
    var hTestData = new hUnitTestData();

    //set the template to use
    _.template = 'tWebinars.ejs';
    
    //add the header
    var componentCourseList     = new Comp('cHeader_header.jsx', hTestData.getTestDataHeader("webinars"));    
    _.components.push(componentCourseList.ToJson());

    //add the react component to add in the page
    var componentCourseList     = new Comp('cWebinars_testList.jsx', hTestData.getTestDataForWebinars());    
    _.components.push(componentCourseList.ToJson());

    //add the footer
    var componentCourseList     = new Comp('cFooter_footer.jsx', hTestData.getTestDataFooter());
    _.components.push(componentCourseList.ToJson());

    _.pageData = hTestData.getPageData(); 

    //calling the generate page after the components were obtained asynchronously and collected by this point.   
    _.generatePage();
}

PCourses.prototype.generatePage = function(){
    var _this = this;
    //winston.info("PCourses:getCoursesScreen()", {url:this.controller, page:'pCourse.js', components:['cCourseList.jsx']});
    _this.presenter.controller = _this.controller;
    _this.presenter.getCoursesScreenActual(_this.template, _this.components, _this.pageData);
}

module.exports = PCourses;