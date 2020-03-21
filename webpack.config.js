var path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './index.js',
    watchOptions: {
        ignored: /node_modules/
    },
    devServer: {
        stats: "errors-only",
        overlay: true,
        contentBase: path.join(__dirname, 'dist'),
        host: process.env.HOST,
        port: process.env.PORT,
        open: true,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader',],
            },
        ]
    },

};