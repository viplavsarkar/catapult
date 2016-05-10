var isNode = typeof module !== 'undefined' && module.exports;

if (isNode) {
    var React = require('react');
    var ReactIntl = require('react-intl');
    var ReactDOM = require('react-dom');
} else {
    var React = window.React;
    var ReactIntl = window.ReactIntl;
    var ReactDOM = window.ReactDOM;
}

var IntlProvider = ReactIntl.IntlProvider;
var FormattedMessage = ReactIntl.FormattedMessage;
var FormattedDate = ReactIntl.FormattedDate;

class SortMenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }
    clickHandler(event) {
        try {
            var currentSortField = this.props.getCurrentSortField();
            if (currentSortField.selectedField !== this.props.data.dataVal) {
                this.props.sortClickHandler(event, this.props.data.fieldName);
            }
            this.props.setCurrentSortField(this.props.data.dataVal);
        } catch (ex) {
            console.log('Exception inside SortField clickHandler: ' + ex);
        }
    }
    render() {
        var data = this.props.data;

        return (
            <li data-val={data.dataVal} className={this.props.className}>
                <a href="#" data-sort-field={data.fieldName} onClick={this.clickHandler}>
                    <FormattedMessage id={data.dataVal} description='' defaultMessage='' />
                </a>
            </li>
        );
    }
}

class SortMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedField: ''
        };
        this.setCurrentSortField = this.setCurrentSortField.bind(this);
        this.getCurrentSortField = this.getCurrentSortField.bind(this);
    }
    componentWillMount() {
        this.setState({
            selectedField: 'popularity'
        });
    }
    setCurrentSortField(sortField) {
        this.setState({
            selectedField: sortField
        });
    }
    getCurrentSortField() {
        return this.state;
    }
    render() {
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
                <SortMenuItem key={field.key} className={className} data={field} sortClickHandler={_this.props.sortClickHandler} setCurrentSortField={_this.setCurrentSortField} getCurrentSortField={_this.getCurrentSortField}/>
            );
        });

        return (
            <ul className="courseQuickLinks clearfix">
                <li className="sorting hide">
                    <FormattedMessage id='sortBy' description='' defaultMessage='' /> :
                     <a href="#" data-val={this.state.selectedField}>
                        <FormattedMessage id={this.state.selectedField} description='' defaultMessage='' />
                     </a>
                    <ul className="options">
                        {sortFields}
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
                <span className="no">{data}</span>
                <FormattedMessage id='tutorials' description='' defaultMessage='' />
            </li>
        );
    }
}

class CourseClasses extends React.Component {
    render() {
        var data = this.props.data;

        return (
            <li>
                <span className="no">{data}</span>
                <FormattedMessage id='classes' description='' defaultMessage='' />
            </li>
        );
    }
}

class CourseTests extends React.Component {
    render() {
        var data = this.props.data;

        return (
            <li>
                <span className="no">{data}</span>
                <FormattedMessage id='tests' description='' defaultMessage='' />
            </li>
        );
    }
}

class CourseComposition extends React.Component {
    render() {
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
}

class PriceLine extends React.Component {
    render() {
        var data = this.props.data;
        var priceStr = <FormattedMessage id='free' description='' defaultMessage='' />
        var priceStrikedStr = "";
        var curr = 'INR';
        if (isNode) {
            curr = global.academy.curr;
        } else {
            curr = window.currency;
        }

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
            priceStr = <FormattedMessage id='free' description='' defaultMessage='' />
        }

        return (
                <div className="price"> {priceStr} <span className="strikeIt">{priceStrikedStr}</span></div>
        );
    }
}

class CourseEnrollees extends React.Component {
    render() {
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
            hasHaveEnrolled = <FormattedMessage id='hasEnrolled' description='' defaultMessage='' />
        } else {
            enrolleeString = enrollees[0] + ' ' + <FormattedMessage id='and' description='' defaultMessage='' /> + ' ' + (count - 1) + ' ' + <FormattedMessage id='others' description='' defaultMessage='' /> + ' ';
            hasHaveEnrolled = <FormattedMessage id='haveEnrolled' description='' defaultMessage='' />
        }

        return (
            <div className="moreInfo">
                <span className="name">{enrolleeString}</span>
                <span className="info">{hasHaveEnrolled}</span>
            </div>
        );
    }
}

class SelfPacedDate extends React.Component {
    render() {
        var data = this.props.data;

        return (
            <ul className="placed">
                <li>
                    <FormattedMessage id='selfPaced' description='' defaultMessage='' />
                    <span className="date">
                        <FormattedMessage id='publishedDate' description='' defaultMessage='' />: <FormattedDate value={data.publishedDate || 0} format='short' />
                    </span>
                </li>
            </ul>
        )
    }
}

class LiveForDate extends React.Component {
    render() {
        var data = this.props.data;
        return (
            <ul className="placed">
                <li>
                    <FormattedMessage id='liveFor' description='' defaultMessage='' /> {data.liveFor} <FormattedMessage id='week' description='' defaultMessage='' />
                    <span className="date">
                        <FormattedMessage id='startDate' description='' defaultMessage='' />: <FormattedDate value={data.startDate || 0} format='short' />
                    </span>
                </li>
            </ul>
        )
    }
}

class CourseListItem extends React.Component {
    render() {
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

                        <li className="cta wired"><a href={courseDetailLink}><FormattedMessage id='learnMore' description='' defaultMessage='' /></a></li>
                    </ul>
                </div>
            </li>
        );
    }
}

class ViewMore extends React.Component {
    render() {
        return (
            <div className="cta wired" onClick={this.props.clickHandler}>
                <a href="">
                    <FormattedMessage id='viewMore' description='' defaultMessage='' />
                </a>
            </div>
        );
    }
}

class Section extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meta: {},
            data: [],
            allRecordsFetched: false
        };
        this.loadCoursesFromServer = this.loadCoursesFromServer.bind(this);
        this.viewMoreClickHandler = this.viewMoreClickHandler.bind(this);
        this.sortClickHandler = this.sortClickHandler.bind(this);
    }
    componentWillMount() {
        var allRecordsFetched = (this.props.data.result.length < this.props.data.meta.pageSize);

        this.setState({
            meta: this.props.data.meta,
            data: this.props.data.result,
            allRecordsFetched: allRecordsFetched
        });
    }
    loadCoursesFromServer(payload, isAppend) {
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
    }
    viewMoreClickHandler(event) {
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
    }
    sortClickHandler(event, fieldName) {
        event.preventDefault();

        var payload = {};
        var _this = this;
        try {
            payload.page = 0;
            payload.pageSize = _this.state.meta.pageSize;
            payload.sortField = fieldName;
            payload.order = _this.state.meta.order;
        } catch (ex) {
            console.log("Exception inside sortClickHandler: " + ex);
            return;
        }

        this.loadCoursesFromServer(payload, false);
    }
    render() {
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
                    <SortMenu sortClickHandler={this.sortClickHandler} />
                    <ul className="courseList">
                        {courseItems}
                    </ul>
                    { !this.state.allRecordsFetched ? <ViewMore data={meta} clickHandler={this.viewMoreClickHandler}/> : null }
                </div>
            </section>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <IntlProvider data={this.props.data} messages={this.props.messages} locale={this.props.locale} formats={this.props.formats}>
                <Section data={this.props.data} />
            </IntlProvider>
        );
    }
}

if (isNode) {
    module.exports = App;

} else {
    window.Section = App;
}