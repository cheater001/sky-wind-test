'use strict';

// Depends
var path = require('path');
var webpack = require('webpack');
var Manifest = require('manifest-revision-webpack-plugin');

var TextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer-core');

var HtmlPlugin = require('html-webpack-plugin');

module.exports = function (_path) {
    var rootAssetPath = _path + 'app';

    return {
        // entry points
        entry: {
            application: _path + '/app/index.js',
            vendors: [
                'lodash',
                'jquery', 
                'angular'
            ]
        },

        // output system
        output: {
            path: path.join(_path, 'dist'),
            filename: path.join('assets', 'js', '[name].bundle.[chunkhash].js'),
            chunkFilename: '[id].bundle.[chunkhash].js',
            publicPath: '/'
        },

        // resolves modules
        resolve: {
            extensions: ['', '.js'],
            modulesDirectories: ['node_modules'],
            alias: {
                _modules: path.join(_path, 'app', 'modules'),
                _images: path.join(_path, 'app', 'assets', 'images'),
                _stylesheets: path.join(_path, 'app', 'assets', 'stylesheets')
            }
        },

        // resolve loaders
        resolveLoader: {
            modulesDirectories: ['node_modules'],
            moduleTemplates: ['*-loader', '*'],
            extensions: ['', '.js']
        },

        // modules resolvers
        module: {
            loaders: [
                {
                    test: /jquery\.js$/,
                    loader: 'expose?jQuery'
                },
                {
                    test: /\.html$/,
                    loader: "ng-cache?prefix=[dir]/[dir]"
                },
                {
                    test: /\.css/,
                    loader: TextPlugin.extract('style', 'css?sourceMap!postcss')
                },
                {
                    test: /\.sass$/,
                    loader: TextPlugin.extract('style', 'css?sourceMap!postcss!sass?indentedSyntax=true&sourceComments=true')
                },
                {
                    test: /\.scss$/,
                    loader: TextPlugin.extract('style', 'css?sourceMap!postcss!sass?sourceComments=true')
                },
                {
                    test: /\.(ttf|eot|woff|woff2|png|ico|jpg|jpeg|gif|svg)$/i,
                    loaders: ['file?context=' + rootAssetPath + '&name=assets/static/[ext]/[name].[hash].[ext]']
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])$/,
                    loader: 'url?limit=10000&mimetype=application/font-woff'
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])$/,
                    loaders: ['file?context=' + rootAssetPath + '&name=assets/static/[ext]/[name].[hash].[ext]']
                }
            ]
        },
        sassLoader: {
            precision: 8
        },
        postcss: [autoprefixer({browsers: ['last 5 versions']})],
        plugins: [
            new webpack.EnvironmentPlugin('NODE_ENV'),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            }),

            new webpack.optimize.CommonsChunkPlugin('vendors', 'assets/js/vendors.[chunkhash].js'),
            new TextPlugin('assets/css/[name].[chunkhash].css'),
            new Manifest(path.join(_path + '/config', 'manifest.json'), {
                rootAssetPath: rootAssetPath,
                ignorePaths: ['.DS_Store']
            }),
            new HtmlPlugin({
                title: 'Parking',
                chunks: ['application', 'vendors'],
                filename: 'index.html',
                template: path.join(_path, 'app', 'assets', 'templates', 'index.html')
            })
        ]
    };
};
