if (typeof window === 'undefined') {
    var React = require('react');
    var ReactDOM = require('react-dom');
    var ReactIntl = require('react-intl');
    var IntlMixin = ReactIntl.IntlMixin;
    var Header = require('./header/Header.jsx');
    var Footer = require('./footer/Footer.jsx');
} else {
    var React = window.React;
    var ReactIntl = window.ReactIntl;
    var IntlMixin = ReactIntl.IntlMixin;
    var Header = window.Header;
    var Footer = window.Footer;
    var Section = window.Section;
}

var App = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        var data = this.props.data;

        return (
            <div>
                <Header data={data.header} />
                <Section data={data.section} />
                <Footer data={data.footer} />
            </div>
        );
    }
});

if (typeof window === 'undefined') {
    module.exports = App;
} else {
    window.App = App;
}