<template>
  <transition name="move">
    <div v-show="showcatalog" class="coursecatalogbg">
      <div class="title"><img  @click="hide" class="back" src="./back.png" alt=""> 飞梦网</div>
      <div class="coursecatalogtitle">{{data.courseInfo.title}}</div>
      <div class="summary">
        <img class="teacher_tx" :src="baseurl + data.courseInfo.tutor.photo || /static/img/catalogtx.png" alt="" width="54">
        <div class="teacher_name">老师姓名：{{data.courseInfo.tutor.mentor_name}}</div>
        <div class="clear"></div>
        <div class="teacher_intro">
          {{data.courseInfo.tutor.info}}
        </div>
      </div>
      <div class="coursecatalogmain">
        <div class="class_intro">
          <h3>课程简介</h3>
          <div class="intro_inner"><p v-for="(item,index) in data.courseInfo.info" :key = 'index'>{{item}}</p></div>
          <div class="seemore" @click="seeintro">查看更多</div>
        </div>
        <div class="classgoal">
          <h3>学习目标</h3>
          <div class="goalinner">
            <h4><img src="./icon1.png" alt="" height="13" style="margin-right:8px">重点、难点</h4>
            <p class="goallist" v-for="(item,index) in data.courseInfo.nodus" :key = 'index'>{{index+1}} {{item}}</p>
            <h4><img src="./icon1.png" alt="" height="13" style="margin-right:8px">核心素养能力目标</h4>
            <div>
              <p class="goallist" v-for="(item,idx) in data.courseInfo.target" :key = 'idx'>{{item}}</p>
            </div>
          </div>
          <div class="seemore" @click="seegoal">查看更多</div>
        </div>
        <div class="class_aim">
          <h3>课程目标</h3>
          <div class="aim_inner">
            <p>{{data.courseInfo.objective}}</p>
          </div>
          <div class="seemore" @click="seeaim">查看更多</div>
        </div>
        <div class="class_section">
          <h3>课程章节</h3>
          <div class="section_boxes">
            <div class="section_box" v-for="(item,index) in data.courseList" :key = 'index'>
              <h4><img src="./icon1.png" alt="" height="13" style="margin-right:8px">{{item.title}}</h4>
              <div class="section_inner">
                <div class="section_list" v-for="(v,k) in item.subClass" :key = 'k' @click="seedetail(v.id)">
                  <img class="listimg" :src="baseurl + v.thumb" alt="">
                  <div class="listTitle">
                    <p>{{v.title}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="seemore" @click="seesection">查看更多</div>
        </div>
      </div>
      <div class="commentBox">
        <div class="comment">
          <h3>评论</h3>
          <div class="commentlist" v-for="(item,index) in data.message" :key = 'index'>
            <div class="ask">
              <div class="top" @click="respondA(item.username,item.who_message,item.id,data.courseInfo.id)">
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
                <img class="tx" :src="item.photo ? baseurl + item.photo : touxiang" alt="" width="26">
                <div class="tname" @click="respondA(v.username,v.who_message,v.pid,data.courseInfo.id)">{{v.is_tutor === '1' ? v.username  + "（老师）" : v.username}}</div>
                <div class="icon"><img src="./iconsj.png" alt="" width="5"></div>
                <div class="name" @click="respondA(v.message_who_name,v.message_who,v.pid,data.courseInfo.id)">{{v.message_who_name}}</div>
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
        <!-- <div class="seeallcomment">查看全部评论</div> -->
      </div>
      <div class="addcomment">
        <img class="tx" :src="baseurl + data.LoginUserPhoto" alt="" width="26">
        <div class="replyWho" v-show="showRe"><span class="name" ref="ReName">回复mrwang：</span><span class="close" @click="clearPl">X</span><div class="clear"></div></div>
        <input v-bind:class="[showRe ? activeClass : '',errorClass]" type="text" name="" value="" ref="inputarea" placeholder="添加评论...">
        <div class="sendmsg" @click="sendMsg">发送</div>
      </div>
      <m-intro ref="mintro" :dataintro="data.courseInfo"></m-intro>
      <m-goal ref="mgoal" :datagoal="data.courseInfo"></m-goal>
      <m-aim ref="maim" :dataaim="data.courseInfo"></m-aim>
      <m-section ref="msection" @listen="seedetail" :datasection="data"></m-section>
      <m-details ref="mdetails" @listening="changeDetails" :mdetails="mdetails"></m-details>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import Global from 'common/js/global'
  import intro from 'components/coursecatalog/catalogintro/catalogintro'
  import goal from 'components/coursecatalog/cataloggoal/cataloggoal'
  import aim from 'components/coursecatalog/catalogaim/catalogaim'
  import section from 'components/coursecatalog/catalogsection/catalogsection'
  import details from 'components/details/details'
  import { Loading } from 'element-ui'
  export default {
    props: {
      data: {
        type: Object
      }
    },
    data() {
      return {
        showcatalog: false,
        baseurl: Global.baseURL,
        whoMessage: '',
        pid: 0,
        wid: this.data.courseInfo.id,
        huifu: '',
        level: 1,
        showRe: false,
        whoName: '',
        touxiang: Global.baseURL + '/Uploads/2018-03-08/5aa09b57ceb68.jpg',
        activeClass: 'iptY',
        errorClass: 'ipt',
        mdetails: {
          'status': 1,
          'courseInfo': {
            'id': '41',
            'pid': '19',
            'title': '纸飞机的前世今生',
            'info': '纸飞机的发展史',
            'video': '/Uploads/video/2018-08-27/5b836fe6909f7.mp4',
            'content': '123'
          },
          'courseList': [
            {
              'id': '19',
              'title': '你会折纸飞机吗？',
              'subClass': [
                {
                  'id': '41',
                  'title': '纸飞机的前世今生',
                  'thumb': '/Uploads/2018-07-15/5b4ae8c917487.jpg'
                },
                {
                  'id': '42',
                  'title': '教你折五款经典纸飞机！',
                  'thumb': '/Uploads/2018-07-15/5b4af5c32664f.jpg'
                }
              ]
            },
            {
              'id': '21',
              'title': '纸飞机为什么能飞起来？',
              'subClass': [
                {
                  'id': '43',
                  'title': '伯努利原理实验',
                  'thumb': '/Uploads/2018-07-15/5b4afbf0c401b.jpg'
                },
                {
                  'id': '44',
                  'title': '伯努利原理与连续性定理',
                  'thumb': '/Uploads/2018-07-15/5b4afb7eea275.jpg'
                }
              ]
            },
            {
              'id': '22',
              'title': '飞行大比拼',
              'subClass': [
                {
                  'id': '45',
                  'title': '飞行效果的影响因素',
                  'thumb': '/Uploads/2018-07-15/5b4afd22d7148.jpg'
                },
                {
                  'id': '46',
                  'title': 'part2——《纸飞机大赛》',
                  'thumb': '/Uploads/2018-07-15/5b4afe6901750.jpg'
                }
              ]
            }
          ]
        }
      }
    },
    mounted () {
      this.getdata()
    },
    methods: {
      show() {
        this.showcatalog = true
      },
      hide() {
        this.showcatalog = false
      },
      seeintro() {
        this.$refs.mintro.show()
      },
      seegoal() {
        this.$refs.mgoal.show()
      },
      seeaim() {
        this.$refs.maim.show()
      },
      seesection() {
        this.$refs.msection.show()
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
         axios.get(Global.baseURL + '/Mobile/Index/courseDetail.html', {params: {
         id: id
      }}).then((response) => {
            that.mdetails = response.data
             // console.log(that.mdetails)
             loading.close()
           })
           .catch(function (error) {
              console.log(error)
            })
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
          let rewid = that.data.courseInfo.id
          that.whoMessage = that.myData.uid
          if (that.level === 2) {
            that.huifu = '回复' + that.whoName + '：'
          } else {
            that.huifu = ''
          }
          let val = that.huifu + that.$refs.inputarea.value
         axios.get(Global.baseURL + '/Mobile/Index/comment.html', {
           params: {
             'type': 'course', 'whoMessage': that.whoMessage, 'messageWho': that.messageWho, 'pid': that.pid, 'wid': rewid, 'level': that.level, 'message': val
         }}).then((response) => {
              if (response.data.status === 1) {
                that.$alert(response.data.info, '提示', {
                  callback: action => {
                    that.$refs.inputarea.value = ''
                    that.clearPl()
                    that.$emit('updateData', rewid)
                  }
                })
              } else {
                that.$alert(response.data.info, '提示')
              }
           })
        },
        upDate() {
          this.$router.go(0)
        },
        changeDetails(id) {
          let that = this
          let loading = Loading.service({
              lock: true,
              text: '拼命加载中',
              background: 'rgba(0, 0, 0, 0.8)'
          })
           axios.get(Global.baseURL + '/Mobile/Index/courseDetail.html', {params: {
           id: id
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
      'm-intro': intro,
      'm-goal': goal,
      'm-aim': aim,
      'm-section': section,
      'm-details': details
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .coursecatalogbg
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
    .title
      text-align:center
      font-size: 20px
      line-height: 60px
      color: #fff
      position: relative
      .back
        width: 10px
        position: absolute
        left: 0px
        top: 10px
        padding: 10px 14px
    .coursecatalogtitle
      width: 82%
      margin-left: 16px
      color: #ffffff
      font-size: 16px
      font-weight: bold
      line-height: 20px
      margin-bottom: 10px
    .summary
      background: url(./bannerbg.png) no-repeat
      background-size: cover
      overflow: hidden
      .teacher_tx
        margin-left: 16px
        margin-top: 40px
        float: left
        border-radius: 100%
      .teacher_name
        float: left
        margin-top: 60px
        margin-left: 14px
      .teacher_intro
        margin: 8px 15px 0
        font-size: 13px
        line-height: 24px
    .coursecatalogmain
      width: 100%
      overflow: hidden
      background: #fff
      .class_intro
        margin: 15px auto 0
        overflow-x: hidden
        padding-bottom: 25px
        h3
          line-height: 35px
          font-size: 16px
          margin-left: 15px
          color: #222
        .intro_inner
          line-height: 25px
          color: #6b6b6b
          font-size: 13px
          padding: 0 15px
          height: 75px
          overflow: hidden
        .seemore
          line-height: 40px
          margin-top: 4px
          text-align: center
          color: #7fbef3
          letter-spacing: 1px
          box-shadow: 0px 3px 5px 0px rgba(0,176,237,0.3)
      .classgoal
        padding-bottom: 25px
        overflow-x: hidden
        h3
          color: #222222
          font-size: 16px
          font-weight: bold
          margin-left: 15px
        .goalinner
          margin-left: 15px
          max-height:290px
          overflow: hidden
          h4
            margin-top: 14px
            font-size: 14px
            margin-left: 5px
            margin-bottom: 9px
          .goallist
            line-height: 24px
            font-size: 13px
            color: #6b6b6b
            margin-left: 4px
        .seemore
          line-height: 40px
          margin-top: 4px
          text-align: center
          color: #7fbef3
          letter-spacing: 1px
          box-shadow: 0px 3px 5px 0px rgba(0,176,237,0.3)
      .class_aim
        overflow-x: hidden
        padding-bottom: 25px
        h3
          line-height: 35px
          margin-left: 15px
          font-size: 16px
          color: #222
          font-weight: bold
        .aim_inner
          line-height: 25px
          margin: 0 15px
          color: #6b6b6b
          font-size: 13px
          max-height: 75px
          overflow: hidden
        .seemore
          line-height: 40px
          margin-top: 4px
          text-align: center
          color: #7fbef3
          letter-spacing: 1px
          box-shadow: 0px 3px 5px 0px rgba(0,176,237,0.3)
      .class_section
        padding-bottom: 20px
        h3
          color: #222222
          font-size: 16px
          font-weight: bold
          margin: 0 12px
        .section_boxes
          overflow: hidden
          height: 268px
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
                width: 48%
                height: 100%
                float: left
                margin-left: 4%
                display: table
                p
                  display: table-cell
                  vertical-align: middle
                  line-height: 24px
                  font-size: 14px
        .seemore
          line-height: 40px
          text-align: center
          color: #7fbef3
          letter-spacing: 1px
          box-shadow: 0px 3px 5px 0px rgba(0,176,237,0.3)
      .coursecatalogList
        padding-left: 0.5%
        width: 99.5%
        background: #fff url(./courselistbg.png) no-repeat
        background-size: 100%
        padding-bottom: 20px
        .listdl
          width: 43%
          margin: 15px 3% 0
          display: inline-block
          background: #f0f8ff
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
              line-height: 22px
              font-size: 15px
              margin-top: 4px
              border-bottom: 1px dashed #a3d4ff
              color: #222
              text-align: center
            .ddbtm
              line-height: 23px
              font-size: 12px
              color: #0e91d8
              text-align: center
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
  .clear
    clear: both
  .el-message-box
    width: 80%!important
</style>
