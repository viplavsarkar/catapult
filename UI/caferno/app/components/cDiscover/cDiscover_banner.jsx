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


var Section = React.createClass({
    mixins: [IntlMixin],    
    render: function () {      

        return (
            <section id="heroHalfImg" class="moduleBody halfBgImg">
                <div class="moduleWrapper clearfix">
                    <div class="col-1 copy">
                        <h1>LearnDesk Online Academy</h1>
                        <p>Proving the concept of WizIQ - Online Academy Platform</p>
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

}