
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
var ButtonViewRecording = React.createClass({
    mixins: [IntlMixin],
    render: function(){
        var data = this.props.data;
        if(data != '#'){
            return(
            <div className="col-2">
                <div className="cta filledOrng2 inline"><a href={data}>View Recording</a></div>
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
                            <p>Member attended: {data.membersAttended}</p>
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
                                                <span className="calenderDate">{data.classStart.date}</span> {data.classStart.time}
                                                <span className="date">{data.classStart.status}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="classFixtures">
                                        <p>{data.classFixtures.status}</p>
                                        <div className="cta filledOrng2 inline">
                                            <a href={data.classFixtures.linkViewRecording}>VIEW RECORDING</a>                                       
                                        </div>
                                        <div className="cta filledOrng2 inline">
                                            <a href={data.classFixtures.linkViewRecording}>DOWNLOAD RECORDING</a>
                                        </div>
                                    </div>
                                    <div className="innerTabsWrap">
                                        <ul className="tabs clearfix">
                                            <li data-tab="schedule" className="active"><a href="#">Class Schedule</a></li>
                                            <li data-tab="sessions"><a href="#">Sessions Joined by you</a></li>
                                        </ul>
                                        <div className="tabsContentWrap">
                                            <div data-tab="schedule" className="contentOfTab">
                                                <ClassSchedule data={data.classSessions} />
                                            </div>
                                            <div data-tab="sessions" className="contentOfTab">
                                                <p>You have not joined in any class of this recurring series. </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <ul className="ctaGroup">
                                        <li className="cta noRadius">
                                            <ul className="type">
                                                <li>
                                                    <span className="no">{data.classStats.durationInMins}</span> MINUTES
                                                </li>
                                                <li>
                                                    <span className="no">{data.classStats.attendesCount}</span> Attendees
                                                </li>
                                            </ul>
                                            <span className="msg"> {data.classStats.status}</span>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
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