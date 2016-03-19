var Component = function(component, data, component_path, name){
	 var comp            = {};
    this.component      = component;
    this.component_path = component_path ? component_path : component.split('_')[0];
    this.name           = name ? name : component.split('.')[0];
    this.rawdata        = data;
}

Component.prototype.ToJson = function(){
	var comp            = {};
    comp.component      = this.component;
    comp.component_path = this.component_path;
    comp.name           = this.name;
    comp.rawdata        = this.rawdata;

    return comp;
}
module.exports = Component;