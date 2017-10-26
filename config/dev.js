

module.exports = {
    historyApiFallback: true,
    noInfo: true,
    openPage:"dist/index.html",  // 修改默认打开的页面  ** 会打开未打包的html ！！
    proxy:{   // 代理请求
        // '**': {  // 本地请求的地址   localhost:8088/engineer/*
        //     target: 'www.baidu.com',  // 转发请求的地址  http://dws.XXXXX.com
        //     pathRewrite: {"^/api" : ""}  //如果你不想始终传递 /api ，则需要重写路径：
        // },
        // "/api": {
        //     target: "http://localhost:3000",
        //     pathRewrite: {"^/api" : ""}
        // }
    }
};