var config = require('../config/config');

function Courses() {
    return this;
}

Courses.prototype.getPublicCoursesData = function () {
    var courseListData = [
        {
            key: 0,
            logo: '/asset/image/courses/courses_1_221x140.jpg',
            title: 'Hadoop Introduction',
            academy: {
                logo: '/asset/image/academy/niit.jpg',
                name: 'LearnDesk'
            },
            liveFor: 3,
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
        },
        {
            key: 0,
            logo: '/asset/image/courses/courses_1_221x140.jpg',
            title: 'Python Introduction',
            academy: {
                logo: '/asset/image/academy/niit.jpg',
                name: 'LearnDesk'
            },
            liveFor: 4,
            publishDate: 1457342156,
            courseComposition: {
                tutorials: 2,
                classes: 1,
                tests: 10
            },
            enrollees: [
                'Ashutosh',
                'Biplab',
                'Varinder'
            ],
            price: 10
        }
    ];

    return courseListData;
}

module.exports = Courses;