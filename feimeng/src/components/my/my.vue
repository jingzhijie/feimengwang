<template>
  <div class="mybg">
    <div class="title">我的</div>
    <div class="mymain">
      <div class="mydata">
        <div class="txbg">
          <img :src="baseurl + myData.photo" alt="" class="tx">
        </div>
        <div class="name">{{myData.username}}</div>
        <div class="clear"></div>
      </div>
      <img src="./mybg.png" alt="" width="100%">
      <div class="mycontent">
        <div class="list" @click="seeworks">
          <div class="listpic"><img src="./listpic1.png" alt="" height="68"></div>
          <div class="listname">我的作品</div>
          <div class="listjt"><img src="./rjt.png" alt="" height="19"></div>
        </div>
        <div class="list" @click="seecomment">
          <div class="listpic"><img src="./listpic2.png" alt="" height="68"></div>
          <div class="listname">我的评论</div>
          <div class="listjt"><img src="./rjt.png" alt="" height="19"></div>
        </div>
      </div>
    </div>
    <m-works ref="works" :dataworks="myworksList"></m-works>
    <m-comment ref="comment" :datacomment="mycommentList"></m-comment>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import Global from 'common/js/global'
import works from 'components/my/myworks/myworks'
import comment from 'components/my/mycomment/mycomment'
import { Loading } from 'element-ui'
export default {
  data() {
    return {
      myData: {},
      baseurl: Global.baseURL,
      myworksList: {},
      mycommentList: {}
    }
  },
  mounted () {
    this.getdata()
  },
  methods: {
    getdata() {
      let that = this
      let userinfo = JSON.parse(localStorage.getItem('userInfo'))
      that.myData = userinfo.data
    },
    seeworks() {
      let that = this
      that.$refs.works.show()
      let loading = Loading.service({
          lock: true,
          text: '拼命加载中',
          background: 'rgba(0, 0, 0, 0.8)'
      })
      axios.get(Global.baseURL + '/Mobile/Index/myworks.html', {params: {
        uid: that.myData.uid
     }}).then((response) => {
           // console.log(response.data.data)
           that.myworksList = response.data
           loading.close()
        })
    },
    seecomment() {
      let that = this
      that.$refs.comment.show()
      let loading = Loading.service({
          lock: true,
          text: '拼命加载中',
          background: 'rgba(0, 0, 0, 0.8)'
      })
      axios.get(Global.baseURL + '/Mobile/Index/mycomment.html', {params: {
        uid: that.myData.uid
     }}).then((response) => {
           // console.log(response.data.data)
           that.mycommentList = response.data
           loading.close()
        })
    }
  },
  components: {
    'm-works': works,
    'm-comment': comment
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.mybg
    background: url(./indexbg.png) no-repeat
    background-size: 100%
    width: 100%
    height: 100%
    overflow-y: scroll
    -webkit-overflow-scrolling: touch
    .title
      text-align: center
      font-size: 20px
      line-height: 60px
      color: #fff
    .mymain
      width: 100%
      .mydata
        margin-top: 0px
        .txbg
          width: 85px
          height: 85px
          background: url(./touxiangbg.png)
          background-size: 100%
          float: left
          margin-left: 22px
          .tx
            width: 74px
            border-radius: 100%
            display: block
            margin: 6px auto 0
        .name
          float: left
          margin-left: 15px
          margin-top: 34px
          font-size: 22px
          color: #fff
        .rjt
          float: right
          margin-right: 25px
          margin-top: 23px
      .mycontent
        padding: 0 13px
        background: #fff
        padding-bottom: 80px
        overflow: hidden
        .list
          width: 100%
          height: 92px
          box-shadow: 0px 1px 27px 0px rgb( 185, 223, 255 )
          margin-top: 15px
          border-radius: 5px
          .listpic
            float: left
            margin-left: 14px
            margin-top: 10px
          .listname
            float: left
            margin-left: 16px
            font-size: 16px
            color: #222
            line-height: 92px
            letter-spacing: 1px
          .listjt
            float: right
            margin-right: 16px
            margin-top: 38px
    .clear
      clear:both
</style>
