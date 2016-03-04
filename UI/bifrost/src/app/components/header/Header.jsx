var React = require('react');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;
var FormattedMessage = ReactIntl.FormattedMessage;

var data = {
    academyName: "Learn Desk",
    logo: "asset/image/logo.jpg",
    headerNavigation: {
        navigationItems: [
            { id: 0, keyName: "discover", classes: [], url: '#', isActive: true },
            { id: 1, keyName: "courses", classes: [], url: '#', isActive: false },
            { id: 2, keyName: "mobileApp", classes: [], url: '#', isActive: false },
            { id: 3, keyName: "contactUs", classes: [], url: '#', isActive: false },
            { id: 4, keyName: "signIn", classes: ['cta', 'wired'], url: '#', isActive: false }
        ]
    }
};


class HeaderLogo extends React.Component {
    render() {
        var data = this.props.data;

        return (
            <figure className="logo">
                <img src={data.logo} alt={data.academyName} />
            </figure>
        );
    }
}

class NavigationLink extends React.Component {
    render() {
        var data = this.props.data;
        if (data.isActive) {
            data.classes.push('active');
        }
        var classNames = data.classes.join(' ');

        return (
            <li className={classNames}>
                <a href={data.url}>
                    {this.getIntlMessage('header.headerNavigation.navigationItems.' + data.keyName)}
                </a>
            </li>
        );
    }
}

class HeaderNavigation extends React.Component {
    render() {
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
}

class Header extends React.Component {
    render() {
        var data = this.props.data;
        return (
            <div className="moduleWrapper clearfix">
                <HeaderLogo data={data.header} />
                <HeaderNavigation data={data.headerNavigation} />
            </div>
        );
    }
}