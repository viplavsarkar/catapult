var HomePageType = require('../../presenter/pGenerateHomePage.js');
var winston = require('winston');

var PCourses = function(req, res, next){
    this.req    = req;
    this.res    = res;
    this.next   = next;

    this.controller = '';
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
    // console.log('hello===============================z' + global.messages['en-US'].common.sortBy);
    var template = 'tCourseList.ejs';
    var HomePage = new HomePageType(thisObj.req, thisObj.res ,thisObj.next);
    var hUnitTestData = require('../../../core/helper/hUnitTestData.js');
    var hTestData = new hUnitTestData();
    var pageData = hTestData.getPageData();
    var components = [
        {
            component_path: 'cCourses',
            component : 'cCourseList.jsx',
            name : 'cCourseList',
            rawdata :  hTestData.getTestDataCourseList()
        }
    ]; 
    
     //console.log('this is PCourses:getCoursesScreenActual footage');
    winston.info("PCourses:getCoursesScreen()", {url:this.controller, page:'pCourse.js', components:['cCourseList.jsx']});
    HomePage.controller = this.controller;
    HomePage.getCoursesScreenActual(template, components, pageData);

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