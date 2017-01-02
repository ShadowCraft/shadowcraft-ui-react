var webpack = require('webpack');  
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {  
  entry: [
    "./app/js/app.js"
  ],
  output: {
    path: __dirname + '/app/static',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        },
        exclude: /node_modules/
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('css!sass')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('main.css', {
      allChunks: true
    })
  ]
};
