var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports =  {
    rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                }
            }
        },
        {
            test: /(\.css|\.scss|\.less)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                //resolve-url-loader may be chained before sass-loader if necessary
                use: ['css-loader', 'sass-loader','less-loader']
            }),
            // loader: ['style-loader','css-loader','sass-loader','less-loader'],
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },
        {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]?[hash]'
            }
        }
    ]
}