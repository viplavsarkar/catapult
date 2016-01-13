var BCourses = function(req, res, next){
    this.req    = req;
    this.res    = res;
    this.next   = next;
};

BCourses.prototype.getBundle = function(){
    console.log('BCourses:getBundle()');

    var thisObj = this;

    var browserify = require('browserify'),
        literalify = require('literalify');

    console.log('bundle.js is on the way...');

    thisObj.res.setHeader('Content-Type', 'text/javascript')

    // Here we invoke browserify to package up browser.js and everything it requires.
    // DON'T do it on the fly like this in production - it's very costly -
    // either compile the bundle ahead of time, or use some smarter middleware
    // (eg browserify-middleware).
    // We also use literalify to transform our `require` statements for React
    // so that it uses the global variable (from the CDN JS file) instead of
    // bundling it up with everything else
    browserify()
      .add('./core/jbrowser.js')
      .transform(literalify.configure({
        'react': 'window.React',
        'react-dom': 'window.ReactDOM',
      }))
      .bundle()
      .pipe(thisObj.res);

}

BCourses.prototype.getCoursesScreen = function(){
    console.log('BCourses get log screen html')
    var thisObj = this;

    var http = require('http'),
    browserify = require('browserify'),
    literalify = require('literalify'),
    React = require('react'),
    NodeJSX = require('node-jsx'),
    ReactDOMServer = require('react-dom/server'),
    DOM = React.DOM, body = DOM.body, div = DOM.div, script = DOM.script;

    NodeJSX.install();

    // This is our React component, shared by server and browser thanks to browserify
    App = React.createFactory(require('./vCourses.jsx'))

    if(this.req.url == '/') {
        console.log('this.req.url=/');
        thisObj.res.setHeader('Content-Type', 'text/html');

        // `props` represents the data to be passed in to the React component for
        // rendering - just as you would pass data, or expose variables in
        // templates such as Jade or Handlebars.  We just use some dummy data
        // here (with some potentially dangerous values for testing), but you could
        // imagine this would be objects typically fetched async from a DB,
        // filesystem or API, depending on the logged-in user, etc.
        var props = {data:[
            {
                key: 1,
                title: 'MySQL Database Administration',
                logo: 'asset/image/courses/courses_1_221x140.jpg',
                session: {
                    title: 'Fundamentals of Data Structures',
                    time: 1452501069,
                },
                duration: 60,
                learners: [
                    {key: 1, name: 'Ashutosh', profileUrl: '#'},
                    {key: 2, name: 'Varinder', profileUrl: '#'},
                    {key: 3, name: 'Biplab', profileUrl: '#'},
                    {key: 4, name: 'Dinkar', profileUrl: '#'},
                ],
                weeks: 8,
                weeksCompleted: 2
            },
            {
                key: 2,
                title: 'MySQL Database Administration3',
                logo: 'asset/image/courses/courses_2_221x140.jpg',
                session: {
                    title: 'Fundamentals of Data Structures',
                    time: 1452501069,
                },
                duration: 60,
                learners: [
                    {key: 1, name: 'Ashutosh', profileUrl: '#'},
                    {key: 2, name: 'Varinder', profileUrl: '#'},
                    {key: 3, name: 'Biplab', profileUrl: '#'},
                    {key: 4, name: 'Dinkar', profileUrl: '#'},
                ],
                weeks: 8,
                weeksCompleted: 2
            }
        ] };

        // Here we're using React to render the outer body, so we just use the
        // simpler renderToStaticMarkup function, but you could use any templating
        // language (or just a string) for the outer page template
        var html = ReactDOMServer.renderToStaticMarkup(body(null,

            // The actual server-side rendering of our component occurs here, and we
            // pass our data in as `props`. This div is the same one that the client
            // will "render" into on the browser from browser.js
            div({id: 'tabContentWrap', dangerouslySetInnerHTML: {__html:
            ReactDOMServer.renderToString(App(props))
            }}),

            // The props should match on the client and server, so we stringify them
            // on the page to be available for access by the code run in browser.js
            // You could use any var name here as long as it's unique
            script({dangerouslySetInnerHTML: {__html:
            'var APP_PROPS = ' + thisObj.safeStringify(props) + ';'
            }}),

            // We'll load React from a CDN - you don't have to do this,
            // you can bundle it up or serve it locally if you like
            script({src: '//fb.me/react-0.14.3.min.js'}),
            script({src: '//fb.me/react-dom-0.14.3.min.js'}),

            // Then the browser will fetch and run the browserified bundle consisting
            // of browser.js and all its dependencies.
            // We serve this from the endpoint a few lines down.
            script({src: '/courses/bundle.js'})
    ));

    // Return the page to the browser
    thisObj.res.end(html);

    }else{
        console.log('this.req.url=' + this.req.url);
    }
}

// A utility function to safely escape JSON for embedding in a <script> tag
BCourses.prototype.safeStringify = function(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

module.exports = BCourses;