
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

        params[eachKeyVal.name] = thisObj.ReactDOMServer.renderToString(JSXcourses({data:props})) 
                                                + thisObj.setDataForBundleJs(var_pagedata, props)
                                                + thisObj.setBundleScript(componentPath);
    }
    params.pageData = pageData;
    thisObj.res.render(template, params);
    
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