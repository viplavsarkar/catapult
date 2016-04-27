var isNode = typeof module !== 'undefined' && module.exports
  , React = isNode ? require('react') : window.React
  , ReactDOM = isNode ? require('react') : window.ReactDOM

var ListItem = React.createClass({
    onclickhandler: function(ev){

       alert('this is Notifications');
    },
    render: function() {
         return (
            <li className="navItem" onClick={this.onclickhandler}>
                <a href="#">{this.props.iDetail}</a>
            </li>
         );
    }
});
var ListItems = React.createClass({
    render: function(){

    }
});
var NavigationList = React.createClass({
    render: function(){
        var data = this.props.data;
        var listItems = data.map(function(item){
            return (
                    <ListItem iDetail={item.text} />
                )
        });
        return (
            <div id="leftNav">
                <div className="logo">
                    <a href="#"><img src="asset/image/logo.jpg" alt="NIIT" /></a>
                    <div className="switchAcademy"><a href="#">Swith Academy</a></div>
                </div>
                <ul className="navigation">
                    {listItems}
                </ul>
            </div>
            );
    }
});



if (isNode) {
    module.exports = NavigationList;
} else {
    var componentName = 'cCoursesLeftNav';
    var paramName = eval('var_' + componentName);
    ReactDOM.render(<NavigationList data={paramName} />, document.getElementById('leftNavContainer'));
}