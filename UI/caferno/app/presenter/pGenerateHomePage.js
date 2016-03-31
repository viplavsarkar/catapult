
require('babel-core/register');

var Helper = function(req, res, next){
	this.req    = req;
    this.res    = res;
    this.next   = next;

	this.React = require('react');
	this.ReactDOMServer = require('react-dom/server');
	this.controller = '';
}

Helper.prototype.getCoursesScreenActual = function(template, components, pageData){
   
    var thisObj = this; 
   
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
    for(var i=0; i< components.length;i++){
        var eachKeyVal = components[i];
        var props = eachKeyVal.rawdata;
        var componentParentPath = eachKeyVal.component_path ? eachKeyVal.component_path + '/' : '';
        var componentPath = componentParentPath + eachKeyVal.component;
        var component = '../components/' + componentPath;
        var componentName = eachKeyVal.component.split('.')[0];
        var var_pagedata = 'var_' +componentName;
        var JSXcourses = thisObj.React.createFactory(require(component));    
        var dataAndLocale = { 
                                data:props,
                                messages:localeJson.messages,
                                locales: localeJson.locales,
                                formats: localeJson.formats
                            };
        params[eachKeyVal.name] = thisObj.ReactDOMServer.renderToString(JSXcourses(dataAndLocale))
                                                + thisObj.setDataForBundleJs(var_pagedata, props)
                                                + thisObj.setBundleScript(componentPath)
                                                + thisObj.setClientSideOfComponent(componentName);
    }
    params.pageData = pageData;
    
    params.localeData = thisObj.setLocales(localeJson);
    thisObj.res.render(template, params);
    
}


Helper.prototype.setLocales = function(languageJson){ 
    var str = '';
        str += "<script type='text/javascript'>var localkk="+JSON.stringify(languageJson.locales)+"</script>"; 
        str += "<script type='text/javascript'>var formkk=JSON.parse('"+JSON.stringify(languageJson.formats)+"')</script>"
        str += "<script type='text/javascript'>var messkk=JSON.parse('"+JSON.stringify(languageJson.messages)+"')</script>";
        //str += "<script type='text/javascript' src='/asset/script/main.js'></script>";
    return str;

}

Helper.prototype.setDataForBundleJs = function(varName, props){
    return "<script>"+varName+"="+ JSON.stringify(props)+"</script>";
};

Helper.prototype.setBundleScript = function(component){
        return '<script src="/'+component+'" type="text/babel"></script>';   
};

Helper.prototype.setClientSideOfComponent = function(componentName){
    var str = '';
    str += "<script type='text/babel'>";
    str += "var componentName = '"+componentName+"';";// 'cCourses_cCourseList';";
    //str += "var containerName"
    str += "var dataName = eval('var_' + componentName);";
    str += "var lokk = eval('localkk');";
    str += "var mekk = eval('messkk');";
    str += "var fokk = eval('formkk');";
    
    str += "ReactDOM.render(<Section data={dataName} messages={mekk} formats={fokk} locales={lokk} />, document.getElementById('container_'+componentName));";

    str += "</script>"; 
    return str;
};

module.exports = Helper;