
var isNode = typeof module !== 'undefined' && module.exports
  , React = isNode ? require('react') : window.React
  , ReactDOM = isNode ? require('react-dom') : window.ReactDOM
  , ReactIntl = isNode ? require('react-intl') : window.ReactIntl;


var IntlMixin = ReactIntl.IntlMixin;
var FormattedMessage = ReactIntl.FormattedMessage;
var FormattedDate = ReactIntl.FormattedDate;

var CourseQuickLinks = React.createClass({
    mixins: [IntlMixin],
    render: function () {

        return (
            <ul className="courseQuickLinks clearfix">
                <li className="sorting hide">
                    {this.getIntlMessage('sortBy')}: <a href="#" data-val="popularity">{this.getIntlMessage('popularity')}</a>
                    <ul className="options">
                        <li data-val="popularity">
                            <a href="#">{this.getIntlMessage('popularity')}</a>
                        </li>
                        <li data-val="date">
                            <a href="#">{this.getIntlMessage('date')}</a>
                        </li>
                        <li data-val="price">
                            <a href="#">{this.getIntlMessage('price')}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        );
    }
});

var CourseTutorials = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        var data = this.props.data;

        return (
            <li>
                <span className="no">{data}</span>
                {this.getIntlMessage('tutorials')}
            </li>
        );
    }
});

var CourseClasses = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        var data = this.props.data;

        return (
            <li>
                <span className="no">{data}</span>
                {this.getIntlMessage('classes')}
            </li>
        );
    }
});

var CourseTests = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        var data = this.props.data;

        return (
            <li>
                <span className="no">{data}</span>
                {this.getIntlMessage('tests')}
            </li>
        );
    }
});

var CourseComposition = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        var data = this.props.data;

        if (typeof data.tutorials != "undefined") {
            var tutorials = <CourseTutorials data={data.tutorials} />
        } else {
            var tutorials = '';
        }

        if (typeof data.classes != "undefined") {
            var classes = <CourseClasses data={data.classes} />
        } else {
            var classes = '';
        }

        if (typeof data.tests != "undefined") {
            var tests = <CourseTests data={data.tests} />
        } else {
            var tests = '';
        }

        return (
            <ul className="type clearfix">
                {tutorials}
                {classes}
                {tests}
            </ul>
        );
    }
});

var CourseEnrollees = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        var data = this.props.data;
        if(data === undefined) data = [];

        var enrolleeString = '';
        var hasHaveEnrolled = '';
        if(data.length == 0){
            enrolleeString = 'no one has enrolled';
        }else if (data.length < 2) {
            enrolleeString = data[0];
            hasHaveEnrolled = this.getIntlMessage('hasEnrolled');
        } else {
            enrolleeString = data[0] + ' ' + this.getIntlMessage('and') + ' ' + (data.length - 1) + ' ' + this.getIntlMessage('others') + ' ';
            hasHaveEnrolled = this.getIntlMessage('haveEnrolled');
        }

        return (
            <div className="moreInfo">
                <span className="name">{enrolleeString}</span>
                <span className="info">{hasHaveEnrolled}</span>
            </div>
        );
    }
});

var CourseListItem = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        var data = this.props.data;

        var priceText = data.price;
        if (data.price == 0) {
            priceText = this.getIntlMessage('free');
        }
        var courseLogo = "//" + data.courseLogo;
        var tutorLogo = "//" + data.tutor.logo;
        var courseDetailLink = "course/" + data.courseDetailLink;
        return (
            <li className="item clearfix">
                <div className="col-1">
                    <figure className="courseImg">
                        <a href={courseDetailLink}><img src={courseLogo} alt={data.title} /></a>
                        <figcaption className="captionWrap">
                            <div className="gutter clearfix">
                                <span className="academy">
                                    <img src={tutorLogo} />
                                </span>
                                <span className="caption">{data.tutor.name}</span>
                            </div>
                        </figcaption>
                    </figure>
                </div>
                <div className="col-2 content">
                    <h2><a href={courseDetailLink}>{data.title}</a></h2>
                    <ul className="placed">
                        <li>
                            {this.getIntlMessage('liveFor')} {data.liveFor} {this.getIntlMessage('week')}
                            <span className="date">
                                {this.getIntlMessage('publishedDate')}: <FormattedDate value={data.publishDate} format='short' />
                            </span>
                        </li>
                    </ul>
                    <CourseComposition data={data.courseComposition} />
                </div>
                <div className="col-3">
                    <ul className="ctaGroup">
                        <li className="cta noRadius">
                            <CourseEnrollees data={data.enrollees}/>
                            {priceText}
                        </li>

                        <li className="cta wired"><a href={courseDetailLink}>{this.getIntlMessage('learnMore')}</a></li>

                    </ul>
                </div>
            </li>
        );
    }
});

var ViewMore = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        return (
            <div className="cta wired">
                <a href="#">{this.getIntlMessage('viewMore')}</a>
            </div>
        );
    }
});

var Section = React.createClass({
    mixins: [IntlMixin],
    onclickhandler: function(ev){
        alert('hi');
    },
    render: function () {
        var data = this.props.data.result;
        //var locality = this.props.messages;
        var courseItems = data.map(function (courseItem) {
            return (
                <CourseListItem key={courseItem.courseId} data={courseItem} />
            );
        });

        return (
            <section id="courseListing" className="moduleBody" >
                <div className="moduleWrapper" >
                    <CourseQuickLinks />
                    <ul className="courseList" onClick={this.onclickhandler}>
                        {courseItems}
                    </ul>
                    <ViewMore />
                </div>
            </section>
        );
    }
});


if (isNode) {
    module.exports = Section;
} else {
    window.Section = Section;
   /* var componentName = 'cCourses_cCourseList';

    var dataName = eval('var_' + componentName);
    var lokk = eval('localkk')
    var mekk = eval('messkk');
    var fokk = eval('formkk');

    ReactDOM.render(<Section data={dataName} messages={mekk} formats={fokk} locales={lokk} />,
        document.getElementById('container_'+componentName));*/

}