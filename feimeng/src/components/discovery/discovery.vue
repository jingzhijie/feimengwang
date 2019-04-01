<template>
  <div class="discoverybg">
    <div class="title">发现</div>
    <div class="discoverymain">
      <div class="discoverybanner">
        <div class="content">
          <img src="static/img/course_banner1.png" alt="" width="100%" style="opacity:0">
          <div class="toptab">
            <dl class="titleicon" @click="getDiscovery(0)" :class="ty === 0 ? 'active':''">
              <dt><img src="./icon3.png" alt="" height="33"></dt>
              <dd>全部</dd>
            </dl>
            <dl class="titleicon" @click="getDiscovery(1)" :class="ty === 1 ? 'active':''">
              <dt><img src="./icon1.png" alt="" height="33"></dt>
              <dd>飞梦推荐</dd>
            </dl>
            <dl class="titleicon" @click="getDiscovery(2)" :class="ty === 2 ? 'active':''">
              <dt><img src="./icon2.png" alt="" height="33"></dt>
              <dd>原创作品</dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="discoveryList">
        <dl class="listdl" v-for="(item,index) in discoveryList" :key = 'index' @click="seedetails(item.id)" >
          <dt><img :src="baseurl + item.thumbs"></dt>
          <dd>
            <div class="ddtop" >{{item.title}}</div>
          </dd>
        </dl>
      </div>
      <div class="filter" @click="showscr">
        <img src="./filter.png" alt="">
      </div>
    </div>
    <transition name="moveup">
      <div class="screenbg" v-show="showscreen">
        <div class="screen" v-show="showscreen">
          <div class="screenTop">
            <div class="closebtn" @click="hidescr"><img src="./closebtn.png" alt="" width="32"></div>
            <div class="screentitle"><img src="./star.png" alt="" width="36" style="margin-right:6px">筛 选</div>
          </div>
          <div class="screenBtm">
            <div class="tit">分 类：</div>
            <ul class="screenlist">
              <li v-for="(item,index) in discoveryData.catelist" :key = 'index' :class="thisidx == index?'active':''" @click='change(index)'>{{item}}</li>
            </ul>
            <div class="clear"></div>
            <div class="qrbtn" @click = "shaixuan">确定</div>
          </div>
        </div>
      </div>
    </transition>
    <m-details ref="disdetails" @updatedisData="seedetails" :data="disdetailsdata"></m-details>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import Global from 'common/js/global'
import { Loading } from 'element-ui'
import disdetails from 'components/discoverydetails/discoverydetails'
export default {
  data() {
    return {
      discoveryData: {},
      discoveryList: {},
      baseurl: Global.baseURL,
      showscreen: false,
      thisidx: 0,
      ty: 1,
      disdetailsdata: {
        'LoginUserPhoto': '/Uploads/2018-03-08/5aa09b57ceb68.jpg',
        'data': {
          'id': '4',
          'uid': '1107',
          'title': '飞梦网-飞梦作品',
          'category': '图文介绍',
          'video': '',
          'info': [
            '根据科学家目前探测的结果',
            '根据科学家目前探测的结果',
            '根据科学家目前探测的结果',
            '根据科学家目前探测的结果',
            '根据科学家目前探测的结果',
            '根据科学家目前探测的结果',
            '根据科学家目前探测的结果'
          ]
        },
        'message': [{
         'id': '47',
         'wid': '4',
         'message': '测试不刷新评论是否',
         'who_message': '102',
         'message_who': '1107',
         'create_time': '04/10',
         'pid': '0',
         'username': null,
         'photo': null,
         'sub_message': [
           {
             'id': '55',
             'wid': '4',
             'message': '回复 student0012：回复',
             'who_message': '1107',
             'message_who': '103',
             'create_time': '04/12',
             'pid': '47',
             'username': 'hzwdl',
             'photo': null,
             'is_other': 1
           },
           {
             'id': '48',
             'wid': '4',
             'message': '测试',
             'who_message': '103',
             'message_who': '102',
             'create_time': '04/10',
             'pid': '47',
             'username': null,
             'photo': null,
             'is_other': 0
           }
         ]}]
      }
    }
  },
  mounted () {
    this.getdata()
    this.getDiscovery(0)
  },
  methods: {
    getDiscovery(num) {
      let that = this
      that.ty = num
      let loading = Loading.service({
          lock: true,
          text: '拼命加载中',
          background: 'rgba(0, 0, 0, 0.8)'
      })
       axios.get(Global.baseURL + '/Mobile/Index/works.html', {params: {
         ty: num
      }}).then((response) => {
          that.discoveryData = response.data
          that.discoveryList = response.data.lists
          loading.close()
         })
         .catch(function (error) {
            console.log(error)
          })
    },
    getdata() {
      let that = this
      let userinfo = JSON.parse(localStorage.getItem('userInfo'))
      that.myData = userinfo.data
      // console.log(that.myData)
    },
    change(idx) {
     this.thisidx = idx
    },
    showscr() {
     this.showscreen = true
    },
    hidescr() {
     this.showscreen = false
    },
    shaixuan() {
     let tty = this.ty
     let tidx = this.thisidx
     let that = this
     let loading = Loading.service({
         lock: true,
         text: '拼命加载中',
         background: 'rgba(0, 0, 0, 0.8)'
     })
     axios.get(Global.baseURL + '/Mobile/Index/works.html', {params: {
     ty: tty, ct: tidx
      }}).then((response) => {
        that.discoveryData = response.data
        that.discoveryList = response.data.lists
        loading.close()
        this.showscreen = false
       })
       .catch(function (error) {
          console.log(error)
        })
    },
    seedetails(id) {
     let that = this
     that.$refs.disdetails.show()
     let loading = Loading.service({
         lock: true,
         text: '拼命加载中',
         background: 'rgba(0, 0, 0, 0.8)'
     })
      axios.get(Global.baseURL + '/Mobile/Index/worksinfo.html', {params: {
      id: id, uid: that.myData.uid
      }}).then((response) => {
         // console.log(response.data)
         that.disdetailsdata = response.data
         loading.close()
        })
        .catch(function (error) {
           console.log(error)
         })
    }
     },
  components: {
    'm-details': disdetails
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.discoverybg
    background: url(./indexbg.png) no-repeat
    background-size: 100%
    width: 100%
    height: 100%
    overflow-y: scroll
    -webkit-overflow-scrolling: touch
    .title
      text-align:center
      font-size: 20px
      line-height: 60px
      color: #fff
    .discoverymain
      width: 100%
      .discoverybanner
        background: url(./bannerbg.png)
        background-size: cover
        .content
          padding: 0 14px
          overflow-x: hidden
          position: relative
          .toptab
            display: flex
            position: absolute
            top: 0
            width: 100%
            .titleicon
              flex: 1
              text-align: center
            .active
              color: #0e91d8
      .filter
        width: 70px
        position: fixed
        z-index: 5
        right: 15px
        bottom: 60px
        img
          width: 100%
      .discoveryList
        padding-left: 0.5%
        width: 99.5%
        background: #fff url(./discoverylistbg.png) no-repeat
        background-size: 100%
        margin-bottom: 64px
        margin-top: -18%
        min-height: 380px
        .listdl
          width: 43%
          margin: 15px 3% 0
          display: inline-block
          background: #e7f4ff
          border-radius: 8px
          dt
            border-radius: 8px
            box-sizing: border-box
            border: 3px solid #a1d3ff
            overflow: hidden
            img
              width: 100%
          dd
            margin: 0 4px
            .ddtop
              height: 22px
              line-height: 22px
              overflow: hidden
              font-size: 14px
              margin-top: 4px
              color: #222
              text-align: center
    .screenbg
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 70
      background: rgba(0, 0, 0, 0.5)
      .screen
        position: absolute
        left: 0
        bottom: 0
        width: 100%
        &.moveup-enter-active, &.moveup-leave-active
          transition: all 20s linear
        &.moveup-enter, &.moveup-leave-active
          transform: translate3d(0, 100%, 0)
        .screenTop
          width: 100%
          height: 120px
          background: url(./screenbg.png) no-repeat bottom
          background-size: 100%
          position: relative
          .closebtn
            position: absolute
            top: 0
            left: 50%
            transform:translate(-50%, 0)
          .screentitle
            position: absolute
            bottom: 0
            left: 0
            right: 0
            text-align: center
            font-size: 17px
            color: #004c85
        .screenBtm
          background: #ffffff
          overflow: hidden
          .tit
            margin-left: 22px
            color: #444

          .screenlist
            margin: 0 14px
            li
              float: left
              width: 26%
              margin: 0 3.5%
              box-shadow: 2.5px 4.33px 9px 0px rgba( 0, 68, 81,0.5 )
              border-radius: 13px
              background: #f0f0f0
              height: 30px
              text-align: center
              line-height: 30px
              box-sizing: border-box
              margin-top: 20px
            .active
              border:1px solid #007ee8
              background: #ffffff
          .qrbtn
            width: 35%
            height: 34px
            line-height: 34px
            color: #ffffff
            background: #0084ea
            margin: 30px auto
            border-radius: 20px
            text-align: center
.clear
  clear: both
</style>
