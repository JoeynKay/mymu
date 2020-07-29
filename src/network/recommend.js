import jsonp from 'assets/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getRecommend () {
  const url = '/api/getSlider'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    cmd: 'pc_index_new',
    g_tk: 5381
  })

  return axios.get(url, {
    params: data
  }).then(res => Promise.resolve(res.data))
}

export function getDiscList () {
  const url = '/api/getDiscList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    fromat: 'json'
  })

  return axios.get(url, {
    params: data
  }).then(res => Promise.resolve(res.data))
    
}
