<!--  -->
<template>
  <scroll class="listview" :data="datalist" ref="listView">
    <!-- 歌手列表 -->
    <ul>
      <li 
          class="list-group" 
          ref="listGroup"
          v-for="group in datalist" 
          :key="group.title"
        >
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li
              class="list-group-item"
              v-for="item in group.items"
              :key="item.id"
            >
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- 歌手列表 -->
    <!-- 右侧快速入口 -->
    <div class="list-shorcut">
      <ul>
        <li 
            v-for="(item, index) in shortcutList" 
            class="item"
            :data-index="index"
            :key="index"
            @touchstart="onShortcutStart"
            @touchmove.stop.prevent="onShortcutMove"
          >
          {{item}}
        </li>
      </ul>
    </div>
    <!-- 右侧快速入口 -->
  </scroll>
</template>

<script>
import {getData, addClass} from 'assets/js/dom'

import Scroll from 'common/Scroll'

const ANCHOR_HEIGHT = 18

export default {
  name: 'ListView',
  computed: {
    //截取入口词
    shortcutList () {
      return this.datalist.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  },
  props: {
    //传入的列表数据
    datalist: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    Scroll
  },
  created () {
    this.touch = {}
  },
  methods: {
    onShortcutStart (e) {
      //获取touch开始时的y坐标
      let anchorTouch = e.touches[0]
       //使用公共变量存储，以便方法间通信
      this.touch.y1 = anchorTouch.pageY
      let anchorIndex = getData(e.target, 'index')
      console.log(anchorIndex)
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutMove (e) {
      //获取touchmove时的y坐标
      // console.log('move')
      let anchorTouch = e.touches[0]
      // console.log(anchorTouch.pageY)
      //使用公共变量存储，以便方法间通信
      this.touch.y2 = anchorTouch.pageY
      //偏移锚点量
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      // console.log(delta)
      let anchorIndex = this.touch.anchorIndex - 0 + delta
      console.log(anchorIndex)
      this._scrollTo(anchorIndex)
    },
    _scrollTo (anchorIndex) {
      this.$refs.listView.scrollToElement(this.$refs.listGroup[anchorIndex], 0)
    }
  }
}
</script>

<style  scoped lang="stylus">
  @import "~assets/stylus/variable.styl"

  .listview
    position: relative
    width: 100%
    height 100%
    overflow hidden
    background $color-background   
    .list-group
      padding-bottom 30px
      .list-group-title
        height 30px
        line-height 30px
        font-size $font-size-small
        color $color-text-l
        background $color-highlight-background
        padding-left 30px
      .list-group-item
        display flex
        align-items center
        padding 20px 0 0 30px
        .avatar
          width 50px
          height 50px
          border-radius 50%
        .name
          margin-left 20px
          color $color-text-l
          font-size $font-size-medium
    .list-shorcut
      position absolute
      z-index 30
      right 0
      top 50%
      transform translateY(-50%)
      width 20px
      padding 20px 0
      border-radius 10px
      text-align center
      background $color-background-d
      font-family Helvetica
      .item
        padding 3px
        line-height 1
        color $color-text-l
        font-size $font-size-small
        &.current
          color $color-theme

</style>
