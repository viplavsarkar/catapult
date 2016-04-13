var isNode = typeof module !== 'undefined' && module.exports
  , React = isNode ? require('react') : window.React
  , ReactDOM = isNode ? require('react-dom') : window.ReactDOM
  , ReactIntl = isNode ? require('react-intl') : window.ReactIntl;

    
var IntlMixin = ReactIntl.IntlMixin;
var FormattedMessage = ReactIntl.FormattedMessage;
var FormattedDate = ReactIntl.FormattedDate;

var HeaderLogo = React.createClass({
    render: function () {
        var data = this.props.data;

        return (
            <figure className="logo">
                <img src={data.logo} alt={data.academyName} />
            </figure>
        );
    }
});

Array.prototype.remove = function(elem, all) {
  for (var i=this.length-1; i>=0; i--) {
    if (this[i] === elem) {
        this.splice(i, 1);
        if(!all)
          break;
    }
  }
  return this;
};

var NavigationLink = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        var data = this.props.data;
        if (data.isActive) {
            data.classes.remove('active');      
            data.classes.push('active');
        }
        var classNames = data.classes.join(' ');

        return (
            <li className={classNames}>
                <a href={data.url}>{this.getIntlMessage('header.headerNavigation.navigationItems.' + data.keyName)}</a>
            </li>
        );
    }
});

var HeaderNavigation = React.createClass({
    mixins: [IntlMixin],
    render: function () {
        var data = this.props.data;
        var navigationItems = data.navigationItems.map(function (navigationItem) {
            return (
                <NavigationLink key={navigationItem.key} data={navigationItem} />
            );
        });

        return (
            <ul className="pageHeadNav clearfix">
                {navigationItems}
            </ul>
        );
    }
});

var Header = React.createClass({
    mixins: [IntlMixin],
    onclickhandler: function(ev){alert('this is header');},
    render: function () {
        var data = this.props.data;
        return (
            <header id="pageHeader" className="moduleBody">
                <div onClick={this.onclickhandler} className="moduleWrapper clearfix">
                    <HeaderLogo data={data.header} />
                    <HeaderNavigation data={data.headerNavigation} />
                </div>
            </header>
        );
    }
});

if (isNode) {
    module.exports = Header; 
} else {
    window.Section = Header;
  /*
    var componentName = 'cHeader_header';
    
    var dataName = eval('var_' + componentName);
    //var dakk = eval('datakk');
    var lokk = eval('localkk')
    var mekk = eval('messkk');
    var fokk = eval('formkk');
    
    //BIFROST_APP_PROPS
    ReactDOM.render(<Header data={dataName} messages={mekk} formats={fokk} locales={lokk} />, document.getElementById('container_'+componentName));
    //ReactDOM.render(<Section data={paramName} locales={LOCALES} {...MESSAGES} formats={FORMATS}/>, document.getElementById('pageWrapper'));
    //ReactDOM.render(<Section {...BIFROST_APP_PROPS}/>, document.getElementById('pageWrapper'));
*/
//ReactDOM.render(<Header data={var_cHeader_header} messages={messkk} formats={formkk} locales={localkk}/>,container_cHeader_header);
//ReactDOM.render(function(Header){<Header data={var_cHeader_header} messages={messkk} formats={formkk} locales={localkk}/>},container_cHeader_header);
}