if (typeof window === 'undefined') {
    var React = require('react');
    var ReactIntl = require('react-intl');
    var IntlMixin = ReactIntl.IntlMixin;
    var FormattedMessage = ReactIntl.FormattedMessage;
    var FormattedDate = ReactIntl.FormattedDate;
} else {
    var React = window.React;
}

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
                <span className="no">{data.classes}</span>
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
                <span className="no">{data.tests}</span>
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

        if (data.count == 0)
            return;

        var enrolleeString = '';
        var hasHaveEnrolled = '';

        if (data.count < 2) {
            enrolleeString = data[0];
            hasHaveEnrolled = this.getIntlMessage('hasEnrolled');
        } else {
            enrolleeString = data[0] + ' ' + this.getIntlMessage('and') + ' ' + (data.count - 1) + ' ' + this.getIntlMessage('others') + ' ';
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
                        <li className="cta wired"><a href="#">{this.getIntlMessage('learnMore')}</a></li>
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
    render: function () {
        var data = this.props.data;
        var courseItems = data.map(function (courseItem) {
            return (
                <CourseListItem data={courseItem} />
            );
        });

        return (
            <section id="courseListing" className="moduleBody">
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

module.exports = Section;