var path = require('path');
var webpack = require('webpack');

var loader = require('./loader.js');
var dev = require('./dev.js');
var plugins = require('./plugins.js');


module.exports = {
    entry: './src/main.js',
    output: {
        // path: path.resolve(__dirname, '../dist'), // Y:\test
        path: 'D:\source\taimei-hangyu-1-0\src\main\WebContent\dist', // Y:\test
        publicPath: process.env.NODE_ENV == 'production' ? './../../../dist/' : '',
        filename: '[name].build.js' // '[name]-[hash].js'
    },
    module: loader,
    resolve: {
        extensions: ['.js', '.vue', '.less', '.scss', '.css', '.less'], //后缀名自动补全
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '$src': path.resolve('src')
        }
    },
    devServer: dev,
    performance: {
        hints: false
    },
    devtool: process.env.NODE_ENV == 'production' ? '#nosources-source-map' : '#eval-source-map',
    plugins: plugins,
};
