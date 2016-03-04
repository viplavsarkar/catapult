var React = require('react');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;
var FormattedMessage = ReactIntl.FormattedMessage;


class Footer extends React.Component {
    render() {
        var data = this.props.data;

        return (
            <div class="moduleWrapper clearfix">
                <div class="col-1">
                    <p>{this.getIntlMessage('footer.learnOnTheGo')}.</p>
                    <h4>{this.getIntlMessage('common.anytime')}. {this.getIntlMessage('common.anywhere')}.</h4>
                </div>
                <ul class="appPlatform col-2 clearfix">
                    <li class="ios">
                        <a href="//itunes.apple.com/us/app/wiziq/id540018386?mt=8" target="_blank">
                            {this.getIntlMessage('footer.availableOn')}
                            <span>{this.getIntlMessage('common.appStore')}</span>
                        </a>
                    </li>
                    <li class="android">
                        <a href="https://play.google.com/store/apps/details?id=air.com.wiziq.ipadvc" target="_blank">
                            {this.getIntlMessage('footer.downloadFor')}
                            <span>{this.getIntlMessage('common.android')}</span>
                        </a>
                    </li>
                </ul>
                <div class="col-3">
                    <figure class="clearfix">
                        <img src={data.logo} alt={data.academyName} />
                        <figcaption>{this.getIntlMessage('footer.poweredBy')}</figcaption>
                    </figure>
                </div>
            </div>
        );
    }
}