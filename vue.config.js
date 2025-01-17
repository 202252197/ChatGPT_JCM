const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = defineConfig({
  configureWebpack: config => {
    config.plugins =  [
      ...config.plugins,
      new NodePolyfillPlugin()
    ],
    config.experiments = {
      syncWebAssembly: true
    }
    // 非Node环境下去掉electron模块
    if (!process.env.IS_ELECTRON) {
      config.externals = {
        electron: 'commonjs2 electron',
      }
    }
  },
  transpileDependencies: true,
  publicPath: './', // 设置资源文件的根路径
  devServer: {
    hot: true//自动保存
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      customFileProtocol: "./",
      mainProcessFile: 'src/background.js',
      builderOptions: {
        appId: 'com.example.app',
        productName: 'ChatGPT_JCM',
        win: {
          icon: './public/app.ico'
        },
        mac: {
          icon: './public/app.icns'
        }
      }
    }
  }
})
