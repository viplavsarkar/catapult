var HomePageType    = require('../../presenter/pGenerateHomePage.js');
var Comp            = require('../../../core/utility/dComponent.js');
var CompObj         = require('../../../core/utility/cSCO.js');
var CONST           = require('../../../core/constants/components.js');
var DATA_ACCESS_TYPE  = require('../../../core/constants/componentParams.js');
//var winston = require('winston');

var PSamplePage = function(req, res, next){
    this.req    = req;
    this.res    = res;
    this.next   = next;

    this.controller = '';
    this.presenter  = new HomePageType(req, res ,next);
    this.template   = '';
    this.components = [];
    this.pageData   = {};
};

PSamplePage.prototype.getScreen = function(){
    var Helper          = require('../../../core/utility/hHelper.js');
    var _ = this;
    var academyUrl = global.academy.url;
    var callback =  function(da){_.getScreenComponentsAndData(da)};
    var espId = new Helper(callback).getEspId(academyUrl);
    console.log("espId >");
    console.log(espId);
}

PSamplePage.prototype.getScreenComponentsAndData = function(academyInfo){
    var _ = this;

    var espId = academyInfo.id;
    var academyUrl = academyInfo.subDomainUrl;

    //set the template to use
    _.template = 'tSignUp.ejs';
    
        //add the header
    _.components.push( new CompObj(
                                    CONST.HEADER,   
                                    {subDomainUrl:academyUrl}, 
                                    null, 
                                    {currPage:'signIn'}, 
                                    DATA_ACCESS_TYPE.REQUEST_AND_RAW_DATA                                        
                                ).getComponent()
                        );
  
    //add the react component to add in the page
    _.components.push(new CompObj(CONST.SIGN_UP,            {}).getComponent());
   
    //add the footer
    _.components.push(new CompObj(CONST.FOOTER,             {espId:espId}).getComponent());

    _.pageData = {};

    //calling the generate page after the components were obtained asynchronously and collected by this point.   
    _.generatePage();
}

PSamplePage.prototype.generatePage = function(){
    var _this = this;
    //winston.info("PCourses:getCoursesScreen()", {url:this.controller, page:'pCourse.js', components:['cCourseList.jsx']});
    _this.presenter.controller = _this.controller;
    _this.presenter.getCoursesScreenActual(_this.template, _this.components, _this.pageData);
}

module.exports = PSamplePage;