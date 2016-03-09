if (typeof window === 'undefined') {
    var React = require('react');
    var ReactIntl = require('react-intl');
    var IntlMixin = ReactIntl.IntlMixin;
    var FormattedMessage = ReactIntl.FormattedMessage;
} else {
    var React = window.React;
    var ReactIntl = window.ReactIntl;
    var IntlMixin = ReactIntl.IntlMixin;
}


var HeaderLogo = React.createClass({
    render: function () {
        var data = this.props.data;

        return (
            <figure className="logo">
                <img src={data.logo} alt={data.academyName} />
            </figure>
        );
    }
});

var NavigationLink = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        var data = this.props.data;
        if (data.isActive) {
            data.classes.push('active');
        }
        var classNames = data.classes.join(' ');

        return (
            <li className={classNames}>
                <a href={data.url}>{this.getIntlMessage('header.headerNavigation.navigationItems.' + data.keyName)}</a>
            </li>
        );
    }
});

var HeaderNavigation = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        var data = this.props.data;
        var navigationItems = data.navigationItems.map(function (navigationItem) {
            return (
                <NavigationLink data={navigationItem} />
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
    render: function () {
        var data = this.props.data;

        

        return (
            <header id="pageHeader" className="moduleBody">
                <div className="moduleWrapper clearfix">
                    <HeaderLogo data={data.header} />
                    <HeaderNavigation data={data.headerNavigation} />
                </div>
            </header>
        );
    }
});

if (typeof window === 'undefined') {
    module.exports = Header;
} else {
    window.Header = Header;
}