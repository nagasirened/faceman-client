let path = require('path')

// 去console插件
const TerserPlugin = require('terser-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 部署应用包时的基本 URL
  publicPath:
    process.env.VUE_APP_LOGOUT_URL === 'production' ? '/online/' : '/',

  // 保存时lint代码
  lintOnSave: true,

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,

  chainWebpack: config => {
    // 配置环境
    config.plugin('define').tap(args => {
      args[0]['process.env'].VUE_APP_LOGOUT_URL = JSON.stringify(
        process.env.VUE_APP_LOGOUT_URL
      )
      console.log(args[0])
      return args
    })
    // 设置别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@api', resolve('src/api/api'))
  },

  configureWebpack: config => {
    // 为生产环境修改配置...
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        // 生产环境自动删除console
        new TerserPlugin()
      )
      // 警告 webpack 的性能提示
      Object.assign(config, {
        performance: {
          hints: 'warning',
          // 入口起点的最大体积
          maxEntrypointSize: 50000000,
          // 生成文件的最大体积
          maxAssetSize: 30000000,
          // 只给出 js 文件的性能提示
          assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.js')
          }
        }
      })
    }
  },
  // 换icon
  pwa: {
    iconPaths: {
      favicon32: ''
    }
  },
  // 本地代理
  devServer: {
    port: 9999,
    open: true,
    proxy: {
      '/web': {
        target: 'http://127.0.0.1:9696',
        changOrigin: true,
        ws: false,
        pathRewrite: {
          '^/web': '/web'
        }
      }
    }
  }
}
