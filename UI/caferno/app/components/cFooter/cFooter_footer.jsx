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
                        <p>{this.getIntlMessage('footer.learnOnTheGo')}.</p>
                        <h4>{this.getIntlMessage('common.anytime')}. {this.getIntlMessage('common.anywhere')}.</h4>
                    </div>
                    <ul className="appPlatform col-2 clearfix">
                        <li className="ios">
                            <a href="//itunes.apple.com/us/app/wiziq/id540018386?mt=8" target="_blank">
                                {this.getIntlMessage('footer.availableOn')}
                                <span>{this.getIntlMessage('common.appStore')}</span>
                            </a>
                        </li>
                        <li className="android">
                            <a href="https://play.google.com/store/apps/details?id=air.com.wiziq.ipadvc" target="_blank">
                                {this.getIntlMessage('footer.downloadFor')}
                                <span>{this.getIntlMessage('common.android')}</span>
                            </a>
                        </li>
                    </ul>
                    <div className="col-3">
                        <figure className="clearfix">
                            <img src={data.logo} alt={data.academyName} />
                            <figcaption>{this.getIntlMessage('footer.poweredBy')}</figcaption>
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