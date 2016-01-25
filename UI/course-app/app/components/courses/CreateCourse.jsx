var React = require('react');
var ReactDOM = require('react-dom');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;
var FormattedMessage = ReactIntl.FormattedMessage;
var FormattedDate = ReactIntl.FormattedDate;
var FormattedTime = ReactIntl.FormattedTime;

var common = {
    pageHeader: {
        searchForm: {
            placeholder: 'What do you want to learn today?'
        }
    }
};

var HeaderLogo = React.createClass({
    render: function () {
        // Src: asset/image/logo.jpg
        // Tooltip: Wiziq
        return (
            <figure className="logo fl">
                <img src={this.props.data.src} alt={this.props.data.tooltip} />
            </figure>
        );
    }
});

var HeaderSearchForm = React.createClass({
    getInitialState: function () {
        return {query: ''};
    },
    handleQueryChange: function (event) {
        this.setState({query: event.target.value});
    },
    handleSubmit: function (event) {
        // Handle Search Query submit.
        event.preventDefault();
        var query = this.state.query.trim();

        if (!query) {
            return;
        }
    },
    render: function () {
        return (
            <form id="primarySearch" className="form">
                <div className="fieldWrap">
                    <input
                        type="text"
                        id="search"
                        value={this.state.query}
                        placeholder={this.getIntlMessage('pageHeader.searchForm.placeholder')}
                        onChange={this.handleQueryChange}
                    />
                    <input
                        type="submit"
                        className="refineSearch"
                        value="submit"
                    />
                </div>
            </form>
        );
    }
});

var UserNotifications = React.createClass({
    getInitialState: function () {
        return {
            notifications: this.props.data.notifications,
            messages: this.props.data.messages
        };
    },
    render: function () {
        return (
            <ul className="gutter">
                <li className="notify">
                    <a href="#">Notification <span className="count">{this.state.notifications}</span></a>
                </li>
                <li className="msg">
                    <a href="#">Message <span className="count">{this.state.messages}</span></a>
                </li>
            </ul>
        );
    }
});

var UserDetails = React.createClass({
    render: function () {
        // profileImage: "asset/image/user/user1.jpg"
        return (
            <div id="userInfo" className="clearfix">
                <figure className="userImg fl">
                    <img src={this.props.data.profileImage} alt={this.props.data.name} />
                </figure>
                <ul className="detailWrap clearfix">
                    <li className="infoWrap">
                        <div className="caption"><a href="#">{this.props.data.name}</a></div>
                        <span className="domain">{this.props.data.designation}</span>
                    </li>
                    <li className="userNotification">
                        <UserNotifications data={this.props.userNotifications} />
                    </li>
                </ul>
            </div>
        );
    }
});

var PageHeader = React.createClass({
    render: function () {
        return (
            <header id="pageHeader" class="moduleBody">
                <div class="moduleWrapper">
                    <div class="moduleGutter clearfix">
                        <div class="row-1 fl clearfix">
                            <HeaderLogo  />
                            <nav id="primaryNav" class="fl">
                                <ul class="wrap clearfix">
                                    <li class="fl"><a href="#">Learn</a></li>
                                    <li class="fl"><a href="#">Teach</a></li>
                                </ul>
                            </nav>
                        </div>
                        <div class="row-2 clearfix">
                            <div class="col-2 fl">
                                <HeaderSearchForm />
                            </div>
                            <div class="col-3 fl">
                                <UserDetails data={this.props.data.userDetails} />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
});

var Breadcrumb = React.createClass({
    render: function () {
        return (
            <section id="breadcrumbs" className="moduleBody">
                <div className="moduleWrapper">
                    <div className="moduleGutter">
                        <ul className="wrapper">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">My Courses</a></li>
                            <li><a href="#">MySQL Database Administration</a></li>
                            <li>Schedule</li>
                        </ul>
                    </div>
                </div>
            </section>
        );
    }
});

var CourseInro = React.createClass({
    render: function () {
        <section id="coursesIntro" class="moduleBody">
            <div class="moduleWrapper">
                <div class="moduleGutter clearfix">
                    <div class="col-1 fl">
                        <figure class="sessionImg">
                            <img src="asset/image/courses/courses_1_221x140.jpg" alt="course" />
                            <figcaption class="captionWrap">
                                <div class="gutter clearfix">
                                    <span class="academy fl">
                                        <img src="asset/image/academy/niit.jpg" />
                                    </span>
                                    <span class="caption">Rahul Shankar Narayanan</span>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="col-2 fr">
                        <div class="sessionIntroDetails">
                            <h1 class="title">MySQL Database Administration</h1>
                            <p class="summery">High quality instruction for complete 6 months from IITians themselves</p>
                            <ul class="status">
                                <li class="completed">
                                    Last completed
                                    <ul class="innerList">
                                        <li>Searching Algorithms</li>
                                    </ul>
                                </li>
                                <li class="overdue">
                                    Overdue
                                    <ul class="innerList">
                                        <li>Assignment 01</li>
                                    </ul>
                                </li>
                                <li class="inprogress">
                                    In progress
                                    <ul class="innerList">
                                        <li>Using invariants &amp; 1 more...</li>
                                        <li>Lorem Ipsum of another thing that is running in t..</li>
                                        <li>2 more</li>
                                    </ul>
                                </li>
                                <li class="upcoming">
                                    Upcoming
                                    <ul class="innerList">
                                        <li>Sorting Algorithms</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    }
});