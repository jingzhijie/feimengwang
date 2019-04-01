<template>
  <transition name="move">
    <div v-show="showaim" class="aimbg">
      <div class="aimback" @click="hide"><img src="./back.png" alt="" width="17"></div>
      <div class="aimmain">
        <h3>课程目标</h3>
        <div class="aim_inner">
          <p>{{dataaim.objective}}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    dataaim: {
      type: Object
    }
  },
  data() {
    return {
      showaim: false
    }
  },
  methods: {
    show() {
      this.showaim = true
    },
    hide() {
      this.showaim = false
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.aimbg
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
    .aimback
      width: 100%
      height: 41px
      img
        display: block
        margin-left: 14px
        margin-top: 12px
    .aimmain
      padding: 0 15px
      margin-top: 44px
      height: calc(100% - 85px)
      overflow-y: scroll
      h3
        font-size: 18px
        color: #222
        font-weight: bold
      .aim_inner
        line-height: 25px
        color: #6b6b6b
        font-size: 13px
        height: 75px
        margin-top: 20px
        overflow: hidden
</style>
