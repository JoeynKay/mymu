<!--  -->
<template>
  <scroll class="listview" 
          :data="datalist" 
          ref="listView"
          :listenScroll="listenScroll"
          :probeType="probeType"
          @scroll="scroll"
  >
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
        <li v-for="(item, index) in shortcutList" 
            class="item"
            :class="{current:currentIndex === index}"
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
  data () {
    return {
      scrollY: -1,
      currentIndex: 0
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
    this.listHeight = []
    this.listenScroll = true
    this.probeType = 3
  },
  methods: {
    onShortcutStart (e) {
      //获取touch开始时的y坐标
      let anchorTouch = e.touches[0]
       //使用公共变量存储，以便方法间通信
      this.touch.y1 = anchorTouch.pageY
      let anchorIndex = getData(e.target, 'index')
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
      // console.log(anchorIndex)
      this._scrollTo(anchorIndex)
      // console.log(this.scrollY)
    },
    _scrollTo (anchorIndex) {
      //更新scrollY的数据，
      // console.log(anchorIndex)
      //this.listHeight[anchorIndex]存的是正值高度
      //而this.scrollY在watch监测下是负值高度处理的
      //也就是说两者互为相反值，取反，便是我们想要得到的this.scrollY
      if (anchorIndex < 0) {
        anchorIndex = 0
      } else if (anchorIndex > this.listHeight.length - 2) {
        anchorIndex = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[anchorIndex]
      this.$refs.listView.scrollToElement(this.$refs.listGroup[anchorIndex], 0)
    },
    //获取滚动后的列表所处在的位置
    //缓存于变量中
    scroll (pos) {
      this.scrollY = pos.y
      // console.log(this.scrollY)
    },
    //计算每个group的高度，返回一个高度分布数组
    //应该在有数据时更新
    _calculateHeight () {
      //每次都初始化数组，存储列表group的高度
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      //获取dom列表在屏幕的高度
      //存进高度分布数组中
      for(let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    datalist () {
      //当列表数据变化后，重新计算高度
      // console.log('jisuangaodu')
      setTimeout(() => {
        this._calculateHeight()
        // console.log('2')
      }, 20)
    },
    scrollY (newY) {
      //每次当前屏幕坐标变化后，对比高度分布数组，从而知道在哪个分区
      //以便使锚点的样式为高亮
      //缓存高度分布数组
      const listHeight = this.listHeight
      //当滚动到顶部，newY > 0
      if (newY > 0) {
        this.currentIndex = 0
        return
      } 
      //在中部滚动
      for(let i = 0; i < listHeight.length - 1; i++) {
        // console.log('11')
        let height1 = listHeight[i]
        let height2 = listHeight[i+1]
        //如果到了最后，或者当前屏幕坐标位于高度分布数组的区间
        if(-newY >= height1 && -newY < height2) {
          //缓存当前的分区到data中的数据中
          this.currentIndex = i
          return
        }
      }
      //当滚动到底部，且-newY大于最后一个元素的上限时
      this.currentIndex = listHeight.length - 2
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
        font-size $font-size-medium
        &.current
          color $color-theme

</style>
