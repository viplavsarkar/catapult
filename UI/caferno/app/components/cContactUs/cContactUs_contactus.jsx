
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
            <section id="contactUs" className="moduleBody generic">
                <div className="moduleWrapper clearfix">
                    <h1 className="title">Contact Us</h1>
                    <div className="formElement">
                        <form>
                            <fieldset>
                                <legend className="relatedInfo">We would love to hear from you! Please fill out the form below for any query or concern.</legend>
                                <ul className="fieldList">
                                    <li className="field">
                                        <label for="name">Name</label>
                                        <input id="name" type="text" />
                                    </li>
                                    <li className="field">
                                        <label for="email">Email</label>
                                        <input id="email" type="email" />
                                    </li>
                                    <li className="field">
                                        <label for="phone">Phone</label>
                                        <input id="phone" type="tel" />
                                    </li>
                                    <li className="field">
                                        <label for="message"></label>
                                        <textarea placeholder="Your comment here..." name="msg" id="message" cols="30" rows="5"></textarea>
                                    </li>
                                    <li className="fieldBtn">
                                        <input className="cta filledOrng2" type="button" value="Send" />
                                    </li>
                                    <li className="separator">
                                        OR
                                    </li>
                                    <l1 className="phoneNum">
                                        <span className="no">+91-918273645</span> , <span className="no">017248785155</span> 
                                    </l1>
                                </ul>
                            </fieldset>
                        </form>
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