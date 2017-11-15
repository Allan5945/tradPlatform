var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
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
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader', 'less-loader']
            }),
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
            test: /\.(eot|ttf|woff|woff2|otf)$/,
            loader: "file-loader"
            // loader: "url-loader?limit=1000000&name=fonts/[name][hash:8].[ext]"
        }
    ]
}