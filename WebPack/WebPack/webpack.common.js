//创建一个path模块
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var webpack = require('webpack');
//var BomPlugin = require('webpack-utf8-bom');
module.exports = {
    //入口，表示要用webpack打包哪个文件
    entry: './src/main.js',
    resolve: {
        alias: { // 配置别名
            '@': path.resolve(__dirname, 'src/')
        },
        extensions: [".js", ".vue", ".json"]
    },
    externals: {

    },
    module: {
        //处理css模块处理规则，处理顺序从右到左
        rules: [
            //{
            //    test: /\.m?js$/,
            //    exclude: /(node_modules|bower_components)/,//加快编译速度，不包含node_modules文件夹内容，node_modules本身进行过ES5转码
            //    use: {
            //        loader: 'babel-loader',
            //        options: {
            //            presets: ['@babel/preset-env'],
            //            cacheDirectory:true
            //        }
            //    }
            //},
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader', options: {
                            name: 'dirname/[contenthash].[ext]',
                        },
                    },
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    'url-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    },
                ],
            },
            //{
            //    test: /\.js$/,
            //    exclude: /node_modules/,
            //    loader: 'eslint-loader',
            //    options: {
            //        fix: true
            //    },
            //},
        ]
    },
    //插件配置
    plugins: [
        new htmlWebpackPlugin({
            //在dist内新建index.cshtml文件
            filename: 'index.cshtml',
            template: path.resolve(__dirname, './src/template.cshtml'),
            title: 'webpack is good',
            minify: {
                collapseWhitespace: true,
                removeComments: true,//移除注释
                removeAttributeQuotes: true//移除属性向导
            }
        }),
        //指定清理dist目录多余的插件
        new CleanWebpackPlugin(),
        //new BomPlugin(true)
    ],
}