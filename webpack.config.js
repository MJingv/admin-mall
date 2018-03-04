const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    entry: './src/app.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/app.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,//大于8k单独成文件
                            name: 'resource/[name].[ext]'
                        }
                    }, 'file-loader'
                ]
            },
            {
                test: /\.(ttf|woff|eot|otf|woff2|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,//大于8k单独成文件
                            name: 'resource/[name].[ext]'
                        }
                    }, 'file-loader'
                ]
            }
        ]
    },
    plugins: [
        //处理html插件
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        //独立css文件

        new ExtractTextPlugin("css/[name].css"),
        //提出公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),


    ],
    debServer: {
        contentBase: './dist',
    }
}