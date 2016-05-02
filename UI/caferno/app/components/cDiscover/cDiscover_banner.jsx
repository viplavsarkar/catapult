
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


var DiscoverBanner = React.createClass({
    mixins: [IntlMixin],
    onclickhandler: function(ev){
        //alert('hurray');
    },
    render: function () {      
        var data = this.props.data.academy;

        var title = data.title;
        if(!title) title = 'Your Academy Where People Come to Learn From Your Courses';
        return (
            <section id="heroHalfImg" className="moduleBody halfBgImg">
                <div className="moduleWrapper clearfix">
                    <div className="col-1 copy">
                        <h1 onClick={this.onclickhandler}>{title}</h1>
                        <p>{data.description}</p>
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
    module.exports = DiscoverBanner; 
} else {
    window.Section = DiscoverBanner;

}