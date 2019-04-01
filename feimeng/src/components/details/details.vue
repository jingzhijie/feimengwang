<template>
  <transition name="move">
    <div v-show="showdetails" class="detailsBg">
      <div class="title">
        <img  @click="hide" class="back" src="./back.png" alt="">
        <div class="mulu" @click="showmulu"><img src="./mlicon.png" alt="" width="19" style="margin-right:6px"><span>课程目录</span></div>
      </div>
      <div class="videoBox" v-if="mdetails.courseInfo.video">
        <video ref="video" :src="baseurl + mdetails.courseInfo.video" controls="controls"></video>
      </div>
      <div class="detailsbox">
        <div class="detailsboxTitle">{{mdetails.courseInfo.title}}</div>
        <div class="detailsMain" v-html="mdetails.courseInfo.content"></div>
      </div>
      <m-catalog ref="catalogdetails" @listendt="sendDetailsid" :catalogdetails="mdetails"></m-catalog>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Global from 'common/js/global'
  import catalog from 'components/coursecatalog/catalog/catalog'
  export default {
    props: {
      mdetails: {
        type: Object
      }
    },
    data() {
      return {
        worksData: {},
        baseurl: Global.baseURL,
        showdetails: false
      }
    },
    mounted () {
    },
    methods: {
      show() {
        this.showdetails = true
      },
      hide() {
        if (this.mdetails.courseInfo.video) {
          this.$refs.video.pause()
        }
        this.showdetails = false
      },
      showmulu() {
          this.$refs.catalogdetails.show()
      },
      sendDetailsid(id) {
        this.$emit('listening', id)
      }
    },
  components: {
   'm-catalog': catalog
  }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.detailsBg
  background: #fff
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  overflow-y: scroll
  -webkit-overflow-scrolling: touch
  z-index: 70
  &.move-enter-active, &.move-leave-active
    transition: all 0.2s linear
  &.move-enter, &.move-leave-active
    transform: translate3d(100%, 0, 0)
  .title
    text-align:center
    font-size: 20px
    height: 60px
    line-height: 60px
    color: #fff
    background: rgba(1, 140, 240, 0.9)
    position: relative
    .back
      width: 10px
      position: absolute
      left: 0px
      top: 10px
      padding: 10px 14px
    .mulu
      position: absolute
      right: 12px
      top: 16px
      font-size: 16px
      line-height: 20px
  .videoBox
    width: 100%
    background: #000
    video
      width: 100%
      height: 32vh
      background: transparent
  .detailsbox
    background: url(./detailsbg.png) no-repeat
    background-size: 100%
    overflow: hidden
    min-height: calc(100% - 60px)
    .detailsboxTitle
      color: #fff
      width: 66%
      line-height: 20px
      margin-top: 24px
      margin-left: 14px
      font-size: 16px
    .detailsMain
      margin: 100px 15px 0
      font-size: 13px
      color: #444444
      line-height: 24px
      p
        line-height: 22px!important
        span
          font-size: 12px!important
      img
        display: block
        width: 100%
      video
        width: 100%
</style>
