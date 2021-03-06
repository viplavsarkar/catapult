
var isNode = typeof module !== 'undefined' && module.exports
  , React = isNode ? require('react') : window.React
  , ReactDOM = isNode ? require('react-dom') : window.ReactDOM
  , ReactIntl = isNode ? require('react-intl') : window.ReactIntl;


var IntlMixin = ReactIntl.IntlMixin;
var FormattedMessage = ReactIntl.FormattedMessage;
var FormattedDate = ReactIntl.FormattedDate;

//*****************************************************************
//  YOUR CODE STARTS HERE
//*****************************************************************


var MobileHead = React.createClass({
    mixins: [IntlMixin],
    render: function () {

        return (
            <section id="heroImg" className="moduleBody fullBgImg">
                <div className="moduleWrapper clearfix">
                    <div className="col-1 copy">
                        <h1>{this.getIntlMessage('mLearningWith') + ' ' + this.getIntlMessage('wiziq') + ' ' + this.getIntlMessage('mobileClassroomApps')}</h1>
                        <p>{this.getIntlMessage('everythingNeededToCondutClasses')}</p>
                        <ul className="appDownload clearfix">
                            <li className="ios"><a href="#">iOS</a></li>
                            <li className="android"><a href="#">Android</a></li>
                        </ul>
                    </div>
                    <figure className="col-2 contentImg">
                        <img src="/asset/image/contentImg/banner_mobile1.png" alt="" />
                    </figure>
                </div>
            </section>
        );
    }
});

//*****************************************************************
//  YOUR CODE ENDS HERE
//*****************************************************************

if (isNode) {
    module.exports = MobileHead;
} else {
    window.Section = MobileHead;

}