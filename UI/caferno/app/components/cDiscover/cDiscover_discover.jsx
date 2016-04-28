
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

var PriceLine = React.createClass({
    mixins:[IntlMixin],
    render: function(){
        var data = this.props.data;
        var priceStr = this.getIntlMessage('free');
        var priceStrikedStr = "";
        if(data.price){
            if(data.price === 0 || data.price === '0'){
                priceStr = this.getIntlMessage('free');
            }else{
                priceStr = data.currency + data.price;

                if(data.priceStriked){
                    if(data.priceStriked === 0 || data.priceStriked === '0'){

                    }else{
                        priceStrikedStr = data.currency + data.priceStriked;
                    }
                }
            }
        }
        return(
                <div className="price"> {priceStr} <span className="strikeIt">{priceStrikedStr}</span></div>
            )
    }
});

var EachSection = React.createClass({
    mixins: [IntlMixin],
    render: function(){
        var data = this.props.data;
        var rowClassName = "item";
        if(this.props.shouldHide === "hide"){
            rowClassName = "item hide"
        }
        var dataCourseLogo = data.courseLogo;
        var courseDetailLink = "course/" + data.courseDetailLink;

        return(
             <li className={rowClassName}>
                <div className="innerContent">
                    <figure>
                        <a href="#">
                            <img src={dataCourseLogo} alt="" />
                        </a>
                        <figcaption>
                            <a href={courseDetailLink}>{data.title}</a>
                            <small>{data.learnerCount} {this.getIntlMessage('learners')}</small>
                        </figcaption>
                    </figure>
                    <PriceLine data={data.priceData} />
                </div>
            </li>
            )
    }
});

var ViewMoreButton = React.createClass({
    mixins: [IntlMixin],
    render:function(){
        return (
            <div className="cta wired">
                <a href="#">{this.getIntlMessage('viewMore')}</a>
            </div>
            )
    }
});

var DiscoverSection = React.createClass({
    getInitialState: function() {
        return {shownow: false};
    },
    mixins: [IntlMixin],
    onclickhandler: function(ev){
        this.setState({shownow: !this.state.shownow});
        //alert('hi');
    },
    render: function () {
        var _ = this;
        var viewMoreBtnClassName = _.state.shownow ? 'cta wired hide' : 'cta wired';
        var data = this.props.data.result;
        var count = 0;
        var itemList = data.map(function(eachItem){
            count++;
            var shouldHide = 'show';
            if(count > 16) {         
                if(_.state.shownow){
                    shouldHide = 'show'
                }else{
                    shouldHide = 'hide';
                }
            }
            //var    shouldHide = eval({'s'});

            return (
                     <EachSection key={eachItem.courseId} data={eachItem} shouldHide={shouldHide} />
                )
        });
        return (
            <section id="mostPopular" className="moduleBody tiles">
                <div className="moduleWrapper clearfix">
                    <h2 className="title">{this.getIntlMessage('mostPopular')}</h2>
                    <ul className="tilesList clearfix">
                       {itemList}
                    </ul>

                    <div className={viewMoreBtnClassName} onClick={this.onclickhandler}>
                        <a href="javascript:void();">{this.getIntlMessage('viewMore')}</a>
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
 
}