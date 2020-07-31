<!--  -->
<template>
  <div class="singer">
    <list-view :datalist="singers">

    </list-view>
  </div>
</template>

<script>
import {getSingerList} from 'network/singer.js'
import {ERR_OK} from 'network/config'
import Singer from 'assets/js/singer'

import ListView from 'content/ListView/ListView'

//定义两个常量，存储热门歌曲的首数及其标题
const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

export default {
  name: 'Singer',
  components: {
    ListView
  },
  data () {
    return {
      singers: [],
    }
  },
  created () {
    this._getSingerList()
  },
  methods: {
    //抓取歌手数据接口
    _getSingerList () {
      getSingerList()
        .then((res) => {
          // console.log(res.data.list)
          // this.singers = res.data.list
          // console.log(this._normaliseSinger(this.singers))
          this.singers = this._normaliseSinger(res.data.list)
          // console.log(this.singers)
        })
    },
    //对获取的数据接口进行处理
    //最后返回[{'title'@str, 'items'@[{'id'@str, 'name'@str, 'avatar'@modstr}]}, {}]
    _normaliseSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      //遍历list中的每个元素，并进行对应处理，最终按照设计放进了map对象中
      list.forEach((element,index) => {
        if(index < HOT_SINGER_LEN) {
          //缓存热门歌曲数组
          map.hot.items.push(new Singer(element.Fsinger_mid, element.Fsinger_name))
        }
        //下面是常规歌手列表的初始化
        //先缓存每个元素的Findex
        const key = element.Findex
        if (!map[key]) {
          //如果map对象中还没有添加某Findex属性
          map[key] = {
            title: key,
            items: []//也是对应的某字母开头的歌手列表
          }
        }
        map[key].items.push(new Singer(element.Fsinger_mid, element.Fsinger_name))
      })
      //再对map对象进行处理，排好顺序，以获得正常的序列
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if(val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      //ret数组中的排序
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })

      return hot.concat(ret)
    }
  }
}
</script>

<style  scoped lang="stylus">
  .singer
    position fixed
    top 88px
    width 100%
    bottom 0
</style>
