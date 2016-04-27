
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
        var priceStr = "Free";
        var priceStrikedStr = "";
        if(data.price){
            if(data.price === 0 || data.price === '0'){
                priceStr = "Free";
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
       
        return(
             <li className="item">
                <div className="innerContent">
                    <figure>
                        <a href="#">
                            <img src={data.courseLogo} alt="" />
                        </a>
                        <figcaption>
                            <a href={data.courseDetailLink}>{data.title}</a>
                            <small>{data.learnerCount} {this.getIntlMessage('common.learners')}</small>
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
                <a href="#">View More</a>
            </div>
            )
    }
});

var DiscoverSection = React.createClass({
    mixins: [IntlMixin],    
    render: function () {      
        var data = this.props.data.result;
        
        var itemList = data.map(function(eachItem){
            return (
                     <EachSection key={eachItem.courseId} data={eachItem} />
                )
        });
        return (
            <section id="mostPopular" className="moduleBody tiles">
                <div className="moduleWrapper clearfix">
                    <h2 className="title">{this.getIntlMessage('discover.mostPopular')}</h2>
                    <ul className="tilesList clearfix">
                       {itemList}
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