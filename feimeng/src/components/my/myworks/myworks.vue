<template>
  <transition name="move">
    <div v-show="showworks" class="worksbox">
      <div class="worksbg">
        <div class="title"><img  @click="hide" class="back" src="./back.png" alt="">我的作品</div>
        <div class="worksmain">
          <div v-if="dataworks.data === null" class="noworks">暂无作品</div>
          <div class="works_list" v-for="(item,index) in dataworks.data" :key = 'index'  @click="seedetail(item.id)">
            <img :src="baseurl + item.thumbs" alt="" class="workslistimg">
            <div class="workslistTitle">
              <dl class="">
                <dt>{{item.title}}</dt>
                <dd>{{item.time}}</dd>
              </dl>
            </div>
            <div class="rjt"><img src="./rjt.png" alt="" height="19"> </div>
          </div>
        </div>
      </div>
      <m-details ref="mdetails" @updateData="seedetail" :mdetails="mdetails"></m-details>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import Global from 'common/js/global'
import details from 'components/my/discoverydetails/discoverydetails'
import { Loading } from 'element-ui'
export default {
  props: {
    dataworks: {
      type: Object
    }
  },
  data() {
    return {
      worksData: {},
      baseurl: Global.baseURL,
      showworks: false,
      mdetails: {
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
  },
  methods: {
    show() {
      this.showworks = true
    },
    hide() {
      this.showworks = false
    },
    getdata() {
      let that = this
      let userinfo = JSON.parse(localStorage.getItem('userInfo'))
      that.myData = userinfo.data
      // console.log(that.myData)
    },
    seedetail(id) {
      // console.log(id)
      this.$refs.mdetails.show()
      let that = this
      let loading = Loading.service({
          lock: true,
          text: '拼命加载中',
          background: 'rgba(0, 0, 0, 0.8)'
      })
       axios.get(Global.baseURL + '/Mobile/Index/worksInfo.html', {params: {
       id: id, uid: that.myData.uid
    }}).then((response) => {
          that.mdetails = response.data
           // console.log(that.mdetails)
           loading.close()
         })
         .catch(function (error) {
            console.log(error)
          })
       }
  },
  components: {
    'm-details': details
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.worksbox
    background: #fff
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    overflow-y: scroll
    -webkit-overflow-scrolling: touch
    z-index: 50
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .worksbg
      background:#fff url(./worksbg.png) no-repeat
      background-size: 100%
      .title
        text-align:center
        font-size: 20px
        line-height: 60px
        color: #fff
        margin-bottom: 40px
        position: relative
        .back
          width: 10px
          position: absolute
          left: 0px
          top: 10px
          padding: 10px 14px
      .worksmain
        width: 100%
        .noworks
          margin-left: 20px
        .works_list
          padding: 12px 0
          height: 90px
          margin: 0 12px
          border-bottom: 1px solid #ddd
          .workslistimg
            height: 85px
            border: 2.5px solid #a1d3ff
            border-radius: 5px
            float: left
          .workslistTitle
            width: 40%
            height: 100%
            float: left
            margin-left: 4%
            margin-top: 22px
            dl
              line-height: 24px
              font-size: 14px
              dt
                white-space: nowrap
                text-overflow: ellipsis
                overflow: hidden
          .rjt
            float: right
            margin-right: 16px
            margin-top: 38px;
</style>
