const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')


module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  configureWebpack: {
    // resolve: {
		// 	alias: { // 配置路径别名
		// 		'@': resolve('src'),
		// 		// assets: resolve('src/assets'),
		// 		// common: resolve('src/common'),
		// 		// components: resolve('src/components'),
		// 		// network: resolve('src/network'),
		// 		// plugins: resolve('src/plugins'),
		// 		// views: resolve('src/views')
		// 	}
		// },
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
        target:'http://182.61.3.24:8080',
        secure:true,
        changeOrigin:true,
        pathRewrite:{'^/api':''}
      }
    }
  }
})
