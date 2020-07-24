module.exports = {
    configureWebpack: {
      resolve: {
        alias: {
          'components': '@/components',
          'common': 'components/common',
          'content': 'components/content',
          'views': '@/views',
          'assets': '@/assets',
          'network': '@/network'
        }
      }
    }
  }