
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
        var data = this.props.data;
        return (
            <section id="heroHalfImg" className="moduleBody halfBgImg">
                <div className="moduleWrapper clearfix">
                    <div className="col-1 copy">
                        <h1 onClick={this.onclickhandler}>{data.title}</h1>
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