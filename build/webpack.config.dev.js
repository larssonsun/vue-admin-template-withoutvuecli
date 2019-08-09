const path = require('path') // Node.js path 模块提供了一些用于处理文件路径的小工具
const webpackConfig = require('./webpack.config.base.js'); // base 配置文件
const merge = require('webpack-merge'); // 配置文件项合并模块
const webpack = require('webpack'); // 引入webpack模块
const VUE_APP_BASE_API = "/test-server"

module.exports = merge(webpackConfig, {
  mode: 'development',
  devtool: 'source-map', // 将编译后的代码映射到原代码，便于报错后定位错误
  module: {
    rules: [{
      test: /\.(c|sc)ss$/,
      // 处理css文件成 JS 代码，运行时动态插入 <style> 标签来让 CSS 代码生效。注意这里loader是从右面开始调用的 
      // 因为开发环境下启用了 hot module replacement，为了让样式源文件的修改也同样能被热替换，不能使用 ExtractTextPlugin，而转为随 JS Bundle 一起输出
      use: ["style-loader", "css-loader",
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    publicPath: '/', // 引用路径补全，指明生成的文件中的引用都从根目录“/”开始（如果这里不设置publicPath则会读取output中的publicPath，再没有则读取当前项目路径）
    port: 8000, // 本地服务器端口号
    hot: true, // 热重载. 控制台会显示：[WDS] Hot Module Replacement enabled.
    // overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      // 跨域代理转发
      [VUE_APP_BASE_API]: {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: {
          ['^' + VUE_APP_BASE_API]: '/api'
        },
        logLevel: 'debug'
        // headers: {
        //   Cookie: ''
        // }
      }
    },
    historyApiFallback: {
      // HTML5 history模式
      rewrites: [{
        from: /.*/,
        to: '/index.html'
      }]
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 启用模块热替换
    new webpack.NamedModulesPlugin(), // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new webpack.DefinePlugin({ // 使用当前配置文件中的process.env.NODE_ENV来设置外部js文件中的process.env.NODE_ENV
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV), // 注意，如果没有再命令行注入ENV以任何内容，则process.env.NODE_ENV为undefined
        VUE_APP_BASE_API: JSON.stringify(VUE_APP_BASE_API)
      }
    })
  ]
});