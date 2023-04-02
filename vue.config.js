const { defineConfig } = require('@vue/cli-service')

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')


module.exports = defineConfig({
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    experiments: {
      syncWebAssembly: true
    }
  },
  transpileDependencies: true,
  publicPath: './',
  devServer: {
    hot: true//自动保存
  },
})
