
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

var CourseSummary = React.createClass({
    mixins: [IntlMixin],
    render: function(){
        return (
                <section id="courseDetails" className="moduleBody">
                    <div className="moduleWrapper">
                        <ul className="courseList details">
                            <li className="item clearfix">
                                <div className="col-1">
                                    <figure className="courseImg">
                                        <img src="/asset/image/courses/courses_1_221x140.jpg" alt="course" />
                                        <figcaption className="captionWrap">
                                            <div className="gutter clearfix">
                                                <span className="academy">
                                                <img src="/asset/image/academy/Learn-Desk-4690287-small.jpg" />
                                            </span>
                                                <span className="caption">Learn Desk</span>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>
                                <div className="col-2 content">
                                    <h2>CPR Online Training</h2>
                                    <p className="shortDiscription">Self paced course on CPR</p>
                                    <div className="relatedOpt">
                                        <ul className="placed">
                                            <li>
                                                <span className="calenderDate">14 Dec</span> 9 Weeks
                                                <span className="date">Course started: Tuesday, 2 Jun 15</span>
                                            </li>
                                        </ul>
                                        <ul className="type clearfix">
                                            <li>
                                                <span className="no">4</span> TUTORIALS
                                            </li>
                                            <li>
                                                <span className="no">4</span> live classes
                                            </li>
                                            <li>
                                                <span className="no">4</span> tests
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <ul className="ctaGroup">
                                        <li className="cta noRadius">
                                            $149 <span className="strike">$199</span>
                                        </li>
                                        <li className="cta filledOrng"><a href="#">ENROLL NOW</a></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
            );
    }
});

var CourseDetail = React.createClass({
    mixins: [IntlMixin],
    render: function() {
        return (
                <section id="courseTabs">
                    <div className="tabsHeadWrapper moduleBody">
                        <ul className="tabsHead moduleWrapper clearfix">
                            <li className="overview" data-tab="overview"><a href="#">Overview</a></li>
                            <li className="schedule" data-tab="schedule"><a href="#">Schedule</a></li>
                        </ul>
                    </div>
                    <div className="tabsContent moduleBody">
                        <div data-tab="overview" className="moduleWrapper">
                            <div className="primaryDetail">
                                <h2 className="title">Overview</h2>
                                <p>According to the Law of Attraction your thoughts create your reality, so everything that everyone is living and experiencing is as a result of the thoughts that they are thinking.Thought is an energy that when focused manifests into physical form.The Law of Attraction isn’t a new idea, the concepts have been talked about throughout the ages by many philosophies and traditions, including also modern day science and physics.</p>
                                <h3>A household name today (thanks to “The Secret”), the Law of Attraction helps you to attract new experiences, relationships and situations or a greater sense of well being.</h3>
                                <h3>This online course will show you how to apply Law of Attraction in real life!</h3>
                                <p>With simple and transformative processes including written exercises and meditation, you will empower yourself with a proven practical approach to personal development. Leading Law of Attraction instructor Tracy Friend shares what she has learnt and pioneered through facilitating hundreds of events across the UK and US over the last decade, about what works when applying the Law of Attraction. Tracy’s pioneering presentation delivering The Law of Attraction Centre technology is optimistic and soothing, whilst bringing empowering results on all subjects.</p>
                                <h3>What you’ll learn:</h3>
                                <ul>
                                    <li>Learn the three step process to manifestation</li>
                                    <li>Discover how to deliberately attract more of what you want: abundance, improved relationships, health &amp; well being or any other desire</li>
                                    <li>Determine how to incorporate the Law of Attraction into your daily life</li>
                                    <li>Begin to enjoy your life more</li>
                                    <li>Let go of any negative thought habits that have been blocking your dreams and ambitions</li>
                                </ul>
                                <h3>What’s in the course:</h3>
                                <ul>
                                    <li>4 x 25 Minutes recorded classes</li>
                                    <li>8 PDFs with written exercises</li>
                                </ul>
                                <h3>Course outline:</h3>
                                <ul>
                                    <li>Stage 1: Relaxing/ letting go</li>
                                    <li>Stage 2: Making the best of your current reality</li>
                                    <li>Stage 3: Positively focusing forward - Part I</li>
                                    <li>Stage 4: Positively focusing forward - Part II</li>
                                </ul>
                                <h3 className="lang"> Language of instruction: <span>English</span> </h3>
                            </div>
                            <div className="secondryDetail clearfix">
                                <h2 className="title">About the instructor</h2>
                                <div className="clearfix">
                                    <figure className="academyImg col-1">
                                        <img src="/asset/image/academy/Learn-Desk-4690287.jpg" alt="" />
                                        <figcaption>
                                            Learn Desk
                                            <span className="location">Gurgaon , India</span>
                                        </figcaption>
                                    </figure>
                                    <div className="col-2">
                                        <ul className="academyMeta clearfix">
                                            <li>103 <span>FOLLOWERS</span></li>
                                            <li>6 <span>FOLLOWEES</span></li>
                                            <li>3 <span>TESTIMONIALS</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-tab="schedule" className="moduleWrapper">
                            <div className="primaryDetail">
                                <h2 className="title">Schedule &amp; Syllabus</h2>
                                <ul className="accordionWrapper">
                                    <li className="clearfix">
                                        <div className="accordionHead">
                                            <div className="col-1 caption-1">Section 1 :</div>
                                            <div className="col-2 caption-2">Section 2</div>
                                        </div>
                                        <div className="accordionContent">
                                            <table className="tableGrid">
                                                <tbody>
                                                    <tr>
                                                        <td className="table-col-1 video"><span>Section</span></td>
                                                        <td className="table-col-2">AED and CPR Training</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="table-col-1 video"><span>Section</span></td>
                                                        <td className="table-col-2">What Is a Defibrillator How Does It Work</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="table-col-1 doc"><span>Section</span></td>
                                                        <td className="table-col-2">Defibrillation</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="table-col-1 doc"><span>Section</span></td>
                                                        <td className="table-col-2">Defibrillation</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="table-col-1 doc"><span>Section</span></td>
                                                        <td className="table-col-2">Defibrillation</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <div className="accordionHead">
                                            <div className="col-1 caption-1">Section 2 :</div>
                                            <div className="col-2 caption-2">Defibrillation</div>
                                        </div>
                                        <div className="accordionContent">
                                            <table className="tableGrid">
                                                <tbody>
                                                    <tr>
                                                        <td className="table-col-1 video"><span>Section</span></td>
                                                        <td className="table-col-2">AED and CPR Training</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="table-col-1 video"><span>Section</span></td>
                                                        <td className="table-col-2">What Is a Defibrillator How Does It Work</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="table-col-1 doc"><span>Section</span></td>
                                                        <td className="table-col-2">Defibrillation</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </li>
                                    <li className="clearfix">
                                        <div className="accordionHead">
                                            <div className="col-1 caption-1">Section 3:</div>
                                            <div className="col-2 caption-2">Section 3</div>
                                        </div>
                                        <div className="accordionContent">
                                            <table className="tableGrid">
                                                <tbody>
                                                    <tr>
                                                        <td className="table-col-1 video"><span>Section</span></td>
                                                        <td className="table-col-2">AED and CPR Training</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="table-col-1 video"><span>Section</span></td>
                                                        <td className="table-col-2">What Is a Defibrillator How Does It Work</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="table-col-1 doc"><span>Section</span></td>
                                                        <td className="table-col-2">Defibrillation</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            );
    }
});

var CourseDetailSection = React.createClass({
    mixins: [IntlMixin],    
    render: function () {      

        return (
            <div>
                <section id="breadcrumbs" className="moduleBody">
                    <div className="moduleWrapper">
                        <div className="moduleGutter">
                            <ul className="wrapper clearfix">
                                <li><a href="#">Courses</a></li>
                                <li>CPR Online Training</li>
                            </ul>
                        </div>
                    </div>
                </section>
                <CourseSummary />
                <CourseDetail />
            </div>
        );
    }
});

//*****************************************************************
//  YOUR CODE ENDS HERE
//*****************************************************************

if (isNode) {
    module.exports = CourseDetailSection; 
} else {
    window.Section = CourseDetailSection;
 /*
    var componentName = 'cSample_file';
    
    var dataName = eval('var_' + componentName);
    var lokk = eval('localkk')
    var mekk = eval('messkk');
    var fokk = eval('formkk');
    
    ReactDOM.render(<CourseDetailSection data={dataName} messages={mekk} formats={fokk} locales={lokk} />, document.getElementById('container_'+componentName));
*/
}