const path = require('path');
<<<<<<< HEAD
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
=======
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack')
>>>>>>> 220531264d1637a344b00ae04eaac04590d18ea3

module.exports = {
    entry: './src/app.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
<<<<<<< HEAD
        filename: 'bundle.js'
    },
    module: {
        rules: [
            // react(jsx)语法的处理
=======
        filename: 'js/app.js'
    },
    module: {
        rules: [
>>>>>>> 220531264d1637a344b00ae04eaac04590d18ea3
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
<<<<<<< HEAD
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader" // 将 JS 字符串生成为 style 节点
                    }, {
                        loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                    }, {
                        loader: "sass-loader" // 将 Sass 编译成 CSS
                    }]
=======
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
>>>>>>> 220531264d1637a344b00ae04eaac04590d18ea3
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
<<<<<<< HEAD
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
=======
                            limit: 8192,//大于8k单独成文件
                            name: 'resource/[name].[ext]'
                        }
                    }, 'file-loader'
                ]
            },
            {
                test: /\.(ttf|woff|eot|otf|woff2|svg)$/,
>>>>>>> 220531264d1637a344b00ae04eaac04590d18ea3
                use: [
                    {
                        loader: 'url-loader',
                        options: {
<<<<<<< HEAD
                            limit: 8192,
                        }
                    }
                ]
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'}),
        // 独立css文件
        new ExtractTextPlugin("css/[name].css"),

    ]
};
=======
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
>>>>>>> 220531264d1637a344b00ae04eaac04590d18ea3
