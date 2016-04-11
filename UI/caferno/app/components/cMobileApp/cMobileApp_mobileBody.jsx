
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
                    <h2 className="title">Education App Benefits &amp; Features</h2>
                    <div className="col-1">
                        <ul className="highlighter tabsHead clearfix">
                            <li data-tab="attend">
                                <h3>Attend live classes on-the-go </h3>
                                <p>Access your live online classes from your Internet-enabled iOS mobile device – no matter when or where. Experience the world’s best virtual classroom - now! on your phone.</p>
                                <div className="triangle"></div>
                            </li>
                            <li data-tab="acess">
                                <h3>Access courseware anytime</h3>
                                <p>Get course content including PowerPoint slides, documents, presentations, videos, and more – right on your mobile device. Access learning materials instantly, whenever you need them. </p>
                                <div className="triangle"></div>
                            </li>
                            <li data-tab="keep">
                                <h3>Keep track of upcoming events</h3>
                                <p>Receive notifications of upcoming live classes, assignments, and tests on your mobile device. Never miss a lesson or due date, and help ensure your success. </p>
                                <div className="triangle"></div>
                            </li>
                            <li data-tab="engage">
                                <h3>Engage with fellow students</h3>
                                <p>Interact with fellow students and teacher during online discussions and emails from within WizIQ’s mobile app, and get the guidance and answers you need to improve your performance.</p>
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