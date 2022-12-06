const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')


module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {


    // 配置Element按需导入
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    proxy: {
      "/api": {
        target: 'http://182.61.3.24:8080',
        secure: true,
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  },
  // 配置ts
  chainWebpack: config => {
    config.resolve.extensions
      .add('ts')
      .add('tsx')
  }
})
