var HomePageType    = require('../../presenter/pGenerateHomePage.js');
var Comp            = require('../../../core/utility/dComponent.js');
var CompObj         = require('../../../core/utility/cSCO.js');
var CONST           = require('../../../core/constants/components.js');
//var winston = require('winston');

var PDiscover = function(req, res, next){
    this.req    = req;
    this.res    = res;
    this.next   = next;

    this.controller = '';
    this.presenter  = new HomePageType(req, res ,next);
    this.template   = '';
    this.components = [];
    this.pageData   = {};
};

PDiscover.prototype.getScreen = function(){
    var Helper          = require('../../../core/utility/hHelper.js');
    var _ = this;
    var academyUrl = "preportal.wiziq.authordm.com";
    academyUrl = "kabza.wiziq.authordm.com";
    academyUrl = "newjon.wiziq.authordm.com";
    academyUrl = global.academy.url;
    var callback =  function(da){_.getScreenComponentsAndData(da)};
    var espId = new Helper(callback).getEspId(academyUrl);
    console.log("espId >");
    console.log(espId);
}

PDiscover.prototype.getScreenComponentsAndData = function(academyInfo){
    var _ = this;

    var hUnitTestData = require('../../../core/helper/hUnitTestData.js');
    var hTestData = new hUnitTestData();

    var espId = academyInfo.id;

    //set the template to use
    _.template = 'tDiscover.ejs';
    
        //add the header
    _.components.push(new CompObj(CONST.HEADER,             {espId:espId}, null).getComponent());
  
    //add the react component to add in the page
    _.components.push(new CompObj(CONST.DISCOVER_BANNER,    {espId:espId}).getComponent());
    _.components.push(new CompObj(CONST.DISCOVER,           {espId:espId}).getComponent());
   
    //add the footer
    _.components.push(new CompObj(CONST.FOOTER,             {espId:espId}).getComponent());

    _.pageData = {};

    //calling the generate page after the components were obtained asynchronously and collected by this point.   
    _.generatePage();
}

PDiscover.prototype.generatePage = function(){
    var _this = this;
    //winston.info("PCourses:getCoursesScreen()", {url:this.controller, page:'pCourse.js', components:['cCourseList.jsx']});
    _this.presenter.controller = _this.controller;
    _this.presenter.getCoursesScreenActual(_this.template, _this.components, _this.pageData);
}

module.exports = PDiscover;