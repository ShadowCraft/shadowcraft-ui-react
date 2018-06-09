var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var GitRevisionPlugin = require('git-revision-webpack-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');
var pkg = require('./package.json');

var gitPlugin = new GitRevisionPlugin();
var bundleCss = ('production' === process.env.NODE_ENV) ? 'css/main-[hash:6].css' : 'css/main.css';
var pluginsWebpack = [
    new ExtractTextPlugin(bundleCss),
    new HtmlWebpackPlugin({
        filename: '../templates/index.html',
        template: 'shadowcraft_ui/templates/webpack-index.ejs',
        cache: true,
        inject: false
    }),
    new webpack.DefinePlugin({
        __COMMIT_HASH__: JSON.stringify(gitPlugin.version())
    })
];

if ('production' === process.env.NODE_ENV) {
    var prodEnv = [
        // This will rm anything except the last four bundles and CSS builds so that we
        // don't fill up the disk full of crap.
        new WebpackShellPlugin({
            onBuildStart: ['find shadowcraft_ui/static -name "bundle-*.js" -printf "%Ts\t%p\n" | sort -nr | cut -f2 | tail -n +5 | xargs rm -f',
                       'find shadowcraft_ui/static/css -name "main-*.css" -printf "%Ts\t%p\n" | sort -nr | cut -f2 | tail -n +5 | xargs rm -f'],
            safe: true
        })
    ];

    pluginsWebpack.concat(pluginsWebpack, prodEnv);
}

module.exports = {
    entry: './shadowcraft_ui/js/app.js',
    output: {
        path: __dirname + '/shadowcraft_ui/static',
        filename: ('production' === process.env.NODE_ENV) ? 'bundle-[hash:6].js' : 'bundle.js'
    },
    devtool: ('production' == process.env.NODE_ENV) ? '' : 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: [{
                    loader: 'babel-loader'
                }],
                exclude: /node_modules/
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: pluginsWebpack
};
