var HomePageType    = require('../../presenter/pGenerateHomePage.js');
var Comp            = require('../../../core/utility/dComponent.js');
var winston = require('winston');

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

//reserved for bundle.js
PCourses.prototype.getBundle = function(){
    console.log('BCourses:getBundle()');
    console.log('bundle.js is on the way...');
    var thisObj = this;
    thisObj.res.setHeader('Content-Type', 'text/javascript');
    console.log(__dirname);
    var parentDir = __dirname.substring(0, __dirname.lastIndexOf('\\'));
    thisObj.res.sendFile('../components/cCourses.jsx',{root: parentDir });
}

PCourses.prototype.getCoursesScreen = function(){
    var thisObj = this;

    var hUnitTestData = require('../../../core/helper/hUnitTestData.js');
    var hTestData = new hUnitTestData();

    this.template = 'tCourseList.ejs';
    
    var componentCourseList     = new Comp('cCourses.cCourseList.jsx', hTestData.getTestDataCourseList());
    thisObj.components.push(componentCourseList.ToJson());    

    thisObj.pageData = hTestData.getPageData();    
    thisObj.generatePage();
}

PCourses.prototype.generatePage = function(){
    var _this = this;
    //winston.info("PCourses:getCoursesScreen()", {url:this.controller, page:'pCourse.js', components:['cCourseList.jsx']});
    _this.presenter.controller = _this.controller;
    _this.presenter.getCoursesScreenActual(_this.template, _this.components, _this.pageData);
}



PCourses.prototype.getCoursesScreenNew = function(){
    var thisObj = this;
    var HomePage = new HomePageType(thisObj.req, thisObj.res ,thisObj.next);
    var hUnitTestData = require('../../../core/helper/hUnitTestData.js');
    var hTestData = new hUnitTestData();
    var pageData = hTestData.getPageData();
    var template = 'courses.ejs';
    var components = [
                        {
                            component_path: 'cCourses',
                            component : 'cCourses.jsx',
                            name : 'reactOutput',
                            rawdata :  hTestData.getTestData()
                        },
                        {   

                            component_path: 'cCourses',
                            component : 'cCoursesLeftNav.jsx',
                            name : 'leftNavOutput',
                            rawdata :  hTestData.getTestDataNavList()
                        }
                    ];
    //console.log('this is PCourses:getCoursesScreenActual footage');
    winston.info("PCourses:getCoursesScreenNew()", {url:this.controller, page:'pCourse.js', components:['cCourses.jsx', 'cCoursesLeftNav.jsx']});
    HomePage.controller = this.controller;
    HomePage.getCoursesScreenActual(template, components, pageData);
}


module.exports = PCourses;