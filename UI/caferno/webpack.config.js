
var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: './app/components/bCourses.jsx',
  output: { path: __dirname + '/app/components/', filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};