module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/wego-web/' : '/',
    lintOnSave: false,
    devServer: {
      port: 4002,
      proxy: {
        '/api': {//这里最好有一个 /
          target: 'http://localhost:3000',// 后台接口域名
          secure: false,// 如果是https接口，需要配置这个参数
          changeOrigin: true, //是否跨域
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }
