<!--  -->
<template>
  <div class="singer">
    我是歌手页面
  </div>
</template>

<script>
import {getSingerList} from 'network/singer.js'
import {ERR_OK} from 'network/config'

export default {
  name: 'Singer',
  data () {
    return {
      singers: []
    }
  },
  created () {
    console.log('singer-created')
    this._getSingerList()
  },
  methods: {
    //抓取歌手数据接口
    _getSingerList () {
      getSingerList()
        .then((res) => {
          // console.log(res.data.list)
          this.singers = res.data.list
          console.log(this.singers)
        })
    }
  }
}
</script>

<style  scoped>

</style>
