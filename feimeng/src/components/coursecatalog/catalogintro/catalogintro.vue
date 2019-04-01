<template>
  <transition name="move">
    <div v-show="showintro" class="introbg">
      <div class="introback" @click="hide"><img src="./back.png" alt="" width="17"></div>
      <div class="intromain">
        <h1>课程简介</h1>
        <div class="intro_all"><p v-for="(item,index) in dataintro.info" :key = 'index'>{{item}}</p></div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    dataintro: {
      type: Object
    }
  },
  data() {
    return {
      showintro: false
    }
  },
  methods: {
    show() {
      this.showintro = true
    },
    hide() {
      this.showintro = false
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.introbg
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
    .introback
      width: 100%
      height: 41px
      img
        display: block
        margin-left: 14px
        margin-top: 12px
    .intromain
      padding: 0 15px
      margin-top: 44px
      height: calc(100% - 85px)
      overflow-y: scroll
      h1
        font-size: 18px
        color: #222
        font-weight: bold
    .intro_all
      margin-top: 20px
      p
        font-size: 13px
        color: #6b6b6b
        line-height: 24px
</style>
