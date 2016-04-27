if (typeof window === 'undefined') {
    var React = require('react');
    var ReactIntl = require('react-intl');
    var IntlMixin = ReactIntl.IntlMixin;
    var FormattedMessage = ReactIntl.FormattedMessage;
} else {
    var React = window.React;
}


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
                            <a href="//itunes.apple.com/us/app/wiziq/id540018386?mt=8" target="_blank">
                                {this.getIntlMessage('availableOn')}
                                <span>{this.getIntlMessage('appStore')}</span>
                            </a>
                        </li>
                        <li className="android">
                            <a href="https://play.google.com/store/apps/details?id=air.com.wiziq.ipadvc" target="_blank">
                                {this.getIntlMessage('downloadFor')}
                                <span>{this.getIntlMessage('android')}</span>
                            </a>
                        </li>
                    </ul>
                    <div className="col-3">
                        <figure className="clearfix">
                            <img src={data.logo} alt={data.academyName} />
                            <figcaption>{this.getIntlMessage('poweredBy')}</figcaption>
                        </figure>
                    </div>
                </div>
            </footer>
        );
    }
});

module.exports = Footer;