<!--  -->
<template>
    <div class="slider" ref="slider">
      <div class="slider-group" ref="sliderGroup">
        <slot></slot>
      </div>
      <div class="dots">
        <span v-for="(item, index) in dots" class="dot" :key="index" :class="{active: currentPageIndex === index}"></span>
      </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

import {addClass} from 'assets/js/dom'

export default {
  name: 'Slider',
  data() {
    //用于存储当前轮播图是第几页
    return {
      currentPageIndex: 0,
      dots: []
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 2000
    }
  },
  created() {
    console.log('slider-created')
  },
  mounted () {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      // console.log('mounted-timer')
      if(this.autoPlay) {
        this._play()
      }
    }, 20)

    window.addEventListener('resize', () => {
      if(!this.slider) {
        return
      }
      //如果调节了窗口，那么应该重新设置轮播图宽度
      console.log('resize')
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  destroyed () {
    console.log('slider-destroyed')
    clearTimeout(this.timer)
  },
  activated () {
    //该组件被激活时调用
    console.log('slider-activated')
    this._play()
  },
  deactivated () {
    console.log('slider-deactivated')
    clearTimeout(this.timer)
  },
  methods: {
    _setSliderWidth (isResize) {
      //获取轮播图组的子元素，即轮播图片元素
      this.children = this.$refs.sliderGroup.children
      // console.log(this.$refs.sliderGroup.children)
      // console.log(this.children.length)

      //轮播图组的总宽度
      let width = 0
      //获得轮播图组的视口宽度，为slider的宽度
      let sliderWidth = this.$refs.slider.clientWidth
      //遍历轮播图组元素，动态添加样式，设置好宽度
      for(let i = 0; i < this.children.length; i++) {
        //缓存图片结点
        let child = this.children[i]
        //动态添加类样式，样式为浮动
        addClass(child, 'slider-item')
        //设置每个slider-item的宽度
        child.style.width = sliderWidth + 'px'
        //同步增加轮播图组的宽度
        width += sliderWidth
      }
      //如果是循环播放，并且不是窗口重新调节，还需额外添加两个
      if(this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      //最后设置轮播图组的宽度，slider-group -> slider-item
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initSlider () {
      //初始化BScroll实例，并实现了无缝轮播
      this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            Threshold: 0.3,
            speed: 400
          },
          click: true
        })
      // console.log(this.slider.refresh)

      //轮播图监听滚动事件，即包括了自动播放的滚动和手动拖动的滚动,用来更新当前页，以及是否自动播放
      this.slider.on('scrollEnd', () => {
        //通过slider的方法获得当前是第几页的数据
        let pageIndex = this.slider.getCurrentPage().pageX
        // console.log(this.slider.getCurrentPage().pageX)
        // if(this.loop) {
        //   pageIndex -= 1
        //   //如果是循环播放，应当减一
        // }
        this.currentPageIndex = pageIndex
        if(this.autoPlay) {
          // clearTimeout(this.timer)
          this._play()
          //实际上便是每次滚动结束后，在回调里判断是否是自动播放，从而调用播放函数
        }
        // console.log('scroll-end下一张')
      })

      this.slider.on('beforeScrollStart', () => {
        clearTimeout(this.timer)
      })
    },
    _initDots () {
      let vm = this
      console.log(this.$refs.sliderGroup.children.length)
      vm.dots = new Array(this.$refs.sliderGroup.children.length)
    },
    _play () {
      // let pageIndex = this.currentPageIndex + 1
      // console.log(pageIndex)
      // if(this.loop) {
      //   pageIndex += 1
      // }
      // this.timer = setTimeout(() => {
      //   this.slider.goToPage(pageIndex, 0, 400)
      // }, this.interval)
      //估计是better-scroll的更新，所以上面的api不适合当前的better-scroll版本
      let vm = this
      vm.timer = setTimeout(() => {
        vm.slider.next()
      }, vm.interval)
    }
  },
  
}
</script>

<style  scoped lang="stylus">
    @import '~assets/stylus/variable.styl'
   .slider
    position: relative
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-background
        &.active
          width: 20px
          border-radius: 5px
          background: $color-theme

</style>
