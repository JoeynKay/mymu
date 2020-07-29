<!--  -->
<template>
  <div class="recommend">
    <div class="slider-wrapper" v-if="banner.length">
      <slider>
        <div v-for="item in banner" :key="item.actid">
          <a :href="item.jumpurl">
            <img :src="item.picurl" >
          </a>
        </div>
     </slider>
    </div>
  </div>
</template>

<script>
import {getRecommend} from 'network/recommend'

import Slider from 'common/slider/Slider'
export default {
  name: 'Recommend',
  beforeRouteLeave (to, from, next) {
    // clearTimeout(this.timer)
    console.log('route-leave-recommend')
    // console.log(this.$refs.slider)
    next()
  },
  beforeRouteEnter(to, from, next){
    next(() => {
      console.log('route-enter-recommend')
    })
  },
  components: {
    Slider
  },
  data () {
    return {
      banner: []
    }
  },
  created () {
    this._getRecommend()
  },
  destroyed () {
    console.log('Recommend组件没有keep-alive')
  },
  methods: {
    _getRecommend () {
      getRecommend().then(res => {
        // console.log(res.data.banner)//打印一下数据
        this.banner = res.data.banner
      })
    }
  },
}
</script>

<style  scoped lang="stylus">
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
