var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var autoprefixer = require('autoprefixer');
var precss = require('precss');

const APP_ROOT = path.join(__dirname, 'src');
const PRODUCTION_API_ENDPOINT = 'https://itframe.innovatete.ch';

module.exports = function makeWebpackConfig (options) {
    var BUILD = !!options.BUILD || process.env.NODE_ENV === 'production';
    var TEST = !!options.TEST;
    var DEBUG = !!options.DEBUG || process.env.DEBUG === 'true';
    var config = {};
    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Entry and output
    config.entry = TEST ? {} : {
        vendor: ['babel-polyfill', path.join(APP_ROOT, 'vendor')],
        app: ['babel-polyfill', path.join(APP_ROOT, 'app')],
    };
    config.output = TEST ? {} : {
        publicPath: '/',
        path: 'dist',
        filename: 'control.js',
    };
    if (BUILD) {
        config.output.filename = 'control-[hash].js';
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Module-specific configuration
    config.eslint = {
        configFile: '.eslintrc',
        failOnError: BUILD || TEST,
    };
    config.postcss = function () {
        return [autoprefixer, precss];
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Module
    config.module = {
        preLoaders: [
            { test: /\.js$/, include: APP_ROOT, loader: 'eslint-loader' },
            { test: /\.css$/, include: APP_ROOT, loader: TEST ? 'null' : 'postcss-loader' },
        ],
        loaders: [
            {
                test: /\.js$/,
                include: APP_ROOT,
                loader: 'ng-annotate!babel-loader',
            },
            {
                test: /\.css$/,
                loader: TEST ? 'null' : 'style-loader!css-loader',
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?]?.*)?$/,
                loader: TEST ? 'null' : 'file-loader?name=res/[name].[ext]?[hash]',
            },
            {
                test: /\.html$/,
                include: APP_ROOT,
                loader: 'ng-cache?prefix=[dir]/[dir]',
            },
            {
                test: /\.json$/,
                include: APP_ROOT,
                loader: 'json',
            },
        ],
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Plugins
    const VENDOR_FILE_NAME = BUILD ? 'vendor-[hash].js' : 'vendor.js';
    config.plugins = [
        new webpack.DefinePlugin({
            IS_PRODUCTION: BUILD,
            API_ENDPOINT: JSON.stringify(process.env.API_ENDPOINT || PRODUCTION_API_ENDPOINT),
        }),
        new webpack.ProvidePlugin({
            'jQuery': 'jquery',
            '$': 'jquery',
        }),
    ];
    if (!TEST) {
        config.plugins.push(
            new HtmlWebpackPlugin({
                inject: true,
                template: path.join(APP_ROOT, 'index.html'),
            }),
            new webpack.optimize.CommonsChunkPlugin('vendor', VENDOR_FILE_NAME)
        );
    }
    if (BUILD) {
        config.plugins.push(
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin()
        );
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Development
    if (!BUILD && !TEST) {
        config.devServer = {
            contentBase: APP_ROOT,
            port: 8900 || process.env.PORT,
            noInfo: true,
            historyApiFallback: true,
        };
    }
    config.devtool = (BUILD || DEBUG) ? 'source-map' : 'cheap-module-eval-source-map';
    if (TEST) {
        config.devtool = 'inline-source-map';
    }
    config.debug = !BUILD;

    return config;
};
