
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
var Breadcrum = React.createClass({
    mixins: [IntlMixin],
    render: function(){
        var data = this.props.data;

        return(
                <div>
                    <section id="breadcrumbs" className="moduleBody">
                        <div className="moduleWrapper">
                            <div className="moduleGutter">
                                <ul className="wrapper clearfix">
                                    <li><a href="/publiccourse/">Courses</a></li>
                                    <li>{data}</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            );
    }
});

var PriceLine = React.createClass({
    mixins:[IntlMixin],
    render: function(){
        var currencySymbol = {
            'USD': '$'
        };

        var data = this.props.data;
        var priceStr = this.getIntlMessage('free');
        var priceStrikedStr = "";
        var curr;
        if (isNode) {
            curr = global.academy.curr;
        } else {
            curr = window.currency;
        }

        if(data.isPaid){
            if(data.price){
                if(data.price[curr]){
                    if(data.price[curr].priceStriked) priceStrikedStr = data.price[curr].priceStriked;
                    if(data.price[curr].price) priceStr = data.price[curr].price;
                }
            }
        }else{
            priceStr = this.getIntlMessage('free');
        }

        if (this.getIntlMessage('free') !== priceStr || priceStrikedStr) {
            return(
                <li className="cta noRadius">
                    {currencySymbol[curr] + priceStr}
                    <span className="strike">{priceStrikedStr}</span>
                </li>
            );
        } else
            return null;
    }
});

var CourseSummary = React.createClass({
    mixins: [IntlMixin],
    render: function(){
        var data = this.props.data;
        var tutorials = data.tutorialsCount ? data.tutorialsCount : 0;
        var liveClasses = data.classesCount ? data.classesCount : 0;
        var tests = data.testsCount ? data.testsCount : 0;
        var assignments = data.assignmentsCount ? data.assignmentsCount : 0;
        data.priceData = {};
        if(data.isPaid) data.priceData.isPaid = data.isPaid;
        if(data.priceList) data.priceData.priceList = data.priceList;
        data.calDate = new Date(data.startDate).getDate();

        var intlData = {
                        courseStarted:"Course started:",
                        tutorials: "TUTORIALS",
                        liveClasses: "LIVE CLASSES",
                        tests: "TESTS",
                        enrollNow: "ENROLL NOW",
                        assignments: "ASSIGNMENT"
                        }
        return (
                <div>
                    <section id="courseDetails" className="moduleBody">
                        <div className="moduleWrapper">
                            <ul className="courseList details">
                                <li className="item clearfix">
                                    <div className="col-1">
                                        <figure className="courseImg">
                                            <img src={data.courseImg} alt="course" />
                                            <figcaption className="captionWrap">
                                                <div className="gutter clearfix">
                                                    <span className="academy">
                                                        <img src={data.authorImg} />
                                                    </span>
                                                    <span className="caption">{data.authorName}</span>
                                                </div>
                                            </figcaption>
                                        </figure>
                                    </div>
                                    <div className="col-2 content">
                                        <h2>{data.title}</h2>
                                        <p className="shortDiscription">{data.shortDescription}</p>
                                        <div className="relatedOpt">
                                            <ul className="placed">
                                                <li>
                                                    <span className="calenderDate">{data.calDate}</span>
                                                    {
                                                        (data.consumptionType !== 'SELF_PACED') ?
                                                            <span className="date">{intlData.courseStarted} {data.startDate}</span>
                                                        :
                                                            <span className="date">{this.getIntlMessage('selfPaced')}</span>
                                                    }
                                                </li>
                                            </ul>
                                            <ul className="type clearfix">
                                                {
                                                    (tutorials > 0) ?
                                                        <li>
                                                            <span className="no">{tutorials}</span>
                                                            {intlData.tutorials}
                                                        </li>
                                                    :
                                                        null
                                                }
                                                {
                                                    (liveClasses > 0) ?
                                                        <li>
                                                            <span className="no">{liveClasses}</span> {intlData.liveClasses}
                                                        </li>
                                                    :
                                                        null
                                                }
                                                {
                                                    (tests > 0) ?
                                                        <li>
                                                            <span className="no">{tests}</span> {intlData.tests}
                                                        </li>
                                                    :
                                                        null
                                                }
                                                {
                                                    (assignments > 0) ?
                                                         <li>
                                                            <span className="no">{assignments}</span> {intlData.assignments}
                                                        </li>
                                                    :
                                                        null
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <ul className="ctaGroup">
                                            <PriceLine data={data} />
                                        {
                                            (data.canEnroll) ?
                                                <li className="cta filledOrng"><a href="#">{intlData.enrollNow}</a></li>
                                            :
                                                null
                                        }
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            );
    }
});

var CourseOverview = React.createClass({
    mixins: [IntlMixin],
    render: function(){
        var data = this.props.data;
        var intlData = {
                        overview: "Overview",
                        aboutTheInstructor: "About the instructor",
                        followers: "FOLLOWERS",
                        testimonials: "TESTIMONIALS",
                        };
        var overviewText = "<p>According to the Law of Attraction your thoughts create your reality, so everything that everyone is living and experiencing is as a result of the thoughts that they are thinking.Thought is an energy that when focused manifests into physical form.The Law of Attraction isn’t a new idea, the concepts have been talked about throughout the ages by many philosophies and traditions, including also modern day science and physics.</p>"
                        +"<h3>A household name today (thanks to The Secret), the Law of Attraction helps you to attract new experiences, relationships and situations or a greater sense of well being.</h3>"
                        +"<h3>This online course will show you how to apply Law of Attraction in real life!</h3>"
                        +"<p>With simple and transformative processes including written exercises and meditation, you will empower yourself with a proven practical approach to personal development. Leading Law of Attraction instructor Tracy Friend shares what she has learnt and pioneered through facilitating hundreds of events across the UK and US over the last decade, about what works when applying the Law of Attraction. Tracy’s pioneering presentation delivering The Law of Attraction Centre technology is optimistic and soothing, whilst bringing empowering results on all subjects.</p>"
                        +"<h3>What you’ll learn:</h3>"
                        +"<ul>"
                        +    "<li>Learn the three step process to manifestation</li>"
                        +    "<li>Discover how to deliberately attract more of what you want: abundance, improved relationships, health &amp; well being or any other desire</li>"
                        +    "<li>Determine how to incorporate the Law of Attraction into your daily life</li>"
                        +    "<li>Begin to enjoy your life more</li>"
                        +    "<li>Let go of any negative thought habits that have been blocking your dreams and ambitions</li>"
                        +"</ul>"
                        +"<h3>What’s in the course:</h3>"
                        +"<ul>"
                        +    "<li>4 x 25 Minutes recorded classes</li>"
                        +    "<li>8 PDFs with written exercises</li>"
                        +"</ul>"
                        +"<h3>Course outline:</h3>"
                        +"<ul>"
                        +    "<li>Stage 1: Relaxing/ letting go</li>"
                        +    "<li>Stage 2: Making the best of your current reality</li>"
                        +    "<li>Stage 3: Positively focusing forward - Part I</li>"
                        +    "<li>Stage 4: Positively focusing forward - Part II</li>"
                        +"</ul>"
                        +"<h3 className='lang'> Language of instruction: <span>English</span> </h3>";

        return (
                <div data-tab="overview" className="moduleWrapper">
                    <div className="primaryDetail">
                        <h2 className="title">{intlData.overview}</h2>
                        <p dangerouslySetInnerHTML={{__html: data.overviewText}} />
                    </div>
                    <div className="secondryDetail clearfix">
                        <h2 className="title">{intlData.aboutTheInstructor}</h2>
                        <div className="clearfix">
                            <figure className="academyImg col-1">
                                <img src={data.authorImg} alt="" />
                                <figcaption>
                                    {data.authorName}
                                    <span className="location">{data.city} , {data.country}</span>
                                </figcaption>
                            </figure>
                            <div className="col-2">
                                <p dangerouslySetInnerHTML={{__html: data.about}} />
                                <ul className="academyMeta clearfix">
                                    <li>{data.followersCount}<span className="name">{intlData.followers}</span></li>
                                    <li>{data.testimonialsCount}<span className="name">{intlData.testimonials}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
});

var EachSectionRow = React.createClass({
    mixins:[IntlMixin],
    render: function(){
        var data = this.props.data;

        var className = "table-col-2 " + data.type;
        return (
                <tr>
                    <td className="table-col-1">11 Mar</td>
                    <td className={className}><span>Section</span></td>
                    <td className="table-col-3">{data.title}</td>
                </tr>
            )
    }
});
var EachSection = React.createClass({
    mixins:[IntlMixin],
    render: function(){
        var data = this.props.data;
        console.log(data);
        if(!data.subSections){
            /*return(
                <div></div>
                )*/
            data.subSections =  [];
        }
        var sectionRows = data.subSections.map(function (eachSectionData) {
            return (
                <EachSectionRow data={eachSectionData} />
            );
        });
        return(
                <li className="clearfix">
                    <div className="accordionHead">
                        <div className="col-1 caption-1">Section 1 :</div>
                        <div className="col-2 caption-2">{data.label}</div>
                    </div>
                    <div className="accordionContent clearfix">
                        <div className="col-1 inLineDatePicker" data-date-start={data.startDate} data-date-end={data.endDate}></div>
                        <div className="col-2">
                            <table className="tableGrid">
                                <tbody>
                                    {sectionRows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </li>
            );
    }
});
var CourseSchedule = React.createClass({
    mixins:[IntlMixin],
    render: function(){
        var data = this.props.data;
        var sections = data.sections.map(function(section){
            return (
                    <EachSection data={section} />
                )
        });
        return (
                <div data-tab="schedule" className="moduleWrapper">
                    <div className="primaryDetail">
                        <h2 className="title">Schedule &amp; Syllabus</h2>
                        <ul className="accordionWrapper">
                           {sections}
                        </ul>
                    </div>
                </div>
            );
    }
});
var CourseDetail = React.createClass({
    mixins: [IntlMixin],
    render: function() {
        var data = this.props.data;
        var intlData = {overview: "Overview", schedule: "Schedule"};
        //console.log(data.schedule)
        return (
                <div>
                    <section id="courseTabs">
                        <div className="tabsHeadWrapper moduleBody">
                            <ul className="tabsHead moduleWrapper clearfix">
                                <li className="overview" data-tab="overview"><a href="#">{intlData.overview}</a></li>
                                <li className="schedule" data-tab="schedule"><a href="#">{intlData.schedule}</a></li>
                            </ul>
                        </div>
                        <div className="tabsContent moduleBody">
                            <CourseOverview data={data.overview} />
                            <CourseSchedule data={data.schedule}/>
                        </div>
                    </section>
                </div>
            );
    }
});


var CourseDetailSection = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        var data = this.props.data;
        data.courseDetail = {};
        data.courseDetail.schedule = {};
        data.courseDetail.overview = {};

        data.courseSummary.authorImg            = data.authorInfo.authorImg;
        data.courseSummary.authorName           = data.authorInfo.authorName;
        data.courseDetail.schedule.sections     = data.sections;
        data.courseDetail.overview              = data.authorInfo;
        data.courseDetail.overview.overviewText = data.courseSummary.about;
        return (
            <div>
                <Breadcrum data={data.courseSummary.title} />
                <CourseSummary  data={data.courseSummary} />
                <CourseDetail   data={data.courseDetail} />
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