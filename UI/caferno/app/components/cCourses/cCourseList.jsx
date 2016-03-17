
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
                    {this.getIntlMessage('common.sortBy')}: <a href="#" data-val="popularity">{this.getIntlMessage('common.popularity')}</a>
                    <ul className="options">
                        <li data-val="popularity">
                            <a href="#">{this.getIntlMessage('common.popularity')}</a>
                        </li>
                        <li data-val="date">
                            <a href="#">{this.getIntlMessage('common.date')}</a>
                        </li>
                        <li data-val="price">
                            <a href="#">{this.getIntlMessage('common.price')}</a>
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
                {this.getIntlMessage('common.tutorials')}
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
                <span className="no">{data.classes}</span>
                {this.getIntlMessage('common.classes')}
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
                <span className="no">{data.tests}</span>
                {this.getIntlMessage('common.tests')}
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

        if (data.count == 0)
            return;

        var enrolleeString = '';
        var hasHaveEnrolled = '';

        if (data.count < 2) {
            enrolleeString = data[0];
            hasHaveEnrolled = this.getIntlMessage('course.hasEnrolled');
        } else {
            enrolleeString = data[0] + ' ' + this.getIntlMessage('common.and') + ' ' + (data.count - 1) + ' ' + this.getIntlMessage('common.others') + ' ';
            hasHaveEnrolled = this.getIntlMessage('course.haveEnrolled');
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
            priceText = this.getIntlMessage('common.free');
        }

        return (
            <li className="item clearfix">
                <div className="col-1">
                    <figure className="courseImg">
                        <a href="#"><img src={data.logo} alt={data.title} /></a>
                        <figcaption className="captionWrap">
                            <div className="gutter clearfix">
                                <span className="academy">
                                <img src={data.academy.logo} />
                            </span>
                                <span className="caption">{data.academy.name}</span>
                            </div>
                        </figcaption>
                    </figure>
                </div>
                <div className="col-2 content">
                    <h2><a href="#">{data.title}</a></h2>
                    <ul className="placed">
                        <li>
                            {this.getIntlMessage('course.liveFor')} {data.liveFor} {this.getIntlMessage('common.week')}
                            <span className="date">
                                {this.getIntlMessage('course.publishedDate')}: <FormattedDate value={data.publishDate} format='short' />
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
                        <li className="cta wired"><a href="#">{this.getIntlMessage('common.learnMore')}</a></li>
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
                <a href="#">{this.getIntlMessage('common.viewMore')}</a>
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
        var data = this.props.data;
        //var locality = this.props.messages;
        var courseItems = data.map(function (courseItem) {
            return (
                <CourseListItem data={courseItem} />
            );
        });

        return (
            <section id="courseListing" className="moduleBody" onClick={this.onclickhandler}>
                <div className="moduleWrapper">
                    <CourseQuickLinks />
                    <ul className="courseList">
                       
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
    var componentName = 'cCourseList';
    var paramName = eval('var_' + componentName);
    var LOCALES = eval('LOCALES');
    var MESSAGES = eval('MESSAGES');
    var FORMATS = eval('FORMATS');
    
    //var dakk = eval('BIFROST_APP_PROPS.data');
    //var mekk = eval('BIFROST_APP_PROPS.messages');
    //var fokk = eval('BIFROST_APP_PROPS.formats')

    var dakk = eval('datakk');
    var mekk = eval('messkk');
    var fokk = eval('formkk');
    
    //BIFROST_APP_PROPS
    ReactDOM.render(<Section data={dakk} messages={mekk} formats={fokk} />, document.getElementById('pageWrapper'));
    //ReactDOM.render(<Section data={paramName} locales={LOCALES} {...MESSAGES} formats={FORMATS}/>, document.getElementById('pageWrapper'));
    //ReactDOM.render(<Section {...BIFROST_APP_PROPS}/>, document.getElementById('pageWrapper'));

}