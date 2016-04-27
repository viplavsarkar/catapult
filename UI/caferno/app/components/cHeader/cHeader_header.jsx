var isNode = typeof module !== 'undefined' && module.exports
  , React = isNode ? require('react') : window.React
  , ReactDOM = isNode ? require('react-dom') : window.ReactDOM
  , ReactIntl = isNode ? require('react-intl') : window.ReactIntl;


var IntlMixin = ReactIntl.IntlMixin;
var FormattedMessage = ReactIntl.FormattedMessage;
var FormattedDate = ReactIntl.FormattedDate;

var HeaderLogo = React.createClass({
    render: function () {
        var data = this.props.data;
        var logo = "asset/image/logo.jpg";
        return (
            <figure className="logo">
                <img src={logo} alt={data.academyName} />
            </figure>
        );
    }
});

Array.prototype.remove = function(elem, all) {
  for (var i=this.length-1; i>=0; i--) {
    if (this[i] === elem) {
        this.splice(i, 1);
        if(!all)
          break;
    }
  }
  return this;
};

var NavigationLink = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        var data = this.props.data;
        if (data.isActive) {
            data.classes.remove('active');
            data.classes.push('active');
        }
        var classNames = data.classes.join(' ');

        return (
            <li className={classNames}>
                <a href={data.url}>{this.getIntlMessage(data.keyName)}</a>
            </li>
        );
    }
});
var navLinks = [
                {"key":11, "id": 0, "keyName": "discover", "classes": [], "url": "/home", "isActive": false },
                {"key":12, "id": 1, "keyName": "courses", "classes": [], "url": "/publiccourse", "isActive": false },
                {"key":13, "id": 1, "keyName": "webinars", "classes": [], "url": "/webinars", "isActive": false },
                {"key":14, "id": 2, "keyName": "mobileApp", "classes": [], "url": "/mobile", "isActive": false },
                {"key":15, "id": 3, "keyName": "contactUs", "classes": [], "url": "/contactus", "isActive": false },
                {"key":16, "id": 4, "keyName": "signIn", "classes": ["cta", "wired"], "url": "/SignIn", "isActive": false }
            ];

var HeaderNavigation = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        var data = this.props.data;
        var navigationItems = data.map(function (navigationItem) {
            return (
                <NavigationLink key={navigationItem.key} data={navigationItem} />
            );
        });

        return (
            <ul className="pageHeadNav clearfix">
                {navigationItems}
            </ul>
        );
    }
});

var Header = React.createClass({
    mixins: [IntlMixin],
    onclickhandler: function(ev){
        alert('this is header');
    },
    render: function () {
        var data = this.props.data;
        return (
            <header id="pageHeader" className="moduleBody">
                <div onClick={this.onclickhandler} className="moduleWrapper clearfix">
                    <HeaderLogo data={data.academy} />                   
                    <HeaderNavigation data={navLinks} />
                </div>
            </header>
        );
    }
});

if (isNode) {
    module.exports = Header; 
} else {
    window.Section = Header;
}