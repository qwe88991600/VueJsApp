//创建一个path模块
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
//module.exports
let devConfig = {
    //入口，表示要用webpack打包哪个文件
    //entry: './src/main.js',

    mode: 'development',
    output: {
        //指定打包好的文件输出都某个目录中
        path: path.resolve(__dirname, 'dist'),
        filename: 'buddle.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        clientLogLevel: 'silent',
        hot: true,//启用webpack的模块热替换特性，这个需要配合webpack.HotModuleReplacementPlugin使用
        //请注意webpack.HotModuleReplacementPlugin：
        contentBase: path.join(__dirname, 'dist'),//告诉服务器哪里提供内容，默认为当前工作
        compress: true,//一切服务启动gzip压缩
        //host:'0.0.0.0',设置外网访问
        port:8080,//本地端口
        open: true,//是否打开浏览器
        overlay: {
            warnings: true,
            errors: true
        },//显示警告和错误
        publicPath: '/',//次路径下的打包文件可在浏览器中访问
        proxy: {
            '/api': {
                target: 'http://localhost:49702',
                pathRewrite: { '^/api': '/WebPack/Demo1' }
            }
        },
        quiet: true,//除初始启动信息外，其他任何内容都将写入控制台。这也意味着webpack的错误或警告是看不见的。
        watchOptions: {
            poll: true,
            ignored: /node_modules/,//忽略监控的文件夹
            aggregateTimeout:300,//默认值，当第一个文件更改，会在重构前增加延迟
        },//监视文件相关的控件选项,webpack使用文件系统获得文件更改的通知。
        //在某些情况下，这是行不通的。例如，当使用网络文件系统(NFS)时。流浪汉这方面也有很多问题。在这些情况下，使用轮询：

    },
    module: {
        //处理css模块处理规则，处理顺序从右到左
        rules: [
            {
                test: /\.(sc|sa|c)ss$/,
                use: ['style-loader',
                    { loader: 'css-loader', options: { sourceMap: true } },
                ]
            },
           
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),//更容易查看patch的依赖
        new webpack.HotModuleReplacementPlugin()//替换插件
    ]
}
module.exports = merge(common, devConfig);
