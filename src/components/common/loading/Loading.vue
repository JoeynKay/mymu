<!--  -->
<template>
  <div class="loading">
    <img src="./loading.gif" width="24" height="24">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>

<style  scoped lang="stylus">
  @import "~assets/stylus/variable.styl"

  .loading
    text-align: center
    .desc
      color: $color-text
      font-size: $font-size-small

</style>
