<template>
  <div class="competitionbg">
    <div class="competitionTitle">竞赛</div>
    <div class="competitionmain">
      <div class="competitionbanner">
        <div class="content">
          <img class="topimg" src="./coursebg.png" alt="" style="opacity:0">
        </div>
      </div>
      <div class="competitionList">
        <li class="listdl" v-for="(item,index) in competition.data.list" :key = 'index' @click="selectClass(item.id)">
          <!--<dt><img :src="baseurl + item.thumb"></dt>
          <dd>
            <div class="ddtop">{{item.competition_name}}</div>
            <div class="ddbtm">{{item.course_count}}课时</div>
          </dd>-->
          <div class="img"><img :src="baseurl + item.thumb" style="width: 90px;height: 90px;"/> </div>
          <div style="width: 85%; margin-left: 10px;">
          	<p style="width: 95%;line-height: 30px; margin-top: 5px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.competition_name}}</p>
          	<p style="font-size: 14px;line-height: 20px;color: #999;">{{item.info}}</p>
          	<p style="font-size: 14px;line-height: 30px;"><a href="javascript:;" style="color:#ffa939;">[详情]</a><a class="signUp" href="javascript:;" style="color:#0188cc;float: right;">{{item.competitionState}}</a></p>
          </div>
        </li>
      </div>
    	<!--<m-cscatalog ref="coursecatalog" @updateData="selectClass" :data="coursecataData"></m-cscatalog>-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import axios from 'axios'
import Global from 'common/js/global'
import { Loading } from 'element-ui'
//import cscatalog from 'components/coursecatalog/coursecatalog'
export default {
  data() {
    return {
      baseurl: Global.baseURL,
      competition: {},
      coursecataData: {
        'LoginUserPhoto': '/Uploads/2018-03-08/5aa09b57ceb68.jpg',
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
        'is_login': 0
      }
    }
  },
  mounted () {
    this.getdata()
    this.getCompetition()
  },
  methods: {
    getCompetition() {
      let that = this
      let loading = Loading.service({
          lock: true,
          text: '拼命加载中',
          background: 'rgba(0, 0, 0, 0.8)'
      })
      axios.get(Global.baseURL + '/Mobile/Competition/Lists.html', {
           params: {
          	uid: that.myData.uid
        }}).then((response) => {
         loading.close()
        that.competition = response.data;
//      console.log(that.competition.data.list)
        //判断竞赛状态
	      // 在这获取到数据后添加一个私有属性，
        that.competition.data.list.forEach(item => {
          if(item.status == 2){
            // 根据状态显示不同的内容
            item.competitionState = '查看结果'
          }else if(item.status == 1){
	          	if(item.is_sign == 1){
	            item.competitionState = '我已报名'
	          }else{
	          	item.competitionState = '我要报名'
	          }
          } else {
          	//其他情况
          }
        })
	      
       })
       .catch(function (error) {
          console.log(error)
        })
       },
       getdata() {
         let that = this
         let userinfo = JSON.parse(localStorage.getItem('userInfo'))
         that.myData = userinfo.data
//          console.log(that.myData)
       },
       selectClass(id) {
            console.log(id)
         let that = this
//			子页面显示
//       that.$refs.coursecatalog.show()
         let loading = Loading.service({
             lock: true,
             text: '拼命加载中',
             background: 'rgba(0, 0, 0, 0.8)'
         })
         axios.get(Global.baseURL + '/Mobile/Competition/detail.html', {
           params: {
           id: id, uid: that.myData.uid
        }}).then((response) => {
                 console.log(response.data)
              that.coursecataData = response.data
              loading.close()
           })
       }
     },
    components: {
      swiper,
      swiperSlide,
//    'm-cscatalog': cscatalog
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.competitionbg
    background: url(./indexbg.png) no-repeat
    background-size: 100%
    width: 100%
    height: 100%
    overflow-y: scroll
    -webkit-overflow-scrolling: touch
    .competitionTitle
      text-align:center
      font-size: 20px
      line-height: 60px
      color: #fff
    .competitionmain
      width: 100%
      margin-bottom:44px
      .competitionbanner
        background: url(./bannerbg.png)
        background-size: cover
        .content
          padding: 0 14px
          overflow: hidden
          position: relative
          z-index: -1
          .topimg
            width: 100%
            margin-top: 40px
          .swiper-container
            /*width: 100%*/
            height: 100%
            margin-top: 40px
            border-radius: 15px
            .swiper-wrapper
              /*width: 100%*/
              height: 100%
              .swiper-slide
                width: 78.5%
                transition: all .5s;
                .txt
                  position: absolute
                  top: 50%
                  left: 50%
                  transform: translate(-50%, -50%)
                  color: #ffffff
                  font-size:18px
                  font-weight: bold
                img
                  width: 100%
            .swiper-pagination-bullets
              left: 31%
              bottom: 2%
              .swiper-pagination-bullet
                width: 5px
                height: 5px
                background: #e7e7e7
                opacity: 1
                margin: 0 2px
              .swiper-pagination-bullet-active
                background: #ffca59
      .competitionList
        padding-left: 0.5%
        width: 99.5%
        background: #fff url(./courselistbg.png) no-repeat
        background-size: 100%
        padding-bottom: 20px
        margin-top: -30%
        .listdl
          width: 96.5%
          line-height:90px
          margin: 15px 2% 0
          display: flex
          background: #f0f8ff
          border-radius: 8px
          dt
            border-radius: 8px
            box-sizing: border-box
            border: 3px solid #a1d3ff
            overflow: hidden
            img
              width: 10%
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

</style>