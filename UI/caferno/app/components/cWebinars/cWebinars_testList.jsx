
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
        return (
                <li className="item clearfix">
                    <div className="col-2 content">
                        <h2><a href={classUrl}>{title}</a></h2>
                        <p className="shortInfo">{this.getIntlMessage('public')}</p>
                        <ul className="placed">
                            <li>
                                {data.startAt}
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
                            <li className="cta filledOrng"><a href={viewRecording}>{this.getIntlMessage('viewRecording')}</a></li>
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
    viewMoreClickHandler: function (event) {
        event.preventDefault();

        var payload = {};
        var _this = this;
        try {
            payload.page = (_this.state.meta.page + 1);
            payload.pageSize = _this.state.meta.pageSize;
        } catch (ex) {
            console.log("Exception inside viewMoreClickHandler: " + ex);
        }

        if (payload) {
            $.ajax({
                url: '',
                data: { payload: payload },
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

                        state.data = state.data.concat(response.result);
                        state.meta = response.meta;

                        _this.setState(state);
                    } catch (ex) {
                        console.log('Exception inside viewMoreClickHandler ajax success: ' + ex.message);
                    }
                },
                error: function (xhr, status, err) {
                    console.log('Exception inside viewMoreClickHandler ajax error: ' + err);
                }
            });
        }
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
                    <ul className="courseQuickLinks clearfix">
                        <li className="sorting hide">
                            {this.getIntlMessage('sortBy')}: <a href="#" data-val="popularity">{this.getIntlMessage('time')}</a>
                            <ul className="options">
                                <li data-val="popularity">
                                    <a href="#">{this.getIntlMessage('time')}</a>
                                </li>
                                <li data-val="date">
                                    <a href="#">{this.getIntlMessage('popularity')}</a>
                                </li>
                                <li data-val="price">
                                    <a href="#">{this.getIntlMessage('rating')}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="courseList webinar">
                       {itemList}
                    </ul>
                    <div className="cta wired" onClick={this.viewMoreClickHandler}>
                        <a href="#">{this.getIntlMessage('viewMore')}</a>
                    </div>
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