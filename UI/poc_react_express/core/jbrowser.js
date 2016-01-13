var React = require('react'),
    ReactDOM = require('react-dom'),
    NodeJSX = require('node-jsx'),
    // This is our React component, shared by server and browser thanks to browserify
    App = React.createFactory(require('./vCourses.jsx'));

//var c_courses = require('./vCourses.jsx');

    NodeJSX.install();

// This script will run in the browser and will render our component using the
// value from APP_PROPS that we generate inline in the page's html on the server.
// If these props match what is used in the server render, React will see that
// it doesn't need to generate any DOM and the page will load faster

ReactDOM.render(App(window.APP_PROPS), document.getElementById('tabContentWrap'))
//ReactDOM.render(<c_courses data={window.APP_PROPS} />, document.getElementById('tabContentWrap'))