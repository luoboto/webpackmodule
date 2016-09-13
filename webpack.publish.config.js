var path = require('path');
var webpack = require('webpack');
// 自动生成index.html页面插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 提取css文件的插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    // 选择一个入口文件
    //entry:path.resolve(__dirname,'src/js/app.js'),
    // 把入口文件变为对象模式了
    entry: {
        app: path.resolve(__dirname, 'src/js/app'),
        // 分离第三方引用，比如var react= require('react')
        vendors: ['react', 'react-dom']
    },
    // 输出文件位置
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    // 配置加载器，加载器是在webpack真正编译之前先执行一些预处理操作
    module: {
        loaders: [
            // 处理jsx和es6语法的
            {
                test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
                loader: 'babel',// 加载模块 "babel" 是 "babel-loader" 的缩写
                query: {
                    presets: ['es2015', 'react']
                }
            },
            // 处理js中引用的css
            {
                test: /\.css$/, // Only .css files
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
                //loader: 'style!css' // 如果同时用两个加载器那中间用！隔开，而且执行顺序是从右往左
            },
            // 处理sass文件
            {
                test: /\.scss$/,
                // css-loader和sass.loader文件必须连在一起写才可以抽离sass文件
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            },
            // 处理图片的加载器
            {
                test: /\.(png|jpg)$/,
                // 如果图片的大小小于limit的限制大小，那webpack就会把图片装化为base64的字符串，添加在js文件中。否则就是图片路径
                // 单位是bit     1b=8bit   1kb=1024b   ~3kb
                // 用base64字符串就是为了减少网络请求，但是图片是有大小限制的，一般是小于3kb的才处理为base64
                // jpg和base64字符串本质都是010101010的机器码，所以可以相互转换
                // name属性可以控制大于3kb的图片的输出位置
                loader: 'url?limit=25000&name=img/[name].[ext]' // 如果在加载器后面加参数就用？号
            }

        ]
    },
    plugins: [
        // 分离第三方应用插件,name属性会自动指向entry中vendros属性，filename属性中的文件会自动构建到output中的path属性下面
        new webpack.optimize.CommonsChunkPlugin({name:'vendors', filename:'vendors.js'}),
        // 用webpack压缩代码，可以忽略代码中的警告
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // 可以新建多个抽离样式的文件，这样就可以有多个css文件了。
        new ExtractTextPlugin("app.css"),

        new webpack.DefinePlugin({
            //去掉react中的警告，react会自己判断
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/template.html',
            htmlWebpackPlugin: {
                "files": {
                    "css": ["app.css"],
                    "js": ["bundle.js", "vendors.js"]
                }
            },
            // 效果不大，情怀至上
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        })
    ]

}
