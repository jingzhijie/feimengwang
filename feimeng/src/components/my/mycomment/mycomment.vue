<template>
  <transition name="move">
    <div v-show="showcomment" class="commentbox">
      <div class="commentbg">
        <div class="title"><img  @click="hide" class="back" src="./back.png" alt="">我的评论</div>
        <div class="commentmain">
          <div class="commentlist" v-for="(item,index) in datacomment.data" :key = 'index'>
              <div class="listTop" @click="godetails(item.category,item.cid)">
                <div class="touxiang"><img :src="baseurl + myData.photo" alt=""></div>
                <div class="name">{{myData.username}}</div>
                <div class="rjt"><img src="./rjt.png" height="19" alt=""> </div>
                <div class="date">{{item.time}}</div>
                <div class="clear"></div>
              </div>
              <div class="listmid">{{item.message}}</div>
              <div class="listbtm">
                <div class="btmname" v-if="item.category === '1'">课程：{{item.title}}</div>
                <div class="btmname" v-if="!item.category">作品：{{item.title}}</div>
                <div class="btmnum"><img src="./icon1.png" height="13" alt=""> {{item.count}}</div>
                <div class="clear"></div>
              </div>
          </div>
        </div>
      </div>
      <m-cscatalog ref="coursecatalog" @updateData="selectClass" :data="coursecataData"></m-cscatalog>
      <m-details ref="disdetails" @updatedisData="seedetails" :data="disdetailsdata"></m-details>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import Global from 'common/js/global'
  import disdetails from 'components/discoverydetails/discoverydetails'
  import cscatalog from 'components/coursecatalog/coursecatalog'
  import { Loading } from 'element-ui'
  export default {
    props: {
      datacomment: {
        type: Object
      }
    },
    data() {
      return {
        myData: {},
        commentData: {},
        baseurl: Global.baseURL,
        showcomment: false,
        coursecataData: {
          'courseInfo': {
            'id': '7',
            'title': '航空精神',
            'nodus': [
              '根据科学家目前探测的结果，已发现的最大的黑洞是太阳质量的几十亿倍。尽管目前人类还无法直接观测黑洞，但科学家已经证实了超级黑洞的存在，甚至还有双巨型黑洞存在。',
              '那么，巨型黑洞的存在，到底有什么意义呢？对此问题，科学家提出了许多相关的理论，但由于目前科技水平的限制，导致科学家无法进行证明。'
            ],
            'target': [
              'ThinkPHP5 是上海顶想信息科技有限公司于2006年创立的，经过长期的升级和维护是目前国内使用最多的PHP框架，2016年thinkPHP发布了5.0版本。',
              'ThinkPHP5.0版本是一个颠覆和重构版本，采用全新的架构思想，引入了更多的PHP新特性，优化了核心，减少了依赖，实现了真正的惰性加载，支持composer，并针对API开发做了大量的优化，包括路由、日志、异常、模型、数据库、模板引擎和验证等模块都已经重构'
            ],
            'info': [
              '根据科学家目前探测的结果，已发现的最大的黑洞是太阳质量的几十亿倍。',
              '尽管目前人类还无法直接观测黑洞，但科学家已经证实了超级黑洞的存在，甚至还有双巨型黑洞存在。那么，巨型黑洞的存在，到底有什么意义呢？对此问题，科学家提出了许多相关的理论，但由于目前科技水平的限制，导致科学家无法进行证明。'
            ],
            'mentor_id': '1',
            'tutor': {
              'id': '1',
              'mentor_name': '赵晓曼',
              'photo': '/Uploads/2018-03-15/5aa9d1d029dbf.jpg',
              'info': '智慧家幼小衔接班数学老师,对学龄前儿童有丰富的教学经验,深受学生们的喜爱。'
            }
          },
          'courseList': [
            {
              'id': '6',
              'title': 'PhpStorm的基本操作',
              'subClass': [
                {
                  'id': '2',
                  'title': 'cookie其它常用',
                  'thumb': '/Uploads/2018-06-19/5b285f11c2dd8.jpg'
                },
                {
                  'id': '24',
                  'title': '黑洞，是宇宙中最神秘最恐怖的天体。而黑洞之中，超级黑洞尤其可怕。',
                  'thumb': '/Uploads/2018-06-27/5b333b2c81e35.jpg'
                },
                {
                  'id': '25',
                  'title': '必须在爆炸时拥有极大质量的内核才有足够的引力',
                  'thumb': '/Uploads/2018-06-27/5b333b691957a.jpg'
                },
                {
                  'id': '26',
                  'title': '根据科学家目前探测的结果，已发现的最大的黑洞是太阳质量的几十亿倍',
                  'thumb': '/Uploads/2018-06-27/5b333bbb547bb.jpg'
                }
              ]
            },
            {
              'id': '15',
              'title': 'PhpStorm进阶',
              'subClass': [
                {
                  'id': '40',
                  'title': '测试',
                  'thumb': '/Uploads/2018-07-16/5b4c0f36033f8.jpg'
                }
              ]
            }
          ],
          'message': [
            {
              'id': '67',
              'wid': '7',
              'message': '测试评论ceshi',
              'who_message': '1107',
              'message_who': '1',
              'create_time': '06/22',
              'pid': '0',
              'category': '1',
              'is_tutor': '0',
              'username': 'Mrwang',
              'photo': '/Uploads/2018-04-09/5acb2fba9fc7d.jpg'
            },
            {
              'id': '42',
              'wid': '7',
              'message': '烦哦安排',
              'who_message': '4',
              'message_who': '1',
              'create_time': '04/23',
              'pid': '0',
              'category': '1',
              'is_tutor': '0',
              'username': 'feiment0004',
              'photo': null,
              'sub_message': [
                {
                  'id': '56',
                  'wid': '7',
                  'message': '我看着你不顺眼，别再我的文章下说话2',
                  'who_message': '1',
                  'message_who': '4',
                  'create_time': '04/25',
                  'pid': '42',
                  'category': '1',
                  'is_tutor': '1',
                  'username': '赵晓曼',
                  'photo': '/Uploads/2018-03-15/5aa9d1d029dbf.jpg'
                },
                {
                  'id': '50',
                  'wid': '7',
                  'message': '回复 Mrwang：回复一下',
                  'who_message': '6',
                  'message_who': '4',
                  'create_time': '04/24',
                  'pid': '42',
                  'category': '1',
                  'is_tutor': '0',
                  'username': 'feiment0006',
                  'photo': null
                },
                {
                  'id': '51',
                  'wid': '7',
                  'message': '回复 feiment0005：评论那么早干什么',
                  'who_message': '6',
                  'message_who': '4',
                  'create_time': '04/24',
                  'pid': '42',
                  'category': '1',
                  'is_tutor': '0',
                  'username': 'feiment0006',
                  'photo': null
                },
                {
                  'id': '43',
                  'wid': '7',
                  'message': '子类回复',
                  'who_message': '5',
                  'message_who': '4',
                  'create_time': '04/23',
                  'pid': '42',
                  'category': '1',
                  'is_tutor': '0',
                  'username': 'feiment0005',
                  'photo': null
                },
                {
                  'id': '44',
                  'wid': '7',
                  'message': '回复 Mrwang：按时打发地方',
                  'who_message': '1107',
                  'message_who': '5',
                  'create_time': '04/23',
                  'pid': '42',
                  'category': '1',
                  'is_tutor': '0',
                  'username': 'Mrwang',
                  'photo': '/Uploads/2018-04-09/5acb2fba9fc7d.jpg'
                },
                {
                  'id': '45',
                  'wid': '7',
                  'message': '回复 Mrwang：阿萨房东',
                  'who_message': '1107',
                  'message_who': '5',
                  'create_time': '04/23',
                  'pid': '42',
                  'category': '1',
                  'is_tutor': '0',
                  'username': 'Mrwang',
                  'photo': '/Uploads/2018-04-09/5acb2fba9fc7d.jpg'
                },
                {
                  'id': '49',
                  'wid': '7',
                  'message': '发表',
                  'who_message': '1107',
                  'message_who': '4',
                  'create_time': '04/23',
                  'pid': '42',
                  'category': '1',
                  'is_tutor': '0',
                  'username': 'Mrwang',
                  'photo': '/Uploads/2018-04-09/5acb2fba9fc7d.jpg'
                }
              ]
            },
            {
              'id': '40',
              'wid': '7',
              'message': '在线课程发表一条留言',
              'who_message': '4',
              'message_who': '1',
              'create_time': '04/23',
              'pid': '0',
              'category': '1',
              'is_tutor': '0',
              'username': 'feiment0004',
              'photo': null,
              'sub_message': [
                {
                  'id': '55',
                  'wid': '7',
                  'message': '我看着你不顺眼，别再我的文章下说话',
                  'who_message': '1',
                  'message_who': '4',
                  'create_time': '04/25',
                  'pid': '40',
                  'category': '1',
                  'is_tutor': '1',
                  'username': '赵晓曼',
                  'photo': '/Uploads/2018-03-15/5aa9d1d029dbf.jpg'
                },
                {
                  'id': '41',
                  'wid': '7',
                  'message': '没索拉卡上课了上课了上课了上课了可莱丝',
                  'who_message': '1107',
                  'message_who': '4',
                  'create_time': '04/23',
                  'pid': '40',
                  'category': '1',
                  'is_tutor': '0',
                  'username': 'Mrwang',
                  'photo': '/Uploads/2018-04-09/5acb2fba9fc7d.jpg'
                },
                {
                  'id': '46',
                  'wid': '7',
                  'message': '回复 Mrwang：打发的说法的是',
                  'who_message': '1107',
                  'message_who': '4',
                  'create_time': '04/23',
                  'pid': '40',
                  'category': '1',
                  'is_tutor': '0',
                  'username': 'Mrwang',
                  'photo': '/Uploads/2018-04-09/5acb2fba9fc7d.jpg'
                }
              ]
            }
          ],
          'is_login': 0
        },
        disdetailsdata: {
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
        this.showcomment = true
      },
      hide() {
        this.showcomment = false
      },
      getdata() {
        let that = this
        let userinfo = JSON.parse(localStorage.getItem('userInfo'))
        that.myData = userinfo.data
      },
      godetails(obj, cid) {
        if (obj) {
          this.selectClass(cid)
        } else {
          this.seedetails(cid)
        }
      },
      selectClass(id) {
        let that = this
        that.$refs.coursecatalog.show()
        let loading = Loading.service({
            lock: true,
            text: '拼命加载中',
            background: 'rgba(0, 0, 0, 0.8)'
        })
        axios.get(Global.baseURL + '/Mobile/Index/catalog.html', {
          params: {
          id: id
       }}).then((response) => {
             that.coursecataData = response.data
             loading.close()
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
        id: id
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
      'm-cscatalog': cscatalog,
      'm-details': disdetails
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .commentbox
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
      .commentbg
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
        .commentmain
          width: 100%
          .commentlist
            padding: 12px 0
            margin: 0 12px
            border-bottom: 1px solid #ddd
            .listTop
              line-height: 26px
              .touxiang
                width: 26px
                float: left
                img
                  width: 100%
              .name
                font-size: 12px
                color: #999
                margin-left: 6px
                float: left
              .rjt
                float: right
                margin-right: 16px
              .date
                float: right
                color: #999999
                margin-right: 16px
                font-size: 12px
            .listmid
              line-height: 20px
              font-size: 14px
              color: #444
              width: 82%
              margin: 0 auto
            .listbtm
              border: 1px solid #add5f8
              line-height: 28px
              margin-top: 16px
              font-size: 12px
              .btmname
                float: left
                margin-left: 10px
                color: #222
              .btmnum
                float:right
                margin-right: 12px
                margin-bottom: 4px
                color: #999
  .clear
    clear: both
</style>
