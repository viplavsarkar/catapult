/*if (typeof window === 'undefined') {
    var React = require('react');
    var ReactIntl = require('react-intl');
    var IntlMixin = ReactIntl.IntlMixin;
    var FormattedMessage = ReactIntl.FormattedMessage;
} else {
    var React = window.React;
}
*/

var isNode = typeof module !== 'undefined' && module.exports
  , React = isNode ? require('react') : window.React
  , ReactDOM = isNode ? require('react-dom') : window.ReactDOM
  , ReactIntl = isNode ? require('react-intl') : window.ReactIntl;


var IntlMixin = ReactIntl.IntlMixin;
var FormattedMessage = ReactIntl.FormattedMessage;
var FormattedDate = ReactIntl.FormattedDate;

var Footer = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        var data = this.props.data;

        return (
            <footer id="pageFooter" className="moduleBody">
                <div className="moduleWrapper clearfix">
                    <div className="col-1">
                        <p>{this.getIntlMessage('learnOnTheGo')}.</p>
                        <h4>{this.getIntlMessage('anytime')}. {this.getIntlMessage('anywhere')}.</h4>
                    </div>
                    <ul className="appPlatform col-2 clearfix">
                        <li className="ios">
                            <a href={data.urlOfAppleStore} target="_blank">
                                {this.getIntlMessage('availableOn')}
                                <span className="os">{this.getIntlMessage('appStore')}</span>
                            </a>
                        </li>
                        <li className="android">
                            <a href={data.urlOfAndroidStore} target="_blank">
                                {this.getIntlMessage('downloadFor')}
                                <span className="os">{this.getIntlMessage('android')}</span>
                            </a>
                        </li>
                    </ul>
                    <div className="col-3">
                        <figure className="clearfix">
                            <img src={data.academy.logo} alt={data.academy.name} />
                            <figcaption>{this.getIntlMessage('poweredBy')}</figcaption>
                        </figure>
                    </div>
                </div>
            </footer>
        );
    }
});

if (isNode) {
    module.exports = Footer;
} else {
    window.Section = Footer;
/*
    var componentName = 'cFooter_footer';

    var dataName = eval('var_' + componentName);
    var dakk = eval('datakk');
    var lokk = eval('localkk')
    var mekk = eval('messkk');
    var fokk = eval('formkk');

    //BIFROST_APP_PROPS
    ReactDOM.render(<Footer data={dataName} messages={mekk} formats={fokk} locales={lokk} />, document.getElementById('container_'+componentName));
    //ReactDOM.render(<Section data={paramName} locales={LOCALES} {...MESSAGES} formats={FORMATS}/>, document.getElementById('pageWrapper'));
    //ReactDOM.render(<Section {...BIFROST_APP_PROPS}/>, document.getElementById('pageWrapper'));
*/
}