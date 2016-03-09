var config = require('../config/config');
var path = require('path');
var React = require('react');
var ReactDOMServer = require('react-dom/server');

function Page() {
    return this;
}

Page.prototype.getScriptTags = function (scripts) {
    
}

Page.prototype.prepareAppProps = function (section) {
    var appProps = {
        data: {
            header: {
                header: {
                    academyName: "Learn Desk",
                    logo: "/asset/image/logo.jpg"
                },
                headerNavigation: {
                    navigationItems: [
                        { key: 0, keyName: "discover", classes: [], url: '#', isActive: true },
                        { key: 1, keyName: "courses", classes: [], url: '#', isActive: false },
                        { key: 2, keyName: "mobileApp", classes: [], url: '#', isActive: false },
                        { key: 3, keyName: "contactUs", classes: [], url: '#', isActive: false },
                        { key: 4, keyName: "signIn", classes: ['cta', 'wired'], url: '#', isActive: false }
                    ]
                }
            },
            footer: {
                academyName: "WizIQ",
                logo: "/asset/image/wiziq.png"
            },
            section: section,
        },
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
    };

    return appProps;
}

Page.prototype.preparePageHtml = function (section, appProps) {
    var Header = React.createFactory(require(path.join(config.components, 'header', 'Header.jsx')));
    var Footer = React.createFactory(require(path.join(config.components, 'footer', 'Footer.jsx')));
    var Section = React.createFactory(require(path.join(config.components, section)));

    var headerHtml = ReactDOMServer.renderToString(Header({
        data: appProps.data.header,
        locales: appProps.locales,
        messages: appProps.messages
    }));

    var footerHtml = ReactDOMServer.renderToString(Footer({
        data: appProps.data.footer,
        locales: appProps.locales,
        messages: appProps.messages
    }));

    var sectionHtml = ReactDOMServer.renderToString(Section({
        data: appProps.data.section,
        locales: appProps.locales,
        messages: appProps.messages,
        formats: appProps.formats
    }));

    return headerHtml + sectionHtml + footerHtml;
}

Page.prototype.prepareAndSendResponse = function (res, section, sectionData, template) {
    if (template === undefined || !template.length) {
        template = 'default';
    }

    var APP_PROPS = this.prepareAppProps(sectionData);
    var pageHtml = this.preparePageHtml(section, APP_PROPS);

    res.setHeader('Content-Type', 'text/html');
    res.render(path.join(config.views, template),
        {pageHtml: pageHtml, APP_PROPS: JSON.stringify(APP_PROPS)});
}

module.exports = Page;