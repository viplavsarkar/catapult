var React = require('react');

var Learner = React.createClass({
    render: function () {
        var data = this.props.data;

        return (
            <a href='kk'>
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
                            <span className="time">{data.session.time}</span>
                        </li>
                    </ul>
                    <ul className="sessionSecondryDetails">
                        <li className="lenth">{data.duration} mins</li>
                        <li className="learners">
                            <span>{data.learners.length}</span> Learner(s)
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
    render: function () {
        var data = this.props.data;
        var courses = data.map(function (course) {
            return (
                <Course key={course.key} data={course} />
            );
        });

        return (
            <div data-tab-content="active" className="tabContent">
                {courses}
            </div>
        );
    }
});

module.exports = CourseList;