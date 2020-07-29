const path = require('path')
const bodyParser = require('body-parser')
const axios = require('axios')



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
  },
  devServer: {
    before (app) {
      app.get('/api/getSlider', function (req, res) {
        const url = 'https://c.y.qq.com/v8/fcg-bin/musicmall.fcg'

        axios.get(url, {
          headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then(response => res.json(response.data))
      })

      app.get('/api/getDiscList', function (req, res) {
        const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
        
        axios.get(url, {
          headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then(response => res.json(response.data))
          .catch(e => console.log(e))
      })



    }
  }
}
