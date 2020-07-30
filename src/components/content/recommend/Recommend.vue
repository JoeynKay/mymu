<!--  -->
<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content">
      <!-- 使用better-scroll整体管理推荐页面 -->
      <div>
        <div class="slider-wrapper" v-if="banner.length">
        <slider>
          <div v-for="item in banner" :key="item.actid">
            <a :href="item.jumpurl">
              <img class="needsclick" :src="item.picurl" @load="loadImage">
            </a>
          </div>
      </slider>
      </div>
      <!-- 推荐歌单列表start -->
      <div class="recommend-list">
        <!-- 歌单列表标题 -->
        <h1 class="list-title">推荐歌单列表</h1>
        <!-- 歌单列表 -->
        <ul>
          <li v-for="item in discList" :key="item.dissid" class="item">
            <div class="icon">
              <img v-lazy="item.imgurl" width="60" height="60">
            </div>
            <div class="text">
              <h2 class="name" v-html="item.creator.name"></h2>
              <p class="desc" v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 推荐歌单列表end -->
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import {getRecommend, getDiscList} from 'network/recommend'

import Slider from 'common/slider/Slider'
import Scroll from 'common/Scroll'
import Loading from 'common/loading/Loading'

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
    Slider,
    Scroll,
    Loading
  },
  data () {
    return {
      banner: [],
      discList: []
    }
  },
  created () {
    this._getRecommend()
    setTimeout(() => { this._getDiscList()}, 1000)
   
  },
  destroyed () {
    console.log('Recommend组件没有keep-alive')
  },
  methods: {
    //获得轮播图数据
    _getRecommend () {
      getRecommend().then(res => {
        // console.log(res.data.banner)//打印一下数据
        this.banner = res.data.banner
      })
    },
    //获得歌单数据
    _getDiscList () {
      getDiscList().then(res => {
        console.log(res)
       this.discList = res.data.list
      })
    },
    loadImage () {
      if(!this.checkLoaded) {
        console.log('image')
        this.$refs.scroll.refresh()
      }
    }
  },
 
}
</script>

<style  scoped lang="stylus">
  @import "~assets/stylus/variable.styl"
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
