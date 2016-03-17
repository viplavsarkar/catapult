
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
    for(var i=0; i< components.length;i++){
        var eachKeyVal = components[i];
        var props = eachKeyVal.rawdata;
        var componentParentPath = eachKeyVal.component_path ? eachKeyVal.component_path + '/' : '';
        var componentPath = componentParentPath + eachKeyVal.component;
        var component = '../components/' + componentPath;
        var var_pagedata = 'var_' + eachKeyVal.component.split('.')[0];
        var JSXcourses = thisObj.React.createFactory(require(component));    
        var languageJson = { 
                            data:props,
                            messages: global.messages[global.language],
                            //locales: global.language.culture,
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
        
        params[eachKeyVal.name] = thisObj.ReactDOMServer.renderToString(
                                                JSXcourses({
                                                            data:props,
                                                            locales: global.language.culture,
                                                            messages: global.messages[global.language],
                                                            formats: {
                                                                    "date": {
                                                                        "short": {
                                                                            "day": "numeric",
                                                                            "month": "long",
                                                                            "year": "numeric"
                                                                        }
                                                                    }
                                                                }
                                                            })          
                                                                        )
                                                + thisObj.setDataForBundleJs(var_pagedata, props)
                                                + thisObj.setBundleScript(componentPath)
                                                + thisObj.setLocales(languageJson);
    }
    params.pageData = pageData;
    thisObj.res.render(template, params);
    
}

Helper.prototype.setLocales1 = function(languageJson){
    return "<script type='text/javascript'>var MESSAGES=JSON.parse('"+JSON.stringify(languageJson)+"')</script>";
}

Helper.prototype.setLocales6 = function(languageJson){
    return "<script type='text/javascript'>var BIFROST_APP_PROPS=JSON.parse('"+JSON.stringify(languageJson)+"')</script>";
}

Helper.prototype.setLocales = function(languageJson){ 
    var str = '';
        str += "<script type='text/javascript'>var localkk='"+JSON.stringify(languageJson.locales)+"'</script>"; 
        str += "<script type='text/javascript'>var formkk=JSON.parse('"+JSON.stringify(languageJson.formats)+"')</script>"
        str += "<script type='text/javascript'>var messkk=JSON.parse('"+JSON.stringify(languageJson.messages)+"')</script>"
        str += "<script type='text/javascript'>var datakk=JSON.parse('"+JSON.stringify(languageJson.data)+"')</script>";
    return str;

}

Helper.prototype.setDataForBundleJs = function(varName, props){
    return "<script>"+varName+"="+ JSON.stringify(props)+"</script>";
};

Helper.prototype.setBundleScript = function(component){
    //console.log('deployment mode =' + global.env + ' component=' + component);
    //if(global.eng=='dev'){    
        return '<script src="'+component+'" type="text/babel"></script>';
    //} else {
        //return '<script src="'+ this.controller +'/bundle.js" type="text/babel"></script>';
    //}
};


module.exports = Helper;