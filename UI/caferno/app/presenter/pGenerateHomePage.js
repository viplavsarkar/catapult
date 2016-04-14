
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
    params.localeData = thisObj.setLocales(localeJson);
    for(var i=0; i< components.length;i++){
        var eachComponent = components[i];
        var props = eachComponent.rawdata;
        var componentParentPath = eachComponent.component_path ? eachComponent.component_path + '/' : '';
        var componentPath = componentParentPath + eachComponent.component;
        var component = '../components/' + componentPath;
        var componentName = eachComponent.component.split('.')[0];
        var var_pagedata = 'var_' +componentName;
        var dataOfComponent = "data_of_" + eachComponent.name;
        var JSXcourses = thisObj.React.createFactory(require(component));    
        var dataAndLocale = { 
                                data:props,
                                messages:localeJson.messages,
                                locales: localeJson.locales,
                                formats: localeJson.formats
                            };
     
        params[eachComponent.name] = thisObj.ReactDOMServer.renderToString(JSXcourses(dataAndLocale));
        
        if(eachComponent.loadFromClientSide) {
            //console.log('its true')
            params[dataOfComponent] = thisObj.setDataForJSX(var_pagedata, props)
                                                + thisObj.setJSXScript(componentPath)
                                                + thisObj.setClientSideOfComponent(componentName);
        }else{
            //console.log('its false')
            params[dataOfComponent] = "";
        }
    }
    params.pageData = pageData;
    
    params.RTL_CSS = this.setRTLStyleCss();
    thisObj.res.render(template, params);
    
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