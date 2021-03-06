require('babel-core/register');
var async = require("async");
var httpHandler = require('../../core/http/httpHandler.js');
var DATA_ACCESS_TYPE  = require('../../core/constants/componentParams.js');

var PresenterPrelogin = function(req, res, next){
	this.req    = req;
    this.res    = res;
    this.next   = next;

	this.React = require('react');
	this.ReactDOMServer = require('react-dom/server');
	this.controller = '';

    this.template   = '';
    this.components = [];
    this.pageData   = {};
    this.rawdataIndex = [];

    this.renderStart = new Date().getTime();
}

PresenterPrelogin.prototype.getCoursesScreenActual = function(template, components, pageData){
    var _ = this;

    _.template = template;
    _.components =  components;
    _.pageData = pageData;

    var count = _.components.length;
    var reqArr = [];

    for(var i = 0; i < count; i++){
        var dtoForRawDataIndex = {index:i, dataAccessType: _.components[i].dataAccessType};
        if(_.components[i].dataAccessType === DATA_ACCESS_TYPE.RAW_DATA_ONLY){
            //do nothing
            
            //for debugging
            //console.log(components[i].rawdata);
        }else{
            _.rawdataIndex.push(dtoForRawDataIndex);
            var reqObj = _.components[i].reqObj;          
            var req = new httpHandler({url: reqObj.url}).getMethodForAsynch("SIMPLE_REST");
            reqArr.push(req);
        }
    }
    _.getScreenData(reqArr);
}

PresenterPrelogin.prototype.getScreenData = function(reqArr){
    var _ = this;

    async.parallel(reqArr, function(err, data){
            if(err){                
                return _.next(err);
            }
            console.log('all the methods have been called');
            for(var i = 0; i < _.rawdataIndex.length; i++){
                var index = _.rawdataIndex[i].index;
                var dataAccessType = _.rawdataIndex[i].dataAccessType;
                if(dataAccessType === DATA_ACCESS_TYPE.REQUEST_ONLY){
                    _.components[index].rawdata = data[i];
                }else if(dataAccessType === DATA_ACCESS_TYPE.REQUEST_AND_RAW_DATA){
                    var tempData = _.components[index].rawdata;
                    for(var key in tempData){
                        var val = tempData[key];
                        if(data[i]){
                            data[i][key] = val;
                        }
                    }
                    _.components[index].rawdata = data[i];
                }else if(dataAccessType === DATA_ACCESS_TYPE.RAW_DATA_ONLY){
                    //log error
                    var inValidCompositionException = new Error('Invalid composition. Please contact your vendor.');
                    inValidCompositionException.status = 505;
                    return _.next(inValidCompositionException);
                }
            }
            _.generateScreenFromComponents();
        }
    );
}

PresenterPrelogin.prototype.generateScreenFromComponents = function(){

    var _ = this;

    var params = {};
    var localeJson = {
                        messages: global.messages[global.language],
                        locales: global.language.culture,
                        formats: {
                                "date": {
                                    "short": {
                                        "day": "numeric",
                                        "month": "long",
                                        "year": "numeric"
                                    },
                                    "webinars": {
                                        'weekday': 'long',
                                        'day': '2-digit',
                                        'month': 'short',
                                        'year': '2-digit',
                                        'hour': 'numeric',
                                        'minute': 'numeric',
                                        'timeZoneName': 'long'
                                    }
                                }
                            },
                        currency: global.academy.curr
                        };
    params.localeData = _.setLocales(localeJson);
    for(var i=0; i< _.components.length;i++){
        var eachComponent = _.components[i];

        var props = eachComponent.rawdata;
        if (props)
            props.srcUrl = eachComponent.reqObj.url;

        //console.log(eachComponent.name);
        var componentParentPath = eachComponent.component_path ? eachComponent.component_path + '/' : '';
        var componentPath = componentParentPath + eachComponent.component;
        var component = '../components/' + componentPath;
        var componentName = eachComponent.component.split('.')[0];
        var var_pagedata = 'var_' +componentName;
        var compoStr = 'container_' + componentName;
        var dataOfComponent = "data_of_" + eachComponent.name;
        var JSXcourses = _.React.createFactory(require(component));
        var dataAndLocale = {
                                data:props,
                                messages:localeJson.messages,
                                locales: localeJson.locales,
                                formats: localeJson.formats
                            };
        //if(eachComponent.compId === 'HEADER'){
            //var data =  '<div id="'+compoStr+'">'+_.ReactDOMServer.renderToString(JSXcourses(dataAndLocale))+'</div>';
            //console.log(eachComponent.compId)
            var clientSideData =  "";
            if(eachComponent.loadFromClientSide) {
                clientSideData =  _.setDataForJSX(var_pagedata, props)
                                    + _.setJSXScript(componentPath)
                                    + _.setClientSideOfComponent(componentName);
            }

            params[eachComponent.compId] =   '<div id="'+compoStr+'">'
                                            +   _.ReactDOMServer.renderToString(JSXcourses(dataAndLocale))
                                            +'</div>'
                                            + '<div>'
                                            +   clientSideData
                                            + '</div>';
        /*}else{
            params[eachComponent.name] = _.ReactDOMServer.renderToString(JSXcourses(dataAndLocale));

            if(eachComponent.loadFromClientSide) {
                params[dataOfComponent] = _.setDataForJSX(var_pagedata, props)
                                                    + _.setJSXScript(componentPath)
                                                    + _.setClientSideOfComponent(componentName);
            }else{
                params[dataOfComponent] = "";
            }
        }
        */
    }
    params.pageData = _.pageData;

    params.RTL_CSS = this.setRTLStyleCss();
    _.res.render(_.template, params);

    var dateTimeNow = new Date();
    var endTime = dateTimeNow.getTime();
    //console.log(dateTimeNow + '(' + endTime + ')');

    var timeTaken = endTime - _.renderStart;
    //console.log('('+timeTaken+' miliseconds)');
    console.log();
    //console.log(_.req)
    console.log('#############    PAGE RENDERED IN : ('+timeTaken+' miliseconds)');
    console.log();
}

PresenterPrelogin.prototype.setLocales = function(languageJson){
    var str = '';
        //str += "<link rel='stylesheet/less' type='text/css' href='asset/style/rtlCustom.less'>";
        str += "<script type='text/javascript'>var localkk="+JSON.stringify(languageJson.locales)+"</script>";
        str += "<script type='text/javascript'>var formkk=JSON.parse('"+JSON.stringify(languageJson.formats)+"')</script>"
        str += "<script type='text/javascript'>var messkk=JSON.parse('"+JSON.stringify(languageJson.messages)+"')</script>";
        str += "<script type='text/javascript'>var currency=JSON.parse('"+JSON.stringify(languageJson.currency)+"')</script>";

        //str += "<script type='text/javascript' src='/asset/script/main.js'></script>";
    return str;
}

PresenterPrelogin.prototype.setDataForJSX = function(varName, props){
    return "<script>"+varName+"="+ JSON.stringify(props)+"</script>";
};

PresenterPrelogin.prototype.setJSXScript = function(component){
        return '<script src="/'+component+'" type="text/babel"></script>';
};

PresenterPrelogin.prototype.setClientSideOfComponent = function(componentName){
    var str = '';
    str += "<script type='text/babel'>";
    var dataName = 'var_' + componentName;
    var compoStr = 'container_' + componentName;
    var secString = 'Section';

    str += "ReactDOM.render(<"+secString+" data={"+dataName+"}";
    str += " messages={messkk} formats={formkk} locales={localkk}/>,"+compoStr+");";
    str += "</script>";

    return str;
};

PresenterPrelogin.prototype.setClientSideOfComponent_old = function(componentName){
    var str = '';
    str += "<script type='text/babel'>";
    str += "var componentName = '"+componentName+"';";// 'cCourses_cCourseList';";
    //str += "var containerName"
    str += "var dataName = eval('var_' + componentName);";
    str += "var lokk = eval('localkk');";
    str += "var mekk = eval('messkk');";
    str += "var fokk = eval('formkk');";

    str += "ReactDOM.render(<Section data={dataName} messages={mekk} formats={fokk} locales={lokk}/>, document.getElementById('container_'+componentName));";

    str += "</script>";

    return str;
};

PresenterPrelogin.prototype.setRTLStyleCss = function(){
    var rtlCssString = '';
    if(global.language){
        if(global.language.isRTL){
            rtlCssString = '<link rel="stylesheet/less" type="text/css" href="/asset/style/rtlCustom.less">';
        }
    }
    return rtlCssString;
}

module.exports = PresenterPrelogin;