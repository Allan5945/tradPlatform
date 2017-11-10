var path = require('path')
var webpack = require('webpack')


var dev = require('./dev.js')

module.exports = {
  entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
  module: {
      rules: [
          {
              test: /\.vue$/,
              loader: 'vue-loader',
              options: {
                  loaders: {}
              }
          },
          {
              test: /(\.css|\.scss|\.less)$/,
              loaders:['style-loader','css-loader','less-loader','sass-loader']
          },
          {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: /node_modules/
          },
          {
              test: /\.(png|jpg|gif|svg)$/,
              loader: "url-loader?limit=1000&name=img/[name][hash:8].[ext]"
          },
          {
              test: /\.(eot|ttf|woff|woff2|otf)\w*/,
              loader: "file-loader"
          }
      ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.less', '.scss', '.css'], //后缀名自动补全
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer:{
      historyApiFallback: true,
      noInfo: true,
      overlay: true,
      port:8088,
      open:true,
      // openPage:"index.html",  // 修改默认打开的页面  ** 会打开未打包的html ！！
      proxy:{   // 代理请求
          // '**': {  // 本地请求的地址   localhost:8088/*
          //     target: 'www.baidu.com',  // 转发请求的地址  http://dws.XXXXX.com
          //     pathRewrite: {"^/api" : ""}  //如果你不想始终传递 /api ，则需要重写路径：
          // },
          // "/api": {
          //     target: "http://localhost:3000",
          //     pathRewrite: {"^/api" : ""}
          // }
      }
  },
  performance: {
    hints: false
  },
  devtool: process.env.NODE_ENV == 'production' ? '#nosources-source-map' : '#eval-source-map',
};
