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
    },
     {
        key: 3,
        title: 'DB2 Database Administration3',
        logo: 'asset/image/courses/courses_1_221x140.jpg',
        session: {
            title: 'Fundamentals of DB2',
            time: 1452501069,
        },
        duration: 60,
        learners: [
            {key: 1, name: 'Vikas', profileUrl: '#'},
            {key: 2, name: 'Dev', profileUrl: '#'},
            {key: 3, name: 'Raman', profileUrl: '#'},
            {key: 4, name: 'Byomkesh', profileUrl: '#'},
        ],
        weeks: 8,
        weeksCompleted: 2
    }
];

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

ReactDOM.render(
    <CourseList data={courseBoxData} />,
    document.getElementById('tabContentWrap')
);