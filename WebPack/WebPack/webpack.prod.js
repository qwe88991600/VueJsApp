//创建一个path模块
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');
let prodConfig = {
    //入口，表示要用webpack打包哪个文件
    //设置成生产模式才可以打包成css样式
    mode: 'production',
    output: {
        //指定打包好的文件输出都某个目录中
        path: path.resolve(__dirname, 'dist'),
        filename: 'buddle.js'
    },
    //模块处理
    module: {
        //处理css模块处理规则，处理顺序从右到左
        rules: [
            {
                test: /\.(sc|sa|c)ss$/,
                use: [MiniCssExtractPlugin.loader,
                { loader: 'css-loader', options: { sourceMap: true } },
                ]
            },
            
        ]
    },
    //插件配置
    plugins: [
        new MiniCssExtractPlugin({
            //不判断是否生产模式
            //filename: devMode ? '[name].css' : '[name].[hash].css'
            filename: '[name][hash].css',//设置最终输出的文件名
            chunkFilename: '[id][hash].css'
        }),

    ],
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin({}),
            new UglifyJsPlugin({
                //缓存与并行
                //启用高速缓存和多进程并行运行。
                //启用文件缓存。缓存目录的默认路径 sourceMap默认为false
                /*parallel
                类型：Boolean|Number违约：false
                使用多进程并行运行来提高构建速度.默认并发运行次数
                */
                cache: true, parallel: true, sourceMap: false
            }),
        ],
    }
}

module.exports = merge(common, prodConfig);