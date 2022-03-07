const { defineConfig } = require('@vue/cli-service')
const FileManagerPlugin = require('filemanager-webpack-plugin')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  lintOnSave:false,
  configureWebpack: {
    plugins: [
      new FileManagerPlugin({
        events: {
          onEnd: process.env.NODE_ENV === 'production' ? {
            mkdir: [ './dist'],
            delete: [ './dist.zip'],
            archive: [{ source: './dist', destination: './dist.zip' }]
          } : {}
        }
      })
    ],
  },
})