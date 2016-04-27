
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


var Section = React.createClass({
    mixins: [IntlMixin],
    render: function () {

        return (
            <section id="appFeatures" className="moduleBody grid50">
                <div className="moduleWrapper clearfix">
                    <h2 className="title">{this.getIntlMessage('educationAppBenefits')}</h2>
                    <div className="col-1">
                        <ul className="highlighter tabsHead clearfix">
                            <li data-tab="attend">
                                <h3>{this.getIntlMessage('attendClassesOnTheGo')}</h3>
                                <p>{this.getIntlMessage('attendClassesOnIos')}</p>
                                <div className="triangle"></div>
                            </li>
                            <li data-tab="acess">
                                <h3>{this.getIntlMessage('accessCoursewareAnyWhere')}</h3>
                                <p>{this.getIntlMessage('getContentOnMobile')}</p>
                                <div className="triangle"></div>
                            </li>
                            <li data-tab="keep">
                                <h3>{this.getIntlMessage('keepTrackOfEvents')}</h3>
                                <p>{this.getIntlMessage('receiveNotifications')}</p>
                                <div className="triangle"></div>
                            </li>
                            <li data-tab="engage">
                                <h3>{this.getIntlMessage('engagementWithFellows')}</h3>
                                <p>{this.getIntlMessage('interactionWithFellows')}</p>
                                <div className="triangle"></div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-2 tabsContent">
                        <div data-tab="attend" className="contentImg">
                            <img src="/asset/image/contentImg/attend.png" alt="" />
                        </div>
                        <div data-tab="acess" className="contentImg">
                            <img src="/asset/image/contentImg/watch-course1.png" alt="" />
                        </div>
                        <div data-tab="keep" className="contentImg">
                            <img src="/asset/image/contentImg/access.png" alt="" />
                        </div>
                        <div data-tab="engage" className="contentImg">
                            <img src="/asset/image/contentImg/engage.png" alt="" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});

//*****************************************************************
//  YOUR CODE ENDS HERE
//*****************************************************************

if (isNode) {
    module.exports = Section;
} else {
    window.Section = Section;

}