var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var pkg = require('./package.json');

var bundleCss = ('production' === process.env.NODE_ENV) ? 'css/main-[hash:6].css' : 'css/main.css';
var pluginsWebpack = [
    new ExtractTextPlugin(bundleCss),
    new HtmlWebpackPlugin({
        filename: '../templates/index.html',
        template: 'shadowcraft_ui/templates/webpack-index.ejs',
        cache: true,
        inject: false
    })
];

if ('production' === process.env.NODE_ENV) {
    var prodEnv = [
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin()
    ];

    pluginsWebpack.concat(pluginsWebpack, prodEnv);
}

module.exports = {
    entry: './shadowcraft_ui/js/app.js',
    output: {
        path: __dirname + '/shadowcraft_ui/static',
        filename: ('production' === process.env.NODE_ENV) ? 'bundle-[hash:6].js' : 'bundle.js'
    },
    babel: {
        presets: ['es2015', 'react']
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.sass$/,
                loader: ExtractTextPlugin.extract('css!sass')
            },
        ]
    },
    plugins: pluginsWebpack
};
