import jsonp from 'assets/js/jsonp'
import {commonParams, options} from './config'

export function getSingerList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    // fromat: 'jsonp',
    channel: 'singer',
    page: 'list',
    key: 'all_all_all', 
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })
  // console.log('singer')
  return jsonp(url, data, options)
}