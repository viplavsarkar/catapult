
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


var DiscoverSection = React.createClass({
    mixins: [IntlMixin],    
    render: function () {      

        return (
            <section id="mostPopular" className="moduleBody tiles">
                <div className="moduleWrapper clearfix">
                    <h2 className="title">Most Popular</h2>
                    <ul className="tilesList clearfix">
                        <li className="item">
                            <div className="innerContent">
                                <figure>
                                    <a href="#">
                                        <img src="/asset/image/courses/145782_large.jpg" alt="" />
                                    </a>
                                    <figcaption>
                                        <a href="#">Programming Basics</a>
                                        <small>7 Learners a</small>
                                    </figcaption>
                                </figure>
                                <div className="price">Free</div>
                            </div>
                        </li>
                        <li className="item">
                            <div className="innerContent">
                                <figure>
                                    <a href="#">
                                        <img src="/asset/image/courses/113322_large.jpg" alt="" />
                                    </a>
                                    <figcaption>
                                        <a href="#">Programming Basics</a>
                                        <small>7 Learners b</small>
                                    </figcaption>
                                </figure>
                                <div className="price"> $99 <span className="strikeIt">$125</span></div>
                            </div>
                        </li>
                        <li className="item">
                            <div className="innerContent">
                                <figure>
                                    <a href="#">
                                        <img src="/asset/image/courses/145782_large.jpg" alt="" />
                                    </a>
                                    <figcaption>
                                        <a href="#">Programming Basics</a>
                                        <small>7 Learners c</small>
                                    </figcaption>
                                </figure>
                                <div className="price">Free</div>
                            </div>
                        </li>
                        <li className="item">
                            <div className="innerContent">
                                <figure>
                                    <a href="#">
                                        <img src="/asset/image/courses/113322_large.jpg" alt="" />
                                    </a>
                                    <figcaption>
                                        <a href="#">Programming Basics</a>
                                        <small>7 Learners d</small>
                                    </figcaption>
                                </figure>
                                <div className="price"> $99 <span className="strikeIt">$125</span></div>
                            </div>
                        </li>
                        <li className="item">
                            <div className="innerContent">
                                <figure>
                                    <a href="#">
                                        <img src="/asset/image/courses/145782_large.jpg" alt="" />
                                    </a>
                                    <figcaption>
                                        <a href="#">Programming Basics</a>
                                        <small>7 Learners e</small>
                                    </figcaption>
                                </figure>
                                <div className="price">Free</div>
                            </div>
                        </li>
                        <li className="item">
                            <div className="innerContent">
                                <figure>
                                    <a href="#">
                                        <img src="/asset/image/courses/113322_large.jpg" alt="" />
                                    </a>
                                    <figcaption>
                                        <a href="#">Programming Basics</a>
                                        <small>7 Learners f</small>
                                    </figcaption>
                                </figure>
                                <div className="price"> $99 <span className="strikeIt">$125</span></div>
                            </div>
                        </li>
                    </ul>
                    <div className="cta wired">
                        <a href="#">View More</a>
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
    module.exports = DiscoverSection; 
} else {
    window.Section = DiscoverSection;
    /*
    var componentName = 'cSample_file';
    
    var dataName = eval('var_' + componentName);
    var lokk = eval('localkk')
    var mekk = eval('messkk');
    var fokk = eval('formkk');
    
    ReactDOM.render(<Section data={dataName} messages={mekk} formats={fokk} locales={lokk} />, document.getElementById('container_'+componentName));
    */
}