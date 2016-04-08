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

Helper.prototype.getTestDataHeader = function (currPage) {
    var header = {
        header: {
            academyName: "Learn Desk",
            logo: "/asset/image/logo.jpg"
        },
        headerNavigation: {
            navigationItems: [
                {key:11, id: 0, keyName: "discover", classes: [], url: 'home', isActive: false },
                {key:12, id: 1, keyName: "courses", classes: [], url: 'courses', isActive: false },
                {key:13, id: 1, keyName: "webinars", classes: [], url: 'webinars', isActive: false },
                {key:14, id: 2, keyName: "mobileApp", classes: [], url: 'mobile', isActive: false },
                {key:15, id: 3, keyName: "contactUs", classes: [], url: 'contactus', isActive: false },
                {key:16, id: 4, keyName: "signIn", classes: ['cta', 'wired'], url: '#', isActive: false }
            ]
        }

    };

    if(currPage){
        var count = header.headerNavigation.navigationItems.length;
        for(var i = 0; i < count; i++){
            if(header.headerNavigation.navigationItems[i].keyName.toLowerCase() === currPage.toLowerCase()){
                header.headerNavigation.navigationItems[i].isActive = true;
                break;
            }
        }
    }
    return header;
}

Helper.prototype.getTestDataFooter = function () {
    var footer = {
        academyName: "Learn Desk",
        logo: "/asset/image/logo.jpg"
    }

    return footer;
}

Helper.prototype.getTestDataCourseList_old = function () {

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

Helper.prototype.getTestDataOfCourseDetail = function(){
    var data = {
                courseSummary: {
                    courseImg: "/asset/image/courses/courses_1_221x140.jpg",
                    authorImg: "/asset/image/academy/Learn-Desk-4690287-small.jpg",
                    authorName: "Learn Desk",
                    title:  "CPR Online Training",
                    shortDescription: "Self paced course on CPR",
                    calDate: "14 Dec",
                    duration: "9 Weeks",
                    startedFrom: "Tuesday, 2 Jun 15",
                    tutorials: 4,
                    liveClasses: 5,
                    tests: 8,
                    amount: "$149",
                    amountCrossed: "$199",
                },
                courseDetail: {
 
                                schedule:{
                                            sections: [
                                                {
                                                    sectionData:[
                                                        {type:"video", title:"AED and CPR Training"},
                                                        {type:"video", title:"What Is a Defibrillator How Does It Work"},
                                                        {type:"doc", title:"Defibrillation"},
                                                        {type:"doc", title:"Defibrillation"},
                                                        {type:"doc", title:"Defibrillation"},
                                                        {type:"doc", title:"Defibrillation"},
                                                        {type:"video", title:"AED and CPR Training"},
                                                        {type:"video", title:"AED and CPR Training"},
                                                        {type:"video", title:"AED and CPR Training"}
                                                    ]
                                                },
                                                {
                                                    sectionData:[
                                                        {type:"video", title:"Not sure what is this"},
                                                        {type:"video", title:"What Is a Defibrillator How Does It Work"},
                                                        {type:"doc", title:"Defibrillation"},
                                                        {type:"doc", title:"Defibrillation"},
                                                        {type:"doc", title:"Defibrillation"},
                                                        {type:"doc", title:"Defibrillation"},
                                                        {type:"video", title:"AED and CPR Training"},
                                                        {type:"video", title:"AED and CPR Training"},
                                                        {type:"video", title:"AED and CPR Training"}
                                                    ]
                                                },

                                            ]
                                        },
                                overview:{
                                            overviewText: "<p>According to the Law of Attraction your thoughts create your reality, so everything that everyone is living and experiencing is as a result of the thoughts that they are thinking.Thought is an energy that when focused manifests into physical form.The Law of Attraction isn’t a new idea, the concepts have been talked about throughout the ages by many philosophies and traditions, including also modern day science and physics.</p>",
                                            authorImgBig: "/asset/image/academy/Learn-Desk-4690287.jpg",
                                            authorName: "Learn Desk",
                                            authorCity: "Gurgaon",
                                            authorCountry: "India",
                                            followers: 103,
                                            testimonials: 6,

                                        }
                            }
                };

    return data;
}
Helper.prototype.getTestDataCourseList = function () {
    var courseListData = [
        {
            key: 0,
            courseLogo: '/asset/image/courses/courses_1_221x140.jpg',
            title: 'Hadoop Introduction',
            tutor: {
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
            key: 1,
            courseLogo: '/asset/image/courses/145782_large.jpg',
            title: 'Python Introduction',
            tutor: {
                logo: '/asset/image/academy/niit.jpg',
                name: 'LearnDesk'
            },
            liveFor: 4,
            publishDate: 1457343156,
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
Helper.prototype.getTestDataForDiscover = function(){
    var data = [
            {
                courseLogo: "/asset/image/courses/145782_large.jpg",
                title: "Programming Basics",
                learnerCount: 7,
                priceData: {
                    price: 150,
                    priceStriked: 250,
                    currency: '$'
                }
            },
            {
                courseLogo: "/asset/image/courses/113322_large.jpg",
                title: "Programming Basics",
                learnerCount: 2,
                priceData: {
                    price: 410,
                    priceStriked: 750,
                    currency: 'Rs'
                }
            },
            {
                courseLogo: "/asset/image/courses/145782_large.jpg",
                title: "Programming Basics",
                learnerCount: 7,
                priceData: {
                    price: 150,
                    priceStriked: 250,
                    currency: '$'
                }
            },
            {
                courseLogo: "/asset/image/courses/113322_large.jpg",
                title: "Programming Basics",
                learnerCount: 2,
                priceData: {
                    price: 410,
                    priceStriked: 750,
                    currency: 'Rs'
                }
            },
            {
                courseLogo: "/asset/image/courses/145782_large.jpg",
                title: "Programming Basics",
                learnerCount: 7,
                priceData: {
                    price: 150,
                    priceStriked: 250,
                    currency: '$'
                }
            },
            {
                courseLogo: "/asset/image/courses/113322_large.jpg",
                title: "Programming Basics",
                learnerCount: 2,
                priceData: {
                    price: 410,
                    priceStriked: 750,
                    currency: 'Rs'
                }
            },
            {
                courseLogo: "/asset/image/courses/145782_large.jpg",
                title: "Programming Basics",
                learnerCount: 7,
                priceData: {
                    price: 150,
                    priceStriked: 250,
                    currency: '$'
                }
            },
            {
                courseLogo: "/asset/image/courses/113322_large.jpg",
                title: "Programming Basics",
                learnerCount: 2,
                priceData: {
                    price: 410,
                    priceStriked: 750,
                    currency: 'Rs'
                }
            },
            {
                courseLogo: "/asset/image/courses/145782_large.jpg",
                title: "Programming Basics",
                learnerCount: 7,
                priceData: {
                    price: 150,
                    priceStriked: 250,
                    currency: '$'
                }
            },
            {
                courseLogo: "/asset/image/courses/113322_large.jpg",
                title: "Programming Basics",
                learnerCount: 2,
                priceData: {
                    price: 410,
                    priceStriked: 750,
                    currency: 'Rs'
                }
            }

        ];
        return data;
}
Helper.prototype.getTestDataForWebinars = function(){
    var data = [
                    {
                        title: "Open class on SEO by Raj",
                        description: "Everyone is welcome in the open class by Raj on SEO training",
                        startAt: "Thursday, 20 Aug 15 02:47 PM (IST)",
                        status:"the class is over",
                        duration: 60,
                        attendeeCount: 15,
                        tutor:{
                                profilePic: "http://wqimgqe.s3.amazonaws.com/ut/umt/Rajinder-69268.jpg",
                                name: "Rajinder",
                                country: "India",
                                city: "Chandigar"
                        },
                        recordingStatus:"STOPPED/IT’S OVER",
                        recordingRequestLink:"/action/send-message.aspx?msg=pHG%2bNSNbj6ewT%2b8JesoZ357dfPyKKOrSWOEhUwvDKXGajTGvhPVQ%2bKfp7kZd%2bqqjJA9utWGh7nFLpQwiJNTiaZE1cG3tPWkg8VhScJDcQrbTV14YVkY19h49tY23wvRrYGDMHyr9Go8%3d&amp;SetDomain=true&amp;keepThis=true&amp;TB_iframe=true&amp;height=300&amp;width=500"
                    },
                    {
                        title: "Open class on jAVA BEANS by SOURABH",
                        description: "Open class by Sourabh",
                        startAt: "Sunday, 14 Aug 17 02:47 PM (IST)",
                        status:"the class is over",
                        duration: 50,
                        attendeeCount: 51,
                        tutor:{
                                profilePic: "http://wqimgqe.s3.amazonaws.com/ut/umt/Rajinder-69268.jpg",
                                name: "Sourabh Ganguly",
                                country: "India",
                                city: "Gurgaon"
                        },
                        recordingRequestLink:"YET TO START",
                        recordingLink:""
                    },
                    {
                        title: "Open class on Spring Boot by Dinkar",
                        description: "Webinar by Dinkar",
                        startAt: "Sunday, 03 Apr 16 03:47 PM (IST)",
                        status:"the class is over",
                        duration: 50,
                        attendeeCount: 51,
                        tutor:{
                                profilePic: "http://wqimgqe.s3.amazonaws.com/ut/umt/Rajinder-69268.jpg",
                                name: "Dinkar",
                                country: "India",
                                city: "Palampur"
                        },
                        recordingRequestLink:"RECORDING IN PROGRESS",
                        recordingLink:""
                    }


                ];
    return data;
}
module.exports = Helper;
