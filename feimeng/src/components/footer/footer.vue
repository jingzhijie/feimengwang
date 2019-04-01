<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" :to="'/index'">
      <dl class="">
        <dt><img class="ficon1" src="./ficon1a.png" height="25"><img class="ficon2" src="./ficon1b.png" height="25"></dt>
        <dd style="text-indent: -14px">首页</dd>
      </dl>
    </router-link>
    <router-link tag="div" class="tab-item" to="/course">
      <dl class="">
        <dt><img class="ficon1" src="./ficon2a.png" height="25"><img class="ficon2" src="./ficon2b.png" height="25"></dt>
        <dd>课程</dd>
      </dl>
    </router-link>
    <router-link tag="div" class="tab-item" to="/discovery">
      <dl class="">
        <dt><img class="ficon1" src="./ficon3a.png" height="25"><img class="ficon2" src="./ficon3b.png" height="25"></dt>
        <dd>发现</dd>
      </dl>
    </router-link>
    <router-link tag="div" class="tab-item" to="/competition">
      <dl class="">
        <dt><img class="ficon1" src="./ficon3a.png" height="25"><img class="ficon2" src="./ficon3b.png" height="25"></dt>
        <dd>竞赛</dd>
      </dl>
    </router-link>
    <router-link tag="div" class="tab-item" to="/my">
      <dl class="">
        <dt><img class="ficon1" src="./ficon4a.png" height="25"><img class="ficon2" src="./ficon4b.png" height="25"></dt>
        <dd>我的</dd>
      </dl>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
 @import "../../common/stylus/variable"
.tab
  display: flex
  height: 45px
  font-size: $font-size-medium
  position: absolute
  width: 100%
  bottom: 0
  z-index: 30
  box-shadow: 1px -1px 5px 0px rgba( 2, 2, 2, 0.3)
  background: #ffffff
  .tab-item
    flex: 1
    text-align: center
    dl
      text-align: center
      color: #999
      dt
        margin-top: 3px
        .ficon1
          display: block
          margin: 0 auto
        .ficon2
          display: none
          margin: 0 auto
      dd
        font-size: 10px
        line-height: 16px
    &.router-link-active
      dl
        color: #222
        dt
          margin-top: 3px
          .ficon1
            display: none
          .ficon2
            display: block

</style>
