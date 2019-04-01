<template>
  <transition name="move">
    <div v-show="showgoal" class="goalbg">
      <div class="goalback" @click="hide"><img src="./back.png" alt="" width="17"></div>
      <div class="goalmain">
        <h3>学习目标</h3>
        <div class="goalinner">
          <h4><img src="./icon1.png" alt="" height="13" style="margin-right:8px">重点、难点</h4>
          <p class="goallist" v-for="(item,index) in datagoal.nodus" :key = 'index'>{{index+1}} {{item}}</p>
          <h4><img src="./icon1.png" alt="" height="13" style="margin-right:8px">核心素养能力目标</h4>
          <div>
            <p class="goallist" v-for="(item,idx) in datagoal.target" :key = 'idx'>{{item}}</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    datagoal: {
      type: Object
    }
  },
  data() {
    return {
      showgoal: false
    }
  },
  methods: {
    show() {
      this.showgoal = true
    },
    hide() {
      this.showgoal = false
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.goalbg
    background:#fff url(./introbg.png) no-repeat
    background-size: 100%
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 60
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .goalback
      width: 100%
      height: 41px
      img
        display: block
        margin-left: 14px
        margin-top: 12px
    .goalmain
      padding: 0 15px
      margin-top: 44px
      height: calc(100% - 85px)
      overflow-y: scroll
      h3
        font-size: 18px
        color: #222
        font-weight: bold
      .goalinner
        height:290px
        overflow: hidden
        h4
          margin-top: 14px
          font-size: 14px
          margin-left: 5px
          margin-bottom: 9px
        .goallist
          line-height: 24px
          font-size: 13px
          color: #6b6b6b
          margin-left: 4px
</style>
