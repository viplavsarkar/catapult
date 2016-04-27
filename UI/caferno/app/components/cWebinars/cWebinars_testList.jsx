
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

        return (
                <li className="item clearfix">
                    <div className="col-2 content">
                        <h2><a href={data.classUrl}>{data.title}</a></h2>
                        <p className="shortInfo">{this.getIntlMessage('public')}</p>
                        <ul className="placed">
                            <li>
                                {data.startAt}
                                <span className="date">{data.recordingStatus}</span>
                            </li>
                        </ul>
                        <ul className="type clearfix">
                            <li>
                                <span className="no">{this.duration}</span> {this.getIntlMessage('minutes')}
                            </li>
                            <li>
                                <span className="no">{this.attendeeCount}</span> {this.getIntlMessage('attendees')}
                            </li>
                        </ul>
                    </div>
                    <div className="col-3">
                        <ul className="ctaGroup">
                            <li className="cta noRadius inlineBlc">
                                <TutorInfo data={data.tutor} />
                            </li>
                            <li className="cta filledOrng"><a href="#">{this.getIntlMessage('viewRecording')}</a></li>
                        </ul>
                    </div>
                </li>
            )
    }
});
var Section = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        var data = this.props.data.result;

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
                    <div className="cta wired">
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