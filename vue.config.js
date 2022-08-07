const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')


module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  devServer:{
    host:"0.0.0.0",
    port:8080,
    proxy:{
      "/api":{
        target:'https://p4341107f6.oicp.vip/',
        secure:true,
        changeOrigin:true,
        pathRewrite:{'^/api':''}
      }
    }
  }
})
