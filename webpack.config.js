var webpack = require('webpack');  
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
      }
    ]
  },
  plugins: [
  ]
};
