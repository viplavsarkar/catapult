var React = require('react');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;
var FormattedMessage = ReactIntl.FormattedMessage;
var FormattedDate = ReactIntl.FormattedDate;

var courseData = {
    academy: {
        name: "Learn Desk",
        logo: "asset/image/academy/niit.jpg"
    },
    logo: "asset/image/courses/courses_1_221x140.jpg",
    title: "Hadoop Introduction"
};

var intlData = {
    locales: "en-US",
    messages: {},
    formats: {
        "date": {
            "short": {
                "day": "long",
                "month": "short",
                "year": "short"
            }
        }
    }
};

class CourseQuickLinks extends React.Component {
    render() {
        return (
            <ul class="courseQuickLinks clearfix">
                <li class="sorting hide">
                    {this.getIntlMessage('common.sortBy')}: <a href="#" data-val="popularity">{this.getIntlMessage('common.popularity')}</a>
                    <ul class="options">
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
}

class CourseTutorials extends React.Component {
    render() {
        var data = this.props.data;

        return (
            <li>
                <span class="no">{data}</span>
                {this.getIntlMessage('common.tutorials')}
            </li>
        );
    }
}

class CourseClasses extends React.Component {
    render() {
        var data = this.props.data;

        return (
            <li>
                <span class="no">{data.classes}</span>
                {this.getIntlMessage('common.classes')}
            </li>
        );
    }
}

class CourseTests extends React.Component {
    render() {
        var data = this.props.data;

        return (
            <li>
                <span class="no">{data.tests}</span>
                {this.getIntlMessage('common.tests')}
            </li>
        );
    }
}

class CourseComposition extends React.Component {
    render() {
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
            <ul class="type clearfix">
                {tutorials}
                {classes}
                {tests}
            </ul>
        );
    }
}

class CourseEnrollees extends React.Component {
    render() {
        var data = this.props.data;

        if (data.count == 0)
            return;

        var enrolleeString = '';
        var hasHaveEnrolled = '';

        if (data.count < 2) {
            enrolleeString = data.enrollees[0];
            hasHaveEnrolled = this.getIntlMessage('course.hasEnrolled');
        } else {
            enrolleeString = data.enrollees[0] + ' ' + this.getIntlMessage('common.and') + ' ' + (data.count - 1) + ' ' + this.getIntlMessage('common.others');
            hasHaveEnrolled = this.getIntlMessage('course.haveEnrolled');
        }

        return (
            <div class="moreInfo">
                <span class="name">{enrolleeString}</span>
                <span class="info">{hasHaveEnrolled}</span>
            </div>
        );
    }
}

class CourseListItem extends React.Component {
    render() {
        var data = this.props.data;

        var priceText = data.price;
        if (data.price == 0) {
            priceText = this.getIntlMessage('common.free');
        }

        return (
            <li class="item clearfix">
                <div class="col-1">
                    <figure class="courseImg">
                        <a href="#"><img src={data.logo} alt={data.title} /></a>
                        <figcaption class="captionWrap">
                            <div class="gutter clearfix">
                                <span class="academy">
                                <img src={data.academy.logo} />
                            </span>
                                <span class="caption">{data.academy.name}</span>
                            </div>
                        </figcaption>
                    </figure>
                </div>
                <div class="col-2 content">
                    <h2><a href="#">{data.title}</a></h2>
                    <ul class="placed">
                        <li>
                            {this.getIntlMessage('course.liveFor')} {data.liveFor} {this.getIntlMessage('common.week')}
                            <span class="date">
                                {this.getIntlMessage('course.publishedDate')}: <FormattedDate value={data.publishDate} format='short' />
                            </span>
                        </li>
                    </ul>
                    <CourseComposition data={data.courseComposition} />
                </div>
                <div class="col-3">
                    <ul class="ctaGroup">
                        <li class="cta noRadius">
                            <CourseEnrollees data={data.enrollees}/>
                            {priceText}
                        </li>
                        <li class="cta wired"><a href="#">{this.getIntlMessage('common.learnMore')}</a></li>
                    </ul>
                </div>
            </li>
        );
    }
}

class ViewMore extends React.Component {
    render() {
        return (
            <div class="cta wired">
                <a href="#">{this.getIntlMessage('common.viewMore')}</a>
            </div>
        );
    }
}

class CourseList extends React.Component {
    render() {
        var data = this.props.data;
        var courseItems = data.map(function (courseItem) {
            return (
                <CourseList data={courseItem} />
            );
        });

        return (
            <div class="moduleWrapper">
                <CourseQuickLinks />
                <ul class="courseList">
                    {courseItems}
                </ul>
                <ViewMore />
            </div>
        );
    }
}