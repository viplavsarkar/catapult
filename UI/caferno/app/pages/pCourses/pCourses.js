var async           = require('async');
var url             = require('url');
var HomePageType    = require('../../presenter/pGenerateHomePage.js');
var Comp            = require('../../../core/utility/dComponent.js');
var ORCH            = require('../../../core/http/orchEndPoints.js');
var CompObj         = require('../../../core/utility/cSCO.js');
var CONST           = require('../../../core/constants/components.js');
var httpHandler     = require('../../../core/http/httpHandler.js');
var DATA_ACCESS_TYPE= require('../../../core/constants/componentParams.js');
//var async = require("async");
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
    _.getScreenComponentsAndData(null);
}

PCourses.prototype.getScreenComponentsAndData = function(someData){
    var _this = this;

    var espId =  global.academy.espId;
    var academyUrl = global.academy.url;
    var dataForHeader = {academy:global.academy, currPage: 'discover'};

    //set the template to use
    _this.template = 'tCourseList.ejs';

    //add the header    
    _this.components.push( new CompObj(
                                        CONST.HEADER,   
                                        {subDomainUrl:academyUrl}, 
                                        'HEADER', 
                                        dataForHeader, 
                                        DATA_ACCESS_TYPE.RAW_DATA_ONLY
                                    ).getComponent()
                        );

    _this.components.push(new CompObj(CONST.COURSE_LIST,    {espId:espId}).getComponent());

    _this.components.push(new CompObj(CONST.FOOTER,             null, null, dataForHeader, DATA_ACCESS_TYPE.RAW_DATA_ONLY).getComponent());

    _this.pageData = {};    // hTestData.getPageData();

    //calling the generate page after the components were
    //obtained asynchronously and collected by this point.
    _this.generatePage();
}

PCourses.prototype.generatePage = function(){
    var _this = this;
    //winston.info("PCourses:getCoursesScreen()", {url:this.controller, page:'pCourse.js', components:['cCourseList.jsx']});
    _this.presenter.controller = _this.controller;
    _this.presenter.getCoursesScreenActual(_this.template, _this.components, _this.pageData);
}

PCourses.prototype.getPageJson = function (payload) {
    var _this = this;
    var request = new httpHandler({
            url: ORCH.courseList + 'espId=' + payload.espId + '&page=' + payload.page + '&pageSize=' + payload.pageSize + '&sortField=' + payload.sortField
        });
    request.getMethodForAsynch("SIMPLE_REST")(function (err, data) {
        if (err) {
            console.log(err);
            _this.res.statusCode = 500;
            _this.res.send({
                error: err.toString()
            });
        }
        else {
            _this.res.send(data);
        }
    });
}

module.exports = PCourses;