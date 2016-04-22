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


var request         = require('request');

/*
        function(callback){
            
        }
        function(cbr){
            console.log(cbr)
            console.log('calling cb')
            cbr(url, dto);
            console.log('called cb')
            //,
            //_.GETDATA(callback,url2, dtoHeader)
        }
*/
PCourses.prototype.callbackone = function(err,param,callback){
    console.log('this is callback');
    //callback(null,1);
    //console.log(err + 'hi');
   // _.GETDATA(url, dto);
   if(param){console.log('param  EXITS = ' + param)}
    else console.log('param does not exists')
    console.log('callback called');

}
var httpHandler = require('../../../core/http/httpHandler.js');

PCourses.prototype.getScreen_OLD = function(){
    var _ = this;
    var url = 'http://192.168.17.175:8070/v1/courses?espid=272';
    var url1 = 'http://192.168.17.145/catapultui/data/getTestDataHeader.txt';
    var url2 = 'http://192.168.17.145/catapultui/data/getTestDataFooter.txt';
    var url3 = 'http://192.168.17.145/catapultui/data/getTestDataCourseList.txt';
    //var reqOne = new httpHandler({url: url1}, callback);
    //var abc = new httpHandler({url: url1});

    //var abc = new httpHandler({url: url1});
    //var xyz = abc.SIMPLE_REST();
    async.parallel([
            new httpHandler({url: url1}).getMethodForAsynch("SIMPLE_REST"),
            //new httpHandler({url: url1}).getMethodForAsynch(),
           /* function(callback){
                console.log('hello Header');              
                 //_.SIMPLE_REST(url1, callback);
                 new httpHandler({url: url1}, callback).SIMPLE_REST();
            },*/
            function(callback){
                console.log('hello Footer');
                 _.SIMPLE_REST(url2, callback);             
            },
            function(callback){
                console.log('hello Courselist');
                _.SIMPLE_REST(url3, callback);
            }  
        ], function(err, data){
            if(err){
                console.log('err = ')
                console.log(err)
            }
            console.log('all the methods have been called');
            _.getCourseListData(data[0], data[1], data[2]);
        }
    ); 
}
PCourses.prototype.getScreen = function(){
    var _ = this;
    var url = 'http://192.168.17.175:8070/v1/courses?espid=272';
    var url1 = 'http://192.168.17.145/catapultui/data/getTestDataHeader.txt';
    var url2 = 'http://192.168.17.145/catapultui/data/getTestDataFooter.txt';
    var url3 = 'http://192.168.17.145/catapultui/data/getTestDataCourseList.txt';
  
    async.parallel([
            new httpHandler({url: url1}).getMethodForAsynch("SIMPLE_REST"),           
            new httpHandler({url: url2}).getMethodForAsynch("SIMPLE_REST"),           
            new httpHandler({url: url3}).getMethodForAsynch("SIMPLE_REST"),           
            
        ], function(err, data){
            if(err){
                console.log('err = ')
                console.log(err)
            }
            console.log('all the methods have been called');
            _.getCourseListData(data[0], data[1], data[2]);
        }
    ); 
}
PCourses.prototype.functionzero = function(callback){
                console.log('hello 0');
                //console.log(this)
                //_.callbackone(null,'heman',callback);
                callback(null,10);

                 //callbackone(null,'he');
                //cbr.apply(_,[null, 'he']);
            };
PCourses.prototype.functionOne = function(err, data, callback){
    var _ = this;
    console.log('this is function one');
    callback(null,data);
   
}
PCourses.prototype.functionTwo = function(callback){
    var _ = this;
    console.log('this is function tow');
    //_.callback('PARMAR');
    //return;
}

PCourses.prototype.SIMPLE_REST = function(url, callback){
    
    var dateTimeNow = new Date();
    var startTime = new Date().getTime();
    console.log(dateTimeNow + '(' + startTime + ')');
    console.log('REQUEST > ' + url);
    console.log();
    var _ = this;
    request({
        url: url, 
        qs: {from: 'caferno', time: +new Date()}, 
        method: 'GET', 
        headers: { 
            'Content-Type': 'MyContentType',
            'Custom-Header': 'Custom Value'
        }
    }, function(error, response, body){
        if(error) {
            console.log(error);
            callback(error);
            return;
        } else {
            
            console.log('RESPONSE: ' + url);
            var dateTimeNow = new Date();
            var endTime = dateTimeNow.getTime();
            console.log(dateTimeNow + '(' + endTime + ')');

            var timeTaken = endTime - startTime;
            console.log('('+timeTaken+' miliseconds)');
            console.log();
            //console.log(response.statusCode, body);
            var bodyObj = JSON.parse(body);

            callback(null, bodyObj.data);          
        }
    });
}

PCourses.prototype.getCourseListData = function(headerData, footerData, courseListData){
    var _ = this;

    var hUnitTestData = require('../../../core/helper/hUnitTestData.js');
    var hTestData = new hUnitTestData();

    //set the template to use
    _.template = 'tCourseList.ejs';
    
    //add the header
    //var componentCourseList     = new Comp('cHeader_header.jsx', hTestData.getTestDataHeader("courses"), false);    
    var componentCourseList     = new Comp('cHeader_header.jsx', headerData, false, null, null, 
            {
                url:'http://192.168.17.145/catapultui/data/getTestDataCourseList.txt'
            } 
        );
    _.components.push(componentCourseList);

    //add the react component to add in the page
    //console.log(hTestData.getTestDataCourseList());
    //var componentCourseList     = new Comp('cCourses_cCourseList.jsx', hTestData.getTestDataCourseList(), false);  
    //console.log(datalist);  
    var componentCourseList     = new Comp('cCourses_cCourseList.jsx', courseListData , false, null, null, {});
    _.components.push(componentCourseList);

    //add the footer
    //var componentCourseList     = new Comp('cFooter_footer.jsx', hTestData.getTestDataFooter(), false, null, null, {});
    var componentCourseList     = new Comp('cFooter_footer.jsx', footerData, false, null, null, {});
    _.components.push(componentCourseList);

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