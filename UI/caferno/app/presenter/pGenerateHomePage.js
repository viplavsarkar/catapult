require('babel-core/register');

var async = require("async");
var httpHandler = require('../../core/http/httpHandler.js');

var Helper = function(req, res, next){
	this.req    = req;
    this.res    = res;
    this.next   = next;

	this.React = require('react');
	this.ReactDOMServer = require('react-dom/server');
	this.controller = '';

    this.template   = '';
    this.components = [];
    this.pageData   = {};
}

Helper.prototype.getScreenData = function(reqArr){
    var _ = this;
  
    async.parallel(reqArr, function(err, data){
            if(err){
                console.log('err = ')
                console.log(err)
            }
            console.log('all the methods have been called');
            for(var i = 0; i < _.components.length; i++){
                _.components[i].rawdata = data[i];
            }
            _.getCoursesScreenActualPage();
        }
    );
}

Helper.prototype.getCoursesScreenActual = function(template, components, pageData){
    var _ = this;
    
    _.template = template;
    _.components =  components;
    _.pageData = pageData;

    var count = components.length;
    var reqArr = [];
    for(var i = 0; i < count; i++){
        var reqObj = components[i].reqObj;
        //console.log('reqObj > ');
        //console.log(reqObj);
        var req = new httpHandler({url: reqObj.url}).getMethodForAsynch("SIMPLE_REST");
        reqArr.push(req);
    }
    _.getScreenData(reqArr);
}

Helper.prototype.getCoursesScreenActualPage = function(){
   
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
                                    }
                                }
                            }
                        };
    params.localeData = _.setLocales(localeJson);
    for(var i=0; i< _.components.length;i++){
        var eachComponent = _.components[i];

        var props = eachComponent.rawdata;
        console.log(eachComponent.varName);
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
            var data =  '<div id="'+compoStr+'">'+_.ReactDOMServer.renderToString(JSXcourses(dataAndLocale))+'</div>';

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
}

Helper.prototype.setLocales = function(languageJson){ 
    var str = '';
        //str += "<link rel='stylesheet/less' type='text/css' href='asset/style/rtlCustom.less'>";
        str += "<script type='text/javascript'>var localkk="+JSON.stringify(languageJson.locales)+"</script>"; 
        str += "<script type='text/javascript'>var formkk=JSON.parse('"+JSON.stringify(languageJson.formats)+"')</script>"
        str += "<script type='text/javascript'>var messkk=JSON.parse('"+JSON.stringify(languageJson.messages)+"')</script>";

        //str += "<script type='text/javascript' src='/asset/script/main.js'></script>";
    return str;
}

Helper.prototype.setDataForJSX = function(varName, props){
    return "<script>"+varName+"="+ JSON.stringify(props)+"</script>";
};

Helper.prototype.setJSXScript = function(component){
        return '<script src="/'+component+'" type="text/babel"></script>';   
};

Helper.prototype.setClientSideOfComponent = function(componentName){
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

Helper.prototype.setClientSideOfComponent_old = function(componentName){
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

Helper.prototype.setRTLStyleCss = function(){
    var rtlCssString = '';
    if(global.language){
        if(global.language.isRTL){
            rtlCssString = '<link rel="stylesheet/less" type="text/css" href="/asset/style/rtlCustom.less">';
        }
    }
    return rtlCssString;
}

module.exports = Helper;