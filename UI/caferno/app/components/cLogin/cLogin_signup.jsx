
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
                <section id="signIn">
                    <div className="moduleBody generic withBG">
                        <div className="moduleWrapper clearfix">
                            <h1 className="title">Sign Up</h1>
                        </div>
                    </div>
                    <div className="moduleBody generic">
                        <div className="moduleWrapper">
                            <div className="formElement">
                                <form>
                                    <fieldset>
                                        <legend className="relatedInfo"> Welcome to LearnDesk Online Academy. Sign Up to our academy and start consuming the content.</legend>
                                        <ul className="fieldList">
                                            <li className="subTitle">
                                                Create your WizIQ Account
                                            </li>
                                            <li className="field">
                                                <label for="name">Name</label>
                                                <input id="name" placeholder="Write your name here" name="name" type="text" />
                                            </li>
                                            <li className="field">
                                                <label for="email">Your Email:</label>
                                                <input id="email" placeholder="Enter your email address" name="email" type="email" />
                                            </li>
                                            <li className="field">
                                                <label for="password">Password:</label>
                                                <input id="password" placeholder="Enter a password of 6 or more characters" name="password" type="password" />
                                            </li>
                                            <li className="field">
                                                <label for="password">Country:</label>
                                                <div className="fieldOpt">
                                                    <select name="country" id="country">
                                                        <option selected="selected">Select Country</option>
                                                        <option value="0">India</option>
                                                    </select>
                                                </div>
                                            </li>
                                            <li className="field">
                                                <div className="selectionField clearfix">
                                                    <div className="col-2">
                                                        Already a member? <a href="">Sign in </a>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="fieldBtn">
                                                <input className="cta filledOrng2" type="button" value="CREATE MY ACCOUNT" />
                                            </li>
                                        </ul>
                                    </fieldset>
                                </form>
                            </div>
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