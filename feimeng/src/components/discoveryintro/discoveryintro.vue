<template>
  <transition name="move">
    <div v-show="showintro" class="introbg">
      <div class="introback" @click="hide"><img src="./back.png" alt="" width="17"></div>
      <div class="intromain">
        <div class="introinner">
          <p v-for="(item,index) in introdata.info" :key = 'index'>{{item}}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    introdata: {
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
      -webkit-overflow-scrolling: touch
      h3
        font-size: 18px
        color: #222
        font-weight: bold
      .introinner
        height:290px
        overflow: hidden
        line-height: 22px
        font-size: 14px
        text-indent: 28px
        h4
          margin-top: 14px
          font-size: 14px
          margin-left: 5px
          margin-bottom: 9px
        .introlist
          line-height: 24px
          font-size: 13px
          color: #6b6b6b
          margin-left: 4px
</style>
