var React = require('react');
var ReactDOM = require('react-dom');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;
var FormattedMessage = ReactIntl.FormattedMessage;
var FormattedDate = ReactIntl.FormattedDate;
var FormattedTime = ReactIntl.FormattedTime;


var availableLocales = [
    '',
    'en',
    'ar'
];

var LanguageDropdown = React.createClass({
    render: function () {
        var locales = availableLocales.map(function (locale) {
            return (
                <option value={locale}>
                    {locale}
                </option>
            );
        });
        return (
            <select name='language' onChange={this.props.onChangeHandler}>
                {locales}
            </select>
        );
    }
});

var LanguageChangeForm = React.createClass({
    onChangeHandler: function (event) {
        $('form').submit();
    },
    render: function () {
        return (
            <form method="get">
                <LanguageDropdown onChangeHandler={this.onChangeHandler}/>
            </form>
        );
    }
});

var NextButton = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        return (
            <button className="nextButton" onClick={this.props.onClickHandler}>
                <FormattedMessage message={this.getIntlMessage('next')} />
            </button>
        );
    }
});

var Learner = React.createClass({
    render: function () {
        var data = this.props.data;

        return (
            <a href={data.profileUrl}>
                {data.name}
            </a>
        );
    }
});

var LearnerList = React.createClass({
    render: function () {
        var data = this.props.data;

        var learners = data.map(function (learner) {
            return (
                <Learner key={learner.key} data={learner} />
            );
        });

        return (
            <li className="learnerName">
                {learners}
            </li>
        );
    }
});

var Course = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        var data = this.props.data;

        return (
            <article className="content clearfix">
                <figure className="sessionImg fl">
                    <img src={data.logo} alt="course" />
                </figure>
                <div className="coursesDetail fr">
                    <h2 className="title">{data.title}</h2>
                    <ul className="sessionPrimaryDetails">
                        <li className="live">Live Session</li>
                        <li className="typeOf">
                            {data.session.title}
                            <span className="time">
                                <FormattedDate value={data.session.time} format='short' />
                            </span>
                        </li>
                    </ul>
                    <ul className="sessionSecondryDetails">
                        <li className="lenth">{data.duration} mins</li>
                        <li className="learners">
                            <span>{data.learners.length}</span> <FormattedMessage message={this.getIntlMessage('learner')} />(s)
                        </li>
                        <LearnerList data={data.learners} />
                    </ul>
                    <ul className="sessionNotification clearfix">
                        <li className="fl">{data.weeksCompleted}/{data.weeks} weeks completed</li>
                        <li className="fr">
                            <span className="item notify">12</span>
                            <span className="item message">6</span>
                        </li>
                    </ul>
                </div>
            </article>
        );
    }
});

var CourseList = React.createClass({
    mixins: [IntlMixin],
    getInitialState: function () {
        var courseBoxData = [
            {
                key: 1,
                title: 'MySQL Database Administration',
                logo: 'asset/image/courses/courses_1_221x140.jpg',
                session: {
                    title: 'Fundamentals of Data Structures',
                    time: 1452501069,
                },
                duration: 60,
                learners: [
                    {key: 1, name: 'Ashutosh', profileUrl: '#'},
                    {key: 2, name: 'Varinder', profileUrl: '#'},
                    {key: 3, name: 'Biplab', profileUrl: '#'},
                    {key: 4, name: 'Dinkar', profileUrl: '#'},
                ],
                weeks: 8,
                weeksCompleted: 2
            },
            {
                key: 2,
                title: 'MySQL Database Administration3',
                logo: 'asset/image/courses/courses_2_221x140.jpg',
                session: {
                    title: 'Fundamentals of Data Structures',
                    time: 1452501069,
                },
                duration: 60,
                learners: [
                    {key: 1, name: 'Ashutosh', profileUrl: '#'},
                    {key: 2, name: 'Varinder', profileUrl: '#'},
                    {key: 3, name: 'Biplab', profileUrl: '#'},
                    {key: 4, name: 'Dinkar', profileUrl: '#'},
                ],
                weeks: 8,
                weeksCompleted: 2
            }
        ];

        return {data: courseBoxData};
    },
    clickHandler: function (event) {
        var newCourse = {
            key: 3,
            title: 'SQL Server Database Administration',
            logo: 'asset/image/courses/courses_1_221x140.jpg',
            session: {
                title: 'integral Data Structures',
                time: 1452501069,
            },
            duration: 60,
            learners: [
                {key: 1, name: 'Ashutosh', profileUrl: '#'},
                {key: 2, name: 'Varinder', profileUrl: '#'},
                {key: 3, name: 'Biplab', profileUrl: '#'},
                {key: 4, name: 'Dinkar', profileUrl: '#'},
            ],
            weeks: 8,
            weeksCompleted: 2
        };
        var courses = this.state.data;
        var newCourses = courses.concat([newCourse]);
        this.setState({data: newCourses});
    },
    render: function () {
        var data = this.state.data;
        var courses = data.map(function (course) {
            return (
                <Course key={course.key} data={course} />
            );
        });

        return (
            <div data-tab-content="active" className="tabContent">
                {courses}
                <NextButton onClickHandler={this.clickHandler} />
                <LanguageChangeForm />
            </div>
        );
    }
});

// This should only run client side.
if (typeof window != 'undefined') {
    var messages = {
        ar: {
            next: 'التالى',
            learner: 'متعلم'
        },
        en: {
            next: 'Next',
            learner: 'Learner'
        }
    };

    ReactDOM.render(
        <CourseList {...APP_PROPS} />,
        tabContentWrap
    );
}

module.exports = CourseList;