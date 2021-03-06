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
        var logo = data.logo;
        var academyName = data.academyName;
        if(!logo){
            //logo = logo.replace('wqimgqe.s3.amazonaws.com','wqimg.authordm.com');
            logo = "//wqimg.authordm.com/data/esp/default-logo.png?635977750540207098";
        }
        //console.log(logo);
        return (
            <figure className="logo">
                <img src={logo} alt={academyName} />
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
        data.classes.remove('active');
        if (data.isActive) {
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
        
        var navigationItems = navLinks.map(function (navigationItem) {
            navigationItem.isActive = false;
            if(navigationItem.keyName === 'webinars'){
                if(data.webinarsExists){}
                else{
                    return null;
                }
            }
            if(navigationItem.keyName === data.currPage){
                navigationItem.isActive = true;
            }
            
            return (
                <NavigationLink key={navigationItem.key} data={navigationItem} />
            );
        });

        return (
            <nav className="pageHeadNavWrap">
                <ul className="pageHeadNav clearfix">
                    {navigationItems}
                </ul>
            </nav>
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
        var headerNavData = {                               
                                currPage: data.currPage,
                                webinarsExists: data.academy.webinar
                            };
        return (
            <header id="pageHeader" className="moduleBody">
                <div onClick={this.onclickhandler} className="moduleWrapper clearfix">
                    <HeaderLogo data={data.academy} />                   
                    <HeaderNavigation data={headerNavData} />
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