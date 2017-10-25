var webpack = require('webpack')
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = [
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
            warnings: false
        }
    }),
    new webpack.LoaderOptionsPlugin({
        minimize: true
    }),
    new ExtractTextPlugin('[name]-[hash].css'),
    new htmlWebpackPlugin(
        {
            template:"index.html",  // 指定的文件
            filename:'index.html', // 生成 html 文件的文件名
            inject:false,
        }
    )
]