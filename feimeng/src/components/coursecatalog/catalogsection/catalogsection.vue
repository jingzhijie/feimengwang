<template>
  <transition name="move">
    <div v-show="showsection" class="sectionbg">
      <div class="sectionback" @click="hide"><img src="./back.png" alt="" width="17"></div>
      <div class="sectionmain">
        <h3>课程章节</h3>
        <div class="section_boxes">
          <div class="section_box" v-for="(item,index) in datasection.courseList" :key = 'index'>
            <h4><img src="./icon1.png" alt="" height="13" style="margin-right:8px">{{item.title}}</h4>
            <div class="section_inner">
              <div class="section_list" v-for="(v,k) in item.subClass" :key = 'k' @click="seedetails(v.id)">
                <img class="listimg" :src="baseurl + v.thumb" alt="">
                <div class="listTitle">
                  <p>{{v.title}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import Global from 'common/js/global'
  export default {
    props: {
      datasection: {
        type: Object
      }
    },
    data() {
      return {
        showsection: false,
        baseurl: Global.baseURL
      }
    },
    methods: {
      show() {
        this.showsection = true
      },
      hide() {
        this.showsection = false
      },
      seedetails(id) {
        this.$emit('listen', id)
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.sectionbg
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
    .sectionback
      width: 100%
      height: 41px
      img
        display: block
        margin-left: 14px
        margin-top: 12px
    .sectionmain
      padding: 0 15px
      margin-top: 44px
      height: calc(100% - 85px)
      overflow-y: scroll
      h3
        font-size: 18px
        color: #222
        font-weight: bold
      .section_boxes
        overflow: hidden
        padding-bottom: 24px
        .section_box
          overflow: hidden
          h4
            margin: 14px 12px 9px
            font-size: 14px
          .section_list
            padding: 12px
            height: 90px
            border-bottom: 1px dashed #a7a7a7
            .listimg
              height: 85px
              border: 2.5px solid #a1d3ff
              border-radius: 5px
              float: left
            .listTitle
              width: 40%
              height: 100%
              float: left
              margin-left: 4%
              display: table
              p
                display: table-cell
                vertical-align: middle
                line-height: 24px
                font-size: 14px
</style>
