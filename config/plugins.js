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
    new webpack.BannerPlugin('禁止其它组织，公司，个人盗用该项目！'),
    new webpack.LoaderOptionsPlugin({
        minimize: true
    }),
    new ExtractTextPlugin({
        filename:  (getPath) => {
            console.log(getPath)
            return getPath('css/[name]-[hash].css');
        },
        allChunks: true
    }),
    new htmlWebpackPlugin(
        {
            template:"build.html",  // 指定的文件
            filename:process.env.NODE_ENV == 'production' ? 'index.jsp' : 'index.html', // 生成 html 文件的文件名
            inject:true,
            dats:process.env.NODE_ENV == 'production' ? "<%@ page language='java' contentType='text/html; charset=UTF-8'%>" : '',
            minify:{
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:false    //删除空白符与换行符.
            }
        }
    )
]