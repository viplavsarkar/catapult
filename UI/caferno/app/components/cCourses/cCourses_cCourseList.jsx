
var isNode = typeof module !== 'undefined' && module.exports
  , React = isNode ? require('react') : window.React
  , ReactDOM = isNode ? require('react-dom') : window.ReactDOM
  , ReactIntl = isNode ? require('react-intl') : window.ReactIntl;


var IntlMixin = ReactIntl.IntlMixin;
var FormattedMessage = ReactIntl.FormattedMessage;
var FormattedDate = ReactIntl.FormattedDate;

var SortField = React.createClass({
    mixins: [IntlMixin],
    clickHandler: function (event) {
        try {
            var currentSortField = this.props.getCurrentSortField();
            if (currentSortField.selectedField !== this.props.data.dataVal) {
                this.props.sortClickHandler(event);
            }
            this.props.setCurrentSortField(this.props.data.dataVal);
        } catch (ex) {
            console.log('Exception inside SortField clickHandler: ' + ex);
        }
    },
    render: function () {
        var data = this.props.data;

        return (
            <li data-val={data.dataVal} className={this.props.className}>
                <a href="#" data-sort-field={data.fieldName} onClick={this.clickHandler}>{this.getIntlMessage(data.dataVal)}</a>
            </li>
        );
    }
});

var CourseQuickLinks = React.createClass({
    mixins: [IntlMixin],
    getInitialState: function () {
        return {
            selectedField: ''
        };
    },
    componentWillMount: function () {
        this.setState({
            selectedField: 'popularity'
        });
    },
    setCurrentSortField: function (sortField) {
        this.setState({
            selectedField: sortField
        });
    },
    getCurrentSortField: function () {
        return this.state;
    },
    render: function () {
        var _this = this;
        var defaultSortFields = [
            {
                key: 0,
                dataVal: 'popularity',
                fieldName: 'ENROLLEDCOUNT'
            },
            {
                key: 1,
                dataVal: 'date',
                fieldName: 'PUBLISHEDON'
            },
            {
                key: 2,
                dataVal: 'price',
                fieldName: 'PRICE'
            }
        ];

        var sortFields = defaultSortFields.map(function (field) {
            var className = (_this.state.selectedField === field.dataVal) ? 'active' : '';
            return (
                <SortField key={field.key} className={className} data={field} sortClickHandler={_this.props.sortClickHandler} setCurrentSortField={_this.setCurrentSortField} getCurrentSortField={_this.getCurrentSortField}/>
            );
        });

        return (
            <ul className="courseQuickLinks clearfix">
                <li className="sorting hide">
                    {this.getIntlMessage('sortBy')}: <a href="#" data-val={this.state.selectedField}>{this.getIntlMessage(this.state.selectedField)}</a>
                    <ul className="options">
                        {sortFields}
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
                <span className="no">{data}</span>
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
                <span className="no">{data}</span>
                {this.getIntlMessage('tests')}
            </li>
        );
    }
});

var CourseComposition = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        var data = this.props.data;

        var tutorials = '', classes = '', tests = '';
        if(data.tutorials && data.tutorials > 0){
            tutorials = <CourseTutorials data={data.tutorials} />
        } 

        if(data.classes && data.classes > 0){
            classes = <CourseClasses data={data.classes} />
        } 

        if(data.tests && data.tutorials > 0){
            tests = <CourseTests data={data.tests} />
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

var PriceLine = React.createClass({
    mixins:[IntlMixin],
    render: function(){
        var data = this.props.data;
        var priceStr = this.getIntlMessage('free');
        var priceStrikedStr = "";
        var curr = 'INR';
        if (isNode) {
            curr = global.academy.curr;
        } else {
            curr = window.currency;
        }
        //var curr = window.currency;
        //console.log(data)
        var currSym = {
                        USD:'$',
                        INR:'Rs.'
                    };
        if(data.isPaid){
            if(data.priceList){
                if(data.priceList[curr]){

                    if(data.priceList[curr].priceStriked) {
                        priceStrikedStr = data.priceList[curr].priceStriked;
                        if(priceStrikedStr.length > 0){
                            if(priceStrikedStr[0] != currSym[curr]){
                                priceStrikedStr = currSym[curr] + priceStrikedStr;
                            }
                        }
                    }
                    if(data.priceList[curr].price) {
                        priceStr = data.priceList[curr].price;
                        if(priceStr.length > 0){
                            if(priceStr[0] != currSym[curr]){
                                priceStr = currSym[curr] + priceStr;
                            }
                        }
                    }
                }
            }
        }else{
            priceStr = this.getIntlMessage('free');
        }

        return(
                <div className="price"> {priceStr} <span className="strikeIt">{priceStrikedStr}</span></div>

            )
    }
});
//<p><span class="h3">$12</span> </p>
var CourseEnrollees = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        var data = this.props.data;
        var enrollees = data.enrollees;
        var count = data.count;

        if(enrollees === undefined) enrollees = [];

        var enrolleeString = '';
        var hasHaveEnrolled = '';
        if(enrollees.length == 0){
            enrolleeString = 'no one has enrolled';
        }else if (count < 2) {
            enrolleeString = enrollees[0];
            hasHaveEnrolled = this.getIntlMessage('hasEnrolled');
        } else {
            enrolleeString = enrollees[0] + ' ' + this.getIntlMessage('and') + ' ' + (count - 1) + ' ' + this.getIntlMessage('others') + ' ';
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

var SelfPacedDate = React.createClass({
    mixins:[IntlMixin],
    render: function(){
        var data = this.props.data;

        return (
                <ul className="placed">
                    <li>
                        {this.getIntlMessage('selfPaced')} 
                        <span className="date">
                            {this.getIntlMessage('publishedDate')}: <FormattedDate value={data.publishedDate || 0} format='short' />
                        </span>
                    </li>
                </ul>
            )
    }
});

var LiveForDate = React.createClass({
    mixins:[IntlMixin],
    render: function(){
        var data = this.props.data;
        return (
                <ul className="placed">
                    <li>
                        {this.getIntlMessage('liveFor')} {data.liveFor} {this.getIntlMessage('week')}
                        <span className="date">
                            {this.getIntlMessage('startDate')}: <FormattedDate value={data.startDate || 0} format='short' />
                        </span>
                    </li>
                </ul>
            )
    }
});


var CourseListItem = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        var data = this.props.data;
        /*
        var priceText = data.price;
        if (data.price == 0) {
            priceText = this.getIntlMessage('free');
        }
        */
         data.priceData = {};
        if(data.isPaid) data.priceData.isPaid = data.isPaid;
        if(data.priceList) data.priceData.priceList = data.priceList;
        var courseLogo = data.courseLogo;
        //courseLogo = courseLogo.replace('wqimgqe.s3.amazonaws.com','wqimg.authordm.com');
        var tutorLogo = data.tutor.logo;
        var courseDetailLink = "course/" + data.courseDetailLink;
        data.enrolleesData = {};
        data.enrolleesData.enrollees = data.enrollees;
        data.enrolleesData.count = data.learnerCount;
        var selfOrLive;
        if(data.courseScheduleType.type === 'SELF_PACED'){
            var selfData = {};
            selfData.publishedDate = data.courseScheduleType.publishedDate;
            selfOrLive = <SelfPacedDate data={selfData} />;
        }else if(data.courseScheduleType.type === "INSTRUCTOR_LED"){
            var liveData = {};
            liveData.liveFor = data.courseScheduleType.weekCount;
            liveData.startDate = data.courseScheduleType.startDate;
            selfOrLive = <LiveForDate data={liveData} />;
        }
        return (
            <li className="item clearfix">
                <div className="col-1">
                    <figure className="courseImg">
                        <a href={courseDetailLink}><img src={courseLogo} alt={data.title} /></a>
                        <figcaption className="captionWrap">
                            <div className="gutter clearfix">
                                <span className="academy vMiddleWrap">
                                    <span className="vMiddle"><img src={tutorLogo} /></span>
                                </span>
                                <span className="caption">{data.tutor.name}</span>
                            </div>
                        </figcaption>
                    </figure>
                </div>
                <div className="col-2 content">
                    <h2><a href={courseDetailLink}>{data.title}</a></h2>
                    {selfOrLive}
                    <CourseComposition data={data.courseComposition} />
                </div>
                <div className="col-3">
                    <ul className="ctaGroup">
                        <li className="cta noRadius">
                            <CourseEnrollees data={data.enrolleesData}/>

                            <PriceLine data={data.priceData} />
                        </li>

                        <li className="cta wired"><a href={courseDetailLink}>{this.getIntlMessage('learnMore')}</a></li>

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
            <div className="cta wired" onClick={this.props.clickHandler}>
                <a href="">{this.getIntlMessage('viewMore')}</a>
            </div>
        );
    }
});

var Section = React.createClass({
    mixins: [IntlMixin],
    getInitialState: function () {
        return {
            meta: {},
            data: [],
            allRecordsFetched: false
        };
    },
    componentWillMount: function () {
        var allRecordsFetched = (this.props.data.result.length < this.props.data.meta.pageSize);

        this.setState({
            meta: this.props.data.meta,
            data: this.props.data.result,
            allRecordsFetched: allRecordsFetched
        });
    },
    loadCoursesFromServer: function (payload, isAppend) {
        var _this = this;

        if (payload && (!this.state.allRecordsFetched || !isAppend)) {
            $.ajax({
                url: '',
                data: {payload: payload},
                cache: false,
                dataType: 'json',
                contentType: "application/json",
                type: 'GET',
                success: function (response) {
                    try {
                        var state = {
                            meta: _this.state.meta,
                            data: _this.state.data,
                            allRecordsFetched: _this.state.allRecordsFetched
                        };

                        if (isAppend) {
                            state.data = state.data.concat(response.result);
                        } else {
                            state.data = response.result;
                        }

                        state.meta = response.meta;

                        var allRecordsFetched = (response.result.length < state.meta.pageSize);
                        state.allRecordsFetched = allRecordsFetched;

                        _this.setState(state);
                    } catch (ex) {
                        console.log('Exception inside loadCoursesFromServer ajax success: ' + ex.message);
                    }
                },
                error: function (xhr, status, err) {
                    console.log('Exception inside loadCoursesFromServer ajax error: ' + err);
                }
            });
        }
    },
    viewMoreClickHandler: function (event) {
        event.preventDefault();
        var payload = {};
        var _this = this;
        try {
            payload.page = (_this.state.meta.page + 1);
            payload.pageSize = _this.state.meta.pageSize;
            payload.sortField = _this.state.meta.sortField;
            payload.order = _this.state.meta.order;
        } catch (ex) {
            console.log("Exception inside viewMoreClickHandler: " + ex);
            return;
        }

        this.loadCoursesFromServer(payload, true);
    },
    sortClickHandler: function (event) {
        event.preventDefault();

        var payload = {};
        var _this = this;
        try {
            payload.page = 0;
            payload.pageSize = _this.state.meta.pageSize;
            payload.sortField = event.target.getAttribute('data-sort-field');
            payload.order = _this.state.meta.order;
        } catch (ex) {
            console.log("Exception inside sortClickHandler: " + ex);
            return;
        }

        this.loadCoursesFromServer(payload, false);
    },
    render: function () {
        var data = this.state.data;
        var meta = this.state.meta;

        var courseItems = data.map(function (courseItem) {
            return (
                <CourseListItem key={courseItem.courseId} data={courseItem} />
            );
        });

        return (
            <section id="courseListing" className="moduleBody" >
                <div className="moduleWrapper" >
                    <CourseQuickLinks sortClickHandler={this.sortClickHandler} />
                    <ul className="courseList">
                        {courseItems}
                    </ul>
                    { !this.state.allRecordsFetched ? <ViewMore data={meta} clickHandler={this.viewMoreClickHandler}/> : null }
                </div>
            </section>
        );
    }
});


if (isNode) {
    module.exports = Section;
} else {
    window.Section = Section;
   /* var componentName = 'cCourses_cCourseList';

    var dataName = eval('var_' + componentName);
    var lokk = eval('localkk')
    var mekk = eval('messkk');
    var fokk = eval('formkk');

    ReactDOM.render(<Section data={dataName} messages={mekk} formats={fokk} locales={lokk} />,
        document.getElementById('container_'+componentName));*/

}