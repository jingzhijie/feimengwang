<template>
  <transition name="move">
    <div class="catalogbg" v-show="showcatalog">
      <div class="catalogmain">
        <div class="catalogL" @click="hide"></div>
        <div class="catalogR">
          <div class="catitle">课程目录</div>
          <!-- <div class="title">{{catalogdetails}}</div> -->
          <!-- <ul>
            <li class="firstList"  v-for="(item,index) in catalogdetails.courseList" :key = 'index'>
              <div class="firsttitle">{{item.title}}</div>
              <ul v-show="defaultidx === num">
                <li v-for="(v,k) in item.subClass" :key = 'k'>{{v.title}}</li>
              </ul>
            </li>
          </ul> -->
          <div class="listul">
            <div v-for="(item,index) in catalogdetails.courseList" :key = 'index' v-bind:class="[activeidx === index ? activeClass : '',errorClass]">
              <div class="list_tit" @click='changeactiveidx(index)'>
                <img class="list_img" :src="baseurl + '/Public/image/airplane'+(index % 4 + 1) +'.png'" alt="">
                <div class="list_wz">{{item.title}}</div>
                <div class="list_icon"><img v-show="activeidx !== index" class="jia" src="./jia.png" width="13" alt=""><img v-show="activeidx === index" src="./jian.png" class="jian" width="13" alt=""></div>
                <div class="clear"></div>
              </div>
              <div class="list_secul">
                <div class="list_secli" v-for="(v,k) in item.subClass" :key = 'k' @click='gochange(v.id)'>
                  <img class="secli_img" src="./circle.png" alt="">
                  <div class="secli_wz">{{v.title}}</div>
                  <div class="secli_yes" v-show="v.is_study === 1"><img width="17" src="./yes.png" alt=""></div>
                  <div class="clear"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
// import axios from 'axios'
import Global from 'common/js/global'
// import works from 'components/my/myworks/myworks'
// import { Loading } from 'element-ui'
export default {
  props: {
    catalogdetails: {
      type: Object
    }
  },
  data() {
    return {
      defaultidx: -1,
      showcatalog: false,
      baseurl: Global.baseURL,
      activeidx: 0,
      errorClass: 'listli',
      activeClass: 'active'
    }
  },
  mounted () {
  },
  methods: {
    // showlist(num){
    //   if(num === this.defaultidx){
    //
    //   }
    // }
    show() {
      this.showcatalog = true
    },
    hide() {
      this.showcatalog = false
    },
    changeactiveidx(obj) {
      if (this.activeidx !== obj) {
        this.activeidx = obj
      } else {
        this.activeidx = -1
      }
    },
    gochange(id) {
      this.$emit('listendt', id)
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.catalogbg
  background: rgba(0, 0, 0, 0.5)
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  overflow-y: scroll
  -webkit-overflow-scrolling: touch
  z-index: 80
  &.move-enter-active, &.move-leave-active
    transition: all 0.2s linear
  &.move-enter, &.move-leave-active
    transform: translate3d(100%, 0, 0)
  .catalogmain
    width: 100%
    height: 100%
    .catalogL
      width: 25%
      min-height: 100%
      float: left
    .catalogR
      width: 72%
      min-height: 100%
      float: right
      background:#0cc1e2 url(./catabg.png) no-repeat
      background-size: 100%
      .catitle
        margin-top: 8px
        line-height: 80px
        font-size: 18px
        color: #fff
        width: 95%
        font-weight: 500
        padding-right: 5%
        text-align: right
        letter-spacing: 2px
        border-bottom: 1px solid rgba(255,255,255,0.3)
      .listul
        width: 100%
        .listli
          width:100%
          height: 56px
          overflow: hidden
          border-bottom: 1px solid rgba(255,255,255,0.3)
          &.active
            height: auto
            .list_tit
              background: #0264b8
          .list_tit
            background: transparent
            line-height: 56px
            .list_img
              float: left
              width: 13px
              margin-top: 22px
              margin-left: 12px
              margin-right: 8px
            .list_wz
              width: 75%
              float: left
              color: #fff
              font-size: 14px
              white-space: nowrap
              overflow: hidden
              text-overflow: ellipsis
            .list_icon
              float: right
              margin-right: 5%
              .jia
                display: inline-block
              .jian
                display: inline-block
          .list_secul
            width: 100%
            border-top: 1px solid rgba(255,255,255,0.3)
            margin: 0 auto
            .list_secli
              width: 96%
              margin: 0 auto
              line-height: 50px
              border-bottom: 1px dashed rgba(255,255,255,0.3)
              &:nth-last-of-type(1)
               border-bottom: 0
              .secli_img
                float: left
                width: 6px
                margin-left: 8%
                margin-top: 23px
              .secli_wz
                float: left
                width: 73%
                color: #fff
                font-size: 14px
                white-space: nowrap
                overflow: hidden
                text-overflow: ellipsis
                margin-left: 5%
              .secli_yes
                float: left
 .clear
   clear: both
</style>
