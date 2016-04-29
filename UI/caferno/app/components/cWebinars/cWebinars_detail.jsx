
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
        return(
                <li>
                    <div className="clearfix">
                        <div className="col-1">
                            <p className="recurringDate">{data.startAt}</p>
                            <p>{this.getIntlMessage('membersAttended')}: {data.membersAttended}</p>
                            <p>{data.status}</p>
                        </div>
                        <ButtonViewRecording data={data.linkViewRecording} />
                    </div>
                </li>
            )
    }
});

var ClassSchedule = React.createClass({
    mixins: [IntlMixin],
    render: function(){
        var data = this.props.data;
        var scheduleItems = data.map(function(eachScheduleItem){
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

var WebinarDetailSummary = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        var data = this.props.data;

        return (
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
                                    </figure>
                                </div>
                                <div className="col-2 content">
                                    <h2>{data.classTitle}</h2>
                                    <div className="relatedOpt">
                                        <ul className="placed">
                                            <li>
                                                <span className="calenderDate">
                                                	<FormattedDate value={data.classStart.date} day="numeric" />&#160;
                                                	<FormattedDate value={data.classStart.date} month="short" />
                                                </span>
                                                <FormattedDate value={data.classStart.date} year="numeric"/>&#160;
                                                <FormattedTime value={data.classStart.date} />
                                                <span className="date">{data.classStart.status}</span>
                                                
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="classFixtures">
                                        <p>{data.classFixtures.status}</p>
                                        <div className="cta filledOrng2 inline">
                                            <a href={data.classFixtures.linkViewRecording}>{this.getIntlMessage('viewRecording')}</a>
                                        </div>&#160;&#160;
                                        <div className="cta filledOrng2 inline">
                                            <a href={data.classFixtures.linkViewRecording}>{this.getIntlMessage('downloadRecording')}</a>
                                        </div>
                                    </div>
                                    <div className="innerTabsWrap">
                                        <ul className="tabs clearfix">
                                            <li data-tab="schedule" className="active"><a href="#">{this.getIntlMessage('classSchedule')}</a></li>
                                            <li data-tab="sessions"><a href="#">{this.getIntlMessage('sessionsJoinedByYou')}</a></li>
                                        </ul>
                                        <div className="tabsContentWrap">
                                            <div data-tab="schedule" className="contentOfTab">
                                                <ClassSchedule data={data.classSessions} />
                                            </div>
                                            <div data-tab="sessions" className="contentOfTab">
                                                <p>{this.getIntlMessage('recurringClassSeriesNotJoined')}. </p>
                                            </div>
                                        </div>
                                    </div>
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
                                            <span className="msg"> {data.classStats.status}</span>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <MetaDetail data={data}/>
                </section>
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