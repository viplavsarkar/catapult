
var isNode = typeof module !== 'undefined' && module.exports
  , React = isNode ? require('react') : window.React
  , ReactDOM = isNode ? require('react-dom') : window.ReactDOM
  , ReactIntl = isNode ? require('react-intl') : window.ReactIntl;


var IntlMixin = ReactIntl.IntlMixin;
var FormattedMessage = ReactIntl.FormattedMessage;
var FormattedDate = ReactIntl.FormattedDate;

//*****************************************************************
//  YOUR CODE STARTS HERE
//*****************************************************************
var SortMenuItem = React.createClass({
    mixins: [IntlMixin],
    clickHandler: function (event) {
        try {
            var currentSortField = this.props.getCurrentSortField();
            if (currentSortField.selectedField !== this.props.data.dataVal) {
                this.props.sortClickHandler(event);
            }
            this.props.setCurrentSortField(this.props.data.dataVal);
        } catch (ex) {
            console.log('Exception inside SortMenuItem clickHandler: ' + ex);
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

var SortMenu = React.createClass({
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
                fieldName: 'POPULARITY'
            },
            {
                key: 1,
                dataVal: 'time',
                fieldName: 'TIME'
            },
            {
                key: 2,
                dataVal: 'rating',
                fieldName: 'RATING'
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
                    {this.getIntlMessage('sortBy')}: <a href="#" data-val={this.state.selectedField}>{this.getIntlMessage(this.state.selectedField)}</a>
                    <ul className="options">
                        {sortFields}
                    </ul>
                </li>
            </ul>
        );
    }
});

var TutorInfo = React.createClass({
    mixins: [IntlMixin],
    render: function(){
        var data = this.props.data;
        return(
                <figure className="userInfo clearfix">
                    <img src={data.profilePic} alt={this.getIntlMessage('tutor')} />
                    <figcaption><a href="#">{data.name}</a></figcaption>
                </figure>
            )
    }
});
var ViewRecordingBtn = React.createClass({
    mixins: [IntlMixin],
    render: function(){
        var data = this.props.data;
        if(data.recordingStatus === "Deleted"){
            return (
                    <li>RECORDING IN PROGRESS</li>
                )
        }else {
            return(
                    <li className="cta filledOrng"><a href={data.recordingLink}>{this.getIntlMessage('viewRecording')}</a></li>
                )
        }
    }
});

var EachWebinarRoww = React.createClass({
    mixins: [IntlMixin],
    render: function(){
        var data = this.props.data;
        var tutor = data.tutorq;
        var duration = data.duration ? data.duration : 0;
        var attendeeCount= data.attendeeCount ? data.attendeeCount : 0;
        var title = data.title ? data.title : 'No Title';
        var classUrl = data.classUrl ? data.classUrl : '/online-class/' + data.idClassMaster + '-' + title + "/"
        //http://myschool.wizqe.authordm.com/SignIn?returnUrl=/online-class/21142-public-class-0001
        var viewRecording = '/SignIn?returnUrl=' + classUrl;

        var recordingData = {};
        recordingData.recordingStatus = data.recordingStatus;
        recordingData.recordingLink = viewRecording;

        return (
                <li className="item clearfix">
                    <div className="col-2 content">
                        <h2><a href={classUrl}>{title}</a></h2>
                        <p className="shortInfo">{this.getIntlMessage('public')}</p>
                        <ul className="placed">
                            <li>
                                <FormattedDate value={new Date(data.startAt)} format='webinars' />
                                <span className="date">{data.recordingStatus}</span>
                            </li>
                        </ul>
                        <ul className="type clearfix">
                            <li>
                                <span className="no">{duration}</span> {this.getIntlMessage('minutes')}
                            </li>
                            <li>
                                <span className="no">{attendeeCount}</span> {this.getIntlMessage('attendees')}
                            </li>
                        </ul>
                    </div>
                    <div className="col-3">
                        <ul className="ctaGroup">
                            <li className="cta noRadius inlineBlc">
                                <TutorInfo data={data.creator} />
                            </li>
                            <li>
                                <p>{data.creator.city}, {data.creator.country}</p>
                            </li>
                            <ViewRecordingBtn data={recordingData} />
                        </ul>
                    </div>
                </li>
            )
    }
});
var Section = React.createClass({
    mixins: [IntlMixin],
    getInitialState: function () {
        return {
            meta: {},
            data: []
        };
    },
    componentWillMount: function () {
        this.setState({
            meta: this.props.data.meta,
            data: this.props.data.result
        });
    },
    loadWebinarsFromServer: function (payload, isAppend) {
        var _this = this;
        var allRecordsFetched = _this.state.meta.page == _this.state.meta.totalPages;

        if (payload && !allRecordsFetched) {
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
                            data: _this.state.data
                        };

                        if (isAppend) {
                            state.data = state.data.concat(response.result);
                        } else {
                            state.data = response.result;
                        }

                        state.meta = response.meta;

                        _this.setState(state);
                    } catch (ex) {
                        console.log('Exception inside loadWebinarsFromServer ajax success: ' + ex.message);
                    }
                },
                error: function (xhr, status, err) {
                    console.log('Exception inside loadWebinarsFromServer ajax error: ' + err);
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

        this.loadWebinarsFromServer(payload, true);
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

        this.loadWebinarsFromServer(payload, false);
    },
    render: function () {
        var data = this.state.data;

        var itemList = data.map(function(eachItem){
            return (
                     <EachWebinarRoww key={eachItem.classId} data={eachItem} />
                )
        });
        return (
            <section id="webinarListing" className="moduleBody">
                <div className="moduleWrapper">
                    <h1 className="title">{this.getIntlMessage('webinars')}</h1>
                    <SortMenu sortClickHandler={this.sortClickHandler} />
                    <ul className="courseList webinar">
                       {itemList}
                    </ul>
                    {
                        (this.state.meta.page === this.state.meta.totalPages - 1) ?
                        null :
                        <div className="cta wired" onClick={this.viewMoreClickHandler}>
                            <a href="#">{this.getIntlMessage('viewMore')}</a>
                        </div>
                    }
                </div>
            </section>
        );
    }
});

//*****************************************************************
//  YOUR CODE ENDS HERE
//*****************************************************************

if (isNode) {
    module.exports = Section;
} else {
    window.Section = Section;
    /*
    var componentName = 'cSample_file';

    var dataName = eval('var_' + componentName);
    var lokk = eval('localkk')
    var mekk = eval('messkk');
    var fokk = eval('formkk');

    ReactDOM.render(<Section data={dataName} messages={mekk} formats={fokk} locales={lokk} />, document.getElementById('container_'+componentName));
    */
}