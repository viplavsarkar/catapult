
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
                            <h1 className="title">Sign in</h1>
                        </div>
                    </div>
                    <div className="moduleBody generic">
                        <div className="moduleWrapper">
                            <div className="formElement">
                                <form>
                                    <fieldset>
                                        <legend className="relatedInfo">Welcome to LearnDesk Online Academy. Please use your username and password for signing in to our portal.</legend>
                                        <ul className="fieldList">
                                            <li className="field">
                                                <label for="email">Email</label>
                                                <input id="email" name="email" type="email" />
                                            </li>
                                            <li className="field">
                                                <label for="password">Password</label>
                                                <input id="password" name="password" type="password" />
                                            </li>
                                            <li className="field">
                                                <div className="selectionField clearfix">
                                                    <div className="col-1">
                                                        <input type="checkbox" name="" id="remember" />
                                                        <label for="remember">Remember me</label>
                                                    </div>
                                                    <div className="col-2">
                                                        <a href="#">Forgot Password?</a>  | <a href="/SignUp">Sign Up</a>  
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="fieldBtn">
                                                <input className="cta filledOrng2" type="button" value="SIGN IN" />
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