var Helper = function(req, res, next){
	this.req    = req;
    this.res    = res;
    this.next   = next;
}

Helper.prototype.getTestDataNavList = function(){
    var props = [
            {
                text: 'Notifications',
                className: 'navItem'
            },
            {
                text: 'Activity',
                className: 'navItem'
            },
            {
                text: 'Message',
                className: 'navItem submenu'
            },
            {
                text: 'People',
                className: 'navItem'
            },
            {
                text: 'Library',
                className: 'navItem'
            },
            {
                text: 'Courses',
                className: 'navItem active'
            },
            {
                text: 'Live Classes',
                className: 'navItem'
            },
            {
                text: 'Tests',
                className: 'navItem'
            },
            {
                text: 'Reports',
                className: 'navItem'
            }
    ];
    return props;
};
Helper.prototype.getTestData = function(){

        var props = [
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
    return props;
}

Helper.prototype.getPageData = function(){
	var props = {
        blockTitle: "My Courses yeah!",
		var1: "this is var1",
		var2: "this is var2"
	}
	return props;
}

Helper.prototype.getTestDataCourseList = function () {

    var courseListData = [
        {
            logo: '',
            title: '',
            academy: {
                logo: '',
                name: 'LearnDesk'
            },
            liveFor: '',
            publishDate: 1457342156,
            courseComposition: {
                tutorials: 1,
                classes: 3,
                tests: 2
            },
            enrollees: [
                'Ashutosh'
            ],
            price: 10
        }
    ];

    return courseListData;
}

Helper.prototype.getTestDataHeader = function () {
    var header = {
        header: {
            academyName: "Learn Desk",
            logo: "/asset/image/logo.jpg"
        },
        headerNavigation: {
            navigationItems: [
                { id: 0, keyName: "discover", classes: [], url: '#', isActive: true },
                { id: 1, keyName: "courses", classes: [], url: '#', isActive: false },
                { id: 2, keyName: "mobileApp", classes: [], url: '#', isActive: false },
                { id: 3, keyName: "contactUs", classes: [], url: '#', isActive: false },
                { id: 4, keyName: "signIn", classes: ['cta', 'wired'], url: '#', isActive: false }
            ]
        }
    };

    return header;
}

Helper.prototype.getTestDataFooter = function () {
    var footer = {
        academyName: "Learn Desk",
        logo: "/asset/image/logo.jpg"
    }

    return footer;
}

module.exports = Helper;
