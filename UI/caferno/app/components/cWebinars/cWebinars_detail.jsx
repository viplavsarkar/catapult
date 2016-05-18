
var isNode = typeof module !== 'undefined' && module.exports
  , React = isNode ? require('react') : window.React
  , ReactDOM = isNode ? require('react-dom') : window.ReactDOM
  , ReactIntl = isNode ? require('react-intl') : window.ReactIntl;


var IntlMixin = ReactIntl.IntlMixin;
var FormattedMessage = ReactIntl.FormattedMessage;
var FormattedDate = ReactIntl.FormattedDate;
var FormattedTime = ReactIntl.FormattedTime;

//*****************************************************************
//  YOUR CODE STARTS HERE
//*****************************************************************

var Breadcrum = React.createClass({
    mixins: [IntlMixin],
    render: function(){
        var data = this.props.data;

        return(
                <div>
                    <section id="breadcrumbs" className="moduleBody">
                        <div className="moduleWrapper">
                            <div className="moduleGutter">
                                <ul className="wrapper clearfix">
                                    <li><a href="/webinars/">Webinars</a></li>
                                    <li>{data}</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
                
            );
    }
});

var GetStatusMessage = function(ref, status){
     var msg = '';
     var obj = ref;
     switch(status){
        case 'DONE':
            msg = obj.getIntlMessage('Thisclassisover');// 'This class is over';
            break;
        case 'CANCELLEDBYTEACHER':
            msg = obj.getIntlMessage('ThisSessioncancelled');//'This class has been Cancelled';
            break;
        case 'EXPIRED':
            msg = obj.getIntlMessage('Thissessionnotheld');//'This class was not held';
            break;

        default:
            break;
     }

     return msg;
};

var ButtonViewRecording = React.createClass({
    mixins: [IntlMixin],
    render: function(){
        var data = this.props.data;
        if(data != '#'){
            return(
            <div className="col-2">
                <div className="cta filledOrng2 inline"><a href={data}>{this.getIntlMessage('viewRecording')}</a></div>
            </div>
            )
        }else{
            return (<div></div>)
        }
    }
});

var EnrollButton = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        var data = this.props.data;

        return (
            <div className="col-2">
                <div className="cta filledOrng2 inline"><a href={data}>{this.getIntlMessage('enroll')}</a></div>
            </div>
        );
    }
});

var ClassScheduleEach = React.createClass({
    mixins: [IntlMixin],
    render: function(){
        var data = this.props.data;
       /* var btnViewRec = function(data){
            if(data.linkViewRecording){
                return (<ButtonViewRecording data={data.linkViewRecording} />)
            }else{
                return (<ButtonViewRecording data={data.linkViewRecording} />)
            }
        }*/
        var timeRemaining = new Date(Math.abs(new Date(data.startAt) - new Date()));
        var startsInStr = <p>
            { 'Starts in ' + timeRemaining.getDate() + ' day(s) ' + timeRemaining.getHours() + ' hours ' + timeRemaining.getMinutes() + ' mins' }
            <EnrollButton data='enroll_url' />
        </p>
        var membersAttendedStr = <div>
            <p>
                {this.getIntlMessage('membersAttended') + ': ' + data.membersAttended}
            </p>
            <p>
                {GetStatusMessage(this, data.status)}
            </p>
        </div>

        return(
            <li>
                <div className="clearfix">
                    <div className="col-1">
                        <p className="recurringDate">
                            <FormattedDate value={new Date(data.startAt)} weekday='long' day='numeric' month='long' year='2-digit' hour12='true' hour='numeric' minute='numeric' timeZoneName='long' />
                        </p>
                        {
                            data.status === 'DONE' ?
                                membersAttendedStr
                            :
                                startsInStr
                        }
                    </div>
                    {
                        (data.status === 'DONE' && data.recordingStatus === 'Done') ?
                            <ButtonViewRecording data={data.linkViewRecording} />
                        :
                            null
                    }
                </div>
            </li>
        );
    }
});

var ClassSchedule = React.createClass({
    mixins: [IntlMixin],
    render: function(){
        var data = this.props.data;
        var scheduleItems = data.map(function (eachScheduleItem){
            return (
                    <ClassScheduleEach key={eachScheduleItem.sessionId} data={eachScheduleItem} />
                )
        });
        return (
                <ul className="scheduleList">
                    {scheduleItems}
                </ul>
            )
    }
});

var MetaDetail = React.createClass({
    mixins: [IntlMixin],

    render: function () {
        var data = this.props.data;

        return (
             <section id="webinarsTabs">
                    <div className="tabsHeadWrapper moduleBody">
                        <ul className="tabsHead moduleWrapper clearfix">
                            <li className="overview" data-tab="aboutClass"><a href="#">{this.getIntlMessage('aboutTheClass')}</a></li>
                            <li className="host" data-tab="aboutHost"><a href="#">{this.getIntlMessage('aboutTheHost')}</a></li>
                            <li className="discussion" data-tab="discussion"><a href="#">{this.getIntlMessage('discussion')}</a></li>
                        </ul>
                    </div>
                    <div className="tabsContent moduleBody">
                        <div data-tab="aboutClass" className="moduleWrapper">
                            <div className="primaryDetail">
                                <h2 className="title">{data.classTitle}</h2>
                                <p className="hostedLang">{data.language}</p>
                                <p>{data.description}</p>
                            </div>
                        </div>
                        <div data-tab="aboutHost" className="moduleWrapper">
                            <div className="primaryDetail">
                                <h2 className="title">{data.tutor.name}</h2>
                                <figure className="host">
                                    <img src={data.tutor.profilePic} alt="" />
                                    <figcaption>{data.tutor.name}</figcaption>
                                </figure>
                                <p dangerouslySetInnerHTML={{__html: data.tutor.presenterInfo}} />
                            </div>
                        </div>
                        <div data-tab="discussion" className="moduleWrapper">
                            <div className="primaryDetail">
                                <h2 className="title">{this.getIntlMessage('discussionThread')} <span className="count">{/*data.discussion.count*/}0</span></h2>
                                <div className="formElement">
                                    <form>
                                        <fieldset>
                                            <ul className="fieldList">
                                                <li className="field">
                                                    <textarea placeholder="Have a question or want to say something? Post it here." name="thread" id="discussion" cols="30" rows="5"></textarea>
                                                </li>
                                                <li className="fieldBtn">
                                                    <input className="cta filledOrng2" type="button" value="Post" />
                                                </li>
                                            </ul>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        );
    }
});

var ClassSessionsAndRecordings = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        var data = this.props.data;

        var scheduleTab = null;
        var scheduleTabContents = null;
        var sessionsTab = null;
        var sessionsTabContents = null;
        var noTabs = null;

        switch (data.recurring) {
            case 'Not_Recurring':
                if (data.classStart.status === 'UPCOMING') {
                    noTabs = <div>
                        <p>
                            {'This class runs for ' + data.classStats.durationInMins + ' minutes'}
                        </p>
                        <EnrollButton data={'enroll_url'} />
                    </div>
                } else if (data.classStart.status === 'DONE') {
                    if (data.classSessions.recordingStatus === 'Done')
                        noTabs = <ButtonViewRecording data={data.linkViewRecording} />
                    else if (data.classSessions.recordingStatus === 'Default') {
                        noTabs = null;
                    } else
                        noTabs = <p>
                            Recording in progresss
                        </p>
                }
                break;
            case 'Permanent':
            case 'Recurring':
                // 'Class Schedule' tab and its contents
                scheduleTab = <li data-tab="schedule" className="active">
                    <a href="#">{this.getIntlMessage('classSchedule')}</a>
                </li>
                scheduleTabContents = <ClassSchedule data={data.classSessions} />

                // 'Sessions' tabs and its contents
                sessionsTab = <li data-tab="sessions">
                    <a href="#">{this.getIntlMessage('sessionsJoinedByYou')}</a>
                </li>

                if (data.sessionsJoinedByYou) {

                } else {
                    sessionsTabContents = this.getIntlMessage('recurringClassSeriesNotJoined');
                }
                break;
            default:
                break;
        }

        // Incase of `Recurring` or `Permanent` class, show Session and Recordings tabs
        if (scheduleTab || sessionsTab)
            return (
                <div className="innerTabsWrap">
                    <ul className="tabs clearfix">
                        {scheduleTab}
                        {sessionsTab}
                    </ul>
                    <div className="tabsContentWrap">
                        <div data-tab="schedule" className="contentOfTab">
                            {scheduleTabContents}
                        </div>
                        <div data-tab="sessions" className="contentOfTab">
                            <p>{sessionsTabContents}</p>
                        </div>
                    </div>
                </div>
            );
        else
            // Incase class is `Non-Recurring`
            return(noTabs);
    }
});


var WebinarDetailSummary = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        var data = this.props.data;
        var genderCity = data.tutor.gender;
        if(data.tutor.city)     genderCity += ' | ' + data.tutor.city;
        if(data.tutor.country)  genderCity += ', ' + data.tutor.country;
        var status = data.classStart.status;
        var msg = GetStatusMessage(this, status);

        return (
            <div>
                <Breadcrum data={data.classTitle} />
                <section id="webinarsDetails" className="moduleBody">
                    <div className="moduleWrapper">
                        <ul className="courseList details">
                            <li className="item clearfix">
                                <div className="col-1">
                                    <figure className="courseImg inline">
                                        <img src={data.tutor.profilePic} alt="" />
                                        <figcaption className="captionWrap">
                                            {data.tutor.name}
                                        </figcaption>
                                        <p className="captionWrap"> {genderCity}</p>
                                    </figure>
                                </div>
                                <div className="col-2 content">
                                    <h2>{data.classTitle}</h2>
                                    <div className="relatedOpt">
                                        <ul className="placed">
                                            <li>
                                                <span className="calenderDate">
                                                	<FormattedDate value={new Date(data.classStart.date)} day="2-digit" /><br/>
                                                	<FormattedDate value={new Date(data.classStart.date)} month="short" />
                                                </span>
                                                <FormattedDate value={new Date(data.classStart.date)} year="numeric"/>&#160;
                                                <FormattedTime value={new Date(data.classStart.date)} hour="2-digit" minute="2-digit" />
                                                <span className="date">{data.classStats.status}</span>

                                            </li>
                                        </ul>
                                    </div>
                                    <div className="classFixtures hide">
                                        <p>{data.classFixtures.status}</p>
                                        <div className="cta filledOrng2 inline">
                                            <a href={data.classFixtures.linkViewRecording}>{this.getIntlMessage('viewRecording')}</a>
                                        </div>&#160;&#160;
                                        <div className="cta filledOrng2 inline">
                                            <a href={data.classFixtures.linkViewRecording}>{this.getIntlMessage('downloadRecording')}</a>
                                        </div>
                                    </div>
                                    <ClassSessionsAndRecordings data={data} />
                                </div>
                                <div className="col-3">
                                    <ul className="ctaGroup">
                                        <li className="cta noRadius">
                                            <ul className="type">
                                                <li>
                                                    <span className="no">{data.classStats.durationInMins}</span> {this.getIntlMessage('minutes')}
                                                </li>
                                                <li>
                                                    <span className="no">{data.classStats.attendesCount}</span> {this.getIntlMessage('attendees')}
                                                </li>
                                            </ul>
                                            <span className="msg"> {msg}</span>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <MetaDetail data={data}/>
                </section>
            </div>
        );
    }
});

//*****************************************************************
//  YOUR CODE ENDS HERE
//*****************************************************************

if (isNode) {
    module.exports = WebinarDetailSummary;
} else {
    window.Section = WebinarDetailSummary;
}