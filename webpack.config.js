var webpack = require('webpack');  
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {  
  entry: [
    "./shadowcraft_ui/js/app.js"
  ],
  output: {
    path: __dirname + '/shadowcraft_ui/static',
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
    new ExtractTextPlugin('css/main.css', {
      allChunks: true
    })
  ]
};
