var HomePageType    = require('../../presenter/pGenerateHomePage.js');
var Comp            = require('../../../core/utility/dComponent.js');
var CompObj         = require('../../../core/utility/cSCO.js');
var CONST           = require('../../../core/constants/components.js');
var DATA_ACCESS_TYPE  = require('../../../core/constants/componentParams.js');
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
    var _ = this;
    _.getScreenComponentsAndData(null);
}

PDiscover.prototype.getScreenComponentsAndData = function(someData){
    var _ = this;
    var espId =  global.academy.espId;
    var academyUrl = global.academy.url;
    var dataForHeader = {academy:global.academy, currPage: 'discover'};
  
    //set the template to use
    _.template = 'tDiscover.ejs';
    
    //add the header
    //_.components.push(new CompObj(CONST.HEADER,           {subDomainUrl:academyUrl}, null, {currPage:'discover'}).getComponent());
    _.components.push( new CompObj(
                                        CONST.HEADER,   
                                        {subDomainUrl:academyUrl}, 
                                        'HEADER', 
                                        dataForHeader, 
                                        DATA_ACCESS_TYPE.RAW_DATA_ONLY
                                    ).getComponent()
                        );
    //REQUEST_AND_RAW_DATA                                        
    //add the react component to add in the page
    _.components.push(new CompObj(CONST.DISCOVER_BANNER,    null, null, dataForHeader, DATA_ACCESS_TYPE.RAW_DATA_ONLY).getComponent());
    _.components.push(new CompObj(CONST.DISCOVER,           {espId:espId}, null, null, null).getComponent());
   
    //add the footer
    _.components.push(new CompObj(CONST.FOOTER,             null, null, dataForHeader, DATA_ACCESS_TYPE.RAW_DATA_ONLY).getComponent());

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