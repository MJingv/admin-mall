const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);
module.exports = {
    entry: './src/app.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/app.js',
        publicPath: WEBPACK_ENV === 'dev' ? '/dist/' : 'http://mall.mjehol.cn/dist/',
    },
    resolve: {
        alias: {
            page: path.resolve(__dirname, 'src/page'),
            components: path.resolve(__dirname, 'src/components'),
            common: path.resolve(__dirname, 'src/common'),
            api: path.resolve(__dirname, 'src/api'),
        }
    },
    module: {
        rules: [
            // react(jsx)语法的处理
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }

                }
            },
            // css文件的处理
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },

            // // sass文件的处理
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                })
            },

            // 图片的配置
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            // 字体图标的配置
            {
                test: /\.(woff|svg|eot|ttf|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'}),
        // 独立css文件
        new ExtractTextPlugin("css/app.css"),
        // 提出公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        })
    ],
    devServer: {
        contentBase: './dist',
        port: 9001,
        historyApiFallback: true,
        proxy: {
            '/manage': {
                target: 'http://admintest.happymmall.com',
                changeOrigin: true,

            },
            '/user/logout.do': {
                target: 'http://admintest.happymmall.com',
                changeOrigin: true,

            }
        },
        compress: true,
    }
};

