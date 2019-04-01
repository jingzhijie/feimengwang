<template>
  <transition name="move">
    <div v-show="showdiscdetail" class="discdetailsbg">
      <div class="videoBox" v-if="data.data.video !== ''">
        <div class="videotitle"><img  @click="hide" class="back" src="./back.png" alt=""></div>
        <video ref="video" :src="baseurl + data.data.video" controls="controls">
        </video>
      </div>
      <div class="downbg" v-bind:class="[data.data.video!== ''? yesClass : '',noClass]">
        <div v-show="data.data.video === ''" class="title"><img  @click="hide" class="back" src="./back.png" alt=""></div>
        <div v-show="data.data.video === ''" class="disctitle">{{data.data.title}}</div>
        <div v-show="data.data.video !== ''" class="disctitlev">{{data.data.title}}</div>
        <div class="summary">
          <img class="author_tx" :src="baseurl + data.data.photo" alt="" width="54">
          <div class="author_name">
            <dl class="">
              <dt>作者：{{data.data.name}}</dt>
              <dd>{{data.data.school_name}}</dd>
            </dl>
          </div>
          <div class="clear"></div>
          <div class="author_intro">
            <div class="intro_inner"><p v-for="(item,index) in data.data.info" :key = 'index'>{{item}}</p></div>
            <div class="seemore" @click="showIntro">查看更多</div>
            <div class="type_intro">
              <div class="laiyuan">来源：作品上传</div>
              <div class="leibie">作品类别： 绘画视频{{data.data.category}}</div>
              <div class="clear"></div>
            </div>
          </div>
        </div>
        <div class="pictitle">代表图片</div>
        <div class="picswiper" v-if="data.data.thumbs">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item,index) in data.data.thumbs" :key = 'index'><img :src="baseurl + item"  alt=""></swiper-slide>
          </swiper>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </div>
        <div class="commentBox">
          <div class="comment">
            <h3>评论</h3>
            <div class="commentlist" v-for="(item,index) in data.message" :key = 'index'>
              <div class="ask">
                <div class="top" @click="respondA(item.username,item.who_message,item.id,data.data.id)">
                  <img class="tx" :src="item.photo ? baseurl + item.photo : touxiang" alt="" width="26">
                  <div class="name">{{item.username}}</div>
                  <div class="time">{{item.create_time}}</div>
                  <div class="clear"></div>
                </div>
                <div class="btm">
                  {{item.message}}
                </div>
                <div class="clear"></div>
              </div>
              <div class="answer" v-for="(v,k) in item.sub_message" :key = 'k'>
                <div class="top">
                  <img class="tx" :src="v.photo ? baseurl + v.photo : touxiang" alt="" width="26">
                  <div class="tname" @click="respondA(v.username,v.who_message,v.pid,data.data.id)">{{v.is_tutor === '1' ? v.username  + "（老师）" : v.username}}</div>
                  <div class="icon"><img src="./iconsj.png" alt="" width="5"></div>
                  <div class="name" @click="respondA(v.message_who_name,v.message_who,v.pid,data.data.id)">{{v.message_who_name}}</div>
                  <div class="time">{{v.create_time}}</div>
                  <div class="clear"></div>
                </div>
                <div class="btm">
                  {{v.message}}
                </div>
              </div>
              <div class="clear"></div>
            </div>
          </div>
        </div>
        <div class="addcomment">
          <img class="tx" :src="baseurl + data.LoginUserPhoto" alt="" width="26">
          <div class="replyWho" v-show="showRe"><span class="name" ref="ReName">回复mrwang：</span><span class="close" @click="clearPl">X</span><div class="clear"></div></div>
          <input v-bind:class="[showRe ? activeClass : '',errorClass]" type="text" name="" value="" ref="inputarea" placeholder="添加评论...">
          <div class="sendmsg" @click="sendMsg">发送</div>
        </div>
      </div>
      <m-intro ref="intro" :introdata="data.data"></m-intro>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import axios from 'axios'
  import Global from 'common/js/global'
  import intro from 'components/discoveryintro/discoveryintro'
  export default {
    props: {
      data: {
        type: Object
      }
    },
    data() {
      return {
        showdiscdetail: false,
        baseurl: Global.baseURL,
        touxiang: Global.baseURL + '/Uploads/2018-03-08/5aa09b57ceb68.jpg',
        whoMessage: '',
        wid: this.data.data.id,
        pid: 0,
        huifu: '',
        level: 1,
        whoName: '',
        showRe: false,
        activeClass: 'iptY',
        errorClass: 'ipt',
        yesClass: 'downbgv',
        noClass: 'downbg',
        swiperOption: {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    },
    mounted () {
      this.getdata()
    },
    methods: {
      show() {
        this.showdiscdetail = true
      },
      hide() {
        if (this.data.data.video !== '') {
          this.$refs.video.pause()
        }
        this.showdiscdetail = false
      },
      showIntro() {
        this.$refs.intro.show()
      },
      getdata() {
        let that = this
        let userinfo = JSON.parse(localStorage.getItem('userInfo'))
        that.myData = userinfo.data
      },
      respondA(nr, yid, pid, id) {
        this.messageWho = yid
        this.pid = pid
        this.wid = id
        this.level = 2
        this.showRe = true
        this.whoName = nr
        // this.pinglun = {'type': 'course', 'whoMessage': this.myData.uid, 'messageWho': yid, 'pid': pid, 'wid': id, 'level': 2}
        this.$refs.ReName.innerHTML = '回复' + nr + '：'
      },
      clearPl() {
        this.level = 1
        this.showRe = false
      },
      sendMsg() {
        let that = this
        that.wid = that.data.data.id
        that.whoMessage = that.myData.uid
        if (that.level === 2) {
          that.huifu = '回复' + that.whoName + '：'
        } else {
          that.huifu = ''
        }
        let val = that.huifu + that.$refs.inputarea.value
       axios.get(Global.baseURL + '/Mobile/Index/comment.html', {
         params: {
           'type': 'works', 'whoMessage': that.whoMessage, 'messageWho': that.messageWho, 'pid': that.pid, 'wid': that.wid, 'level': that.level, 'message': val
       }}).then((response) => {
            // console.log(response.data)
            if (response.data.status === 1) {
              that.$alert(response.data.info, '提示', {
                callback: action => {
                  that.$refs.inputarea.value = ''
                  that.clearPl()
                  that.$emit('updatedisData', that.wid)
                }
              })
            } else {
              that.$alert(response.data.info, '提示')
            }
         })
      },
      upDate() {
        this.$router.go(0)
      }
    },
    components: {
      swiper,
      swiperSlide,
      'm-intro': intro
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .discdetailsbg
    background: #fff url(./cscatalog.png) no-repeat
    background-size: 100%
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
    .videoBox
      position: relative
      width: 100%
      background: #000
      .videotitle
        position: absolute
        top: 0
        z-index: 9
        .back
          width: 10px
          position: absolute
          left: 0px
          top: 10px
          padding: 10px 14px
      video
        width: 100%
        background: transparent
    .downbg
      background: #fff url(./cscatalog.png) no-repeat
      background-size: 100%
      overflow: hidden
      .title
        text-align:center
        font-size: 20px
        height: 60px
        line-height: 60px
        color: #fff
        position: relative
        .back
          width: 10px
          position: absolute
          left: 0px
          top: 10px
          padding: 10px 14px
      .disctitlev
        width: 70%
        margin-left: 16px
        color: #fff
        font-size: 18px
        font-weight: bold
        line-height: 20px
        margin-top: 16px
      .disctitle
        width: 70%
        margin-left: 16px
        color: #ffffff
        font-size: 16px
        font-weight: bold
        line-height: 20px
      .summary
        overflow: hidden
        padding-bottom: 5px
        .author_tx
          margin-left: 16px
          margin-top: 65px
          float: left
          border-radius: 100%
        .author_name
          float: left
          margin-top: 78px
          margin-left: 14px
          dl
            dt
              line-height: 22px
            dd
              line-height: 22px
        .author_intro
          margin: 8px 15px 0
          font-size: 13px
          line-height: 24px
        .author_intro
          margin: 15px auto 0
          overflow-x: hidden
          box-shadow: 0px 3px 5px 0px rgba(0,176,237,0.3)
          .intro_inner
            line-height: 25px
            text-indent: 26px
            color: #6b6b6b
            font-size: 13px
            padding: 0 15px
            height: 75px
            overflow: hidden
          .seemore
            line-height: 40px
            margin: 5px 15px 0
            text-align: center
            color: #7fbef3
            letter-spacing: 1px
            border-bottom: 1px dashed #05c1d2
          .type_intro
            width: 90%
            margin: 0 auto
            line-height: 45px
            height: 45px
            margin-top: 5px
            font-size: 12px
            color: #b6b6b6
            .laiyuan
              width: 50%
              float: left
            .leibie
              width: 50%
              float: left
      .pictitle
        line-height: 53px
        font-size: 16px
        color: #222
        background: #fff
        padding-left: 10px
      .picswiper
        width: 100%
        background: #fff
        position: relative
        .swiper-container
          width: 76%
          margin: 0 auto
        img
          width: 100%
      .commentBox
        background:#fff url(./pinglunbg.png) no-repeat bottom right
        background-size: 50%
        .comment
          position: relative
          overflow: hidden
          h3
            font-size: 16px
            color: #222222
            font-weight: bold
            margin: 0 12px
          .commentlist
            margin: 0 12px
            border-bottom: 1px solid #d9d9d9
            &:nth-last-of-type(1)
              border-bottom: 0
            .ask
              padding: 10px 0
              .top
                .tx
                  border-radius: 100%
                  float: left
                .name
                  float: left
                  margin-left: 6px
                  font-size: 12px
                  color: #b6b6b6
                  line-height: 24px
                .time
                  float: right
                  font-size: 12px
                  color: #999999
                  line-height: 24px
              .btm
                width: 89%
                font-size: 12px
                line-height: 20px
                float: right
            .answer
              float: right
              width: 89%
              padding: 10px 0
              border-top: 1px solid #d9d9d9
              .top
                .tx
                  border-radius: 100%
                  float: left
                .tname
                  float: left
                  margin-left: 6px
                  font-size: 12px
                  color: #b6b6b6
                  line-height: 24px
                .icon
                  float: left
                  font-size: 0
                  margin-top: 9px
                  margin-left: 4px
                .name
                  float: left
                  font-size: 12px
                  margin-left: 4px
                  color: #b6b6b6
                  line-height: 24px
                .time
                  float: right
                  font-size: 12px
                  line-height: 24px
              .btm
                width: 89%
                font-size: 12px
                line-height: 20px
                float: right
        .seeallcomment
          font-size: 12px
          margin-left: 14px
          color: #3599ce
          line-height: 33px
      .addcomment
        margin: 0 12px
        padding-bottom: 14px
        position: relative
        .tx
          float: left
          margin-top: 5px
          border-radius: 100%
        .ipt
          width: 72%
          border: 1px solid #e2e2e2
          border-radius: 15px
          height: 34px
          outline: 0
          text-indent: 15px
          font-size: 12px
          margin-left: 10px
        .iptY
          text-indent: 94px
        .sendmsg
          position: absolute
          top: 8px
          right: 0%
          padding: 5px
          border: 1px solid #ccc
          color: #ccc
          border-radius: 7px
          font-size: 12px
        .replyWho
          width: 80px
          position: absolute
          background: #666
          color: #fff
          font-size: 12px
          height: 24px
          line-height: 24px
          border: 1px solid #ccc
          left: 43px
          top: 5px
          border-radius: 12px
          .name
            float: left
            width: 60px
            height: 100%
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
            text-indent: 4px
          .close
            width: 20px
            height: 100%
            float: left
            text-indent: 7px
    .downbgv
      background: #fff url(./cscatalog1.png) no-repeat
      background-size: 100%
  .el-message-box
    width: 80%!important
</style>
