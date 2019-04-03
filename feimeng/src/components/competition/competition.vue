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
      	 
	        <li class="listdl" v-for="(item,index) in competition.data.list" :key = 'index'>
	          <div class="img"><img :src="baseurl + item.thumb" style="width: 90px;height: 90px;"/> </div>
	          <div style="width: 85%; margin-left: 10px;">
	          	<p style="width: 95%;line-height: 30px; margin-top: 5px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.competition_name}}</p>
	          	<p style="font-size: 14px;line-height: 20px;color: #999;">{{item.info}}</p>
	          	<p style="font-size: 14px;line-height: 30px;"><router-link to="/competition/competitionDetail"><span @click="selectClass(item.id)" href="javascript:;" style="color:#ffa939;">[详情]</span></router-link><a class="signUp" href="javascript:;" style="color:#0188cc;float: right;">{{item.competitionState}}</a></p>
	          </div>
	        </li>
	        <li class="listdl" v-for="(item,index) in competition.data.list" :key = 'index'>
	          <div class="img"><img :src="baseurl + item.thumb" style="width: 90px;height: 90px;"/> </div>
	          <div style="width: 85%; margin-left: 10px;">
	          	<p style="width: 95%;line-height: 30px; margin-top: 5px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.competition_name}}</p>
	          	<p style="font-size: 14px;line-height: 20px;color: #999;">{{item.info}}</p>
	          	<p style="font-size: 14px;line-height: 30px;"><router-link to="/competition/competitionDetail"><span @click="selectClass(item.id)" href="javascript:;" style="color:#ffa939;">[详情]</span></router-link><a class="signUp" href="javascript:;" style="color:#0188cc;float: right;">{{item.competitionState}}</a></p>
	          </div>
	        </li>
	        <li class="listdl" v-for="(item,index) in competition.data.list" :key = 'index'>
	          <div class="img"><img :src="baseurl + item.thumb" style="width: 90px;height: 90px;"/> </div>
	          <div style="width: 85%; margin-left: 10px;">
	          	<p style="width: 95%;line-height: 30px; margin-top: 5px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.competition_name}}</p>
	          	<p style="font-size: 14px;line-height: 20px;color: #999;">{{item.info}}</p>
	          	<p style="font-size: 14px;line-height: 30px;"><router-link to="/competition/competitionDetail"><span @click="selectClass(item.id)" href="javascript:;" style="color:#ffa939;">[详情]</span></router-link><a class="signUp" href="javascript:;" style="color:#0188cc;float: right;">{{item.competitionState}}</a></p>
	          </div>
	        </li>
      </div>
       <div  v-for="(item,index) in competition.data.list">
       	<!--要求-->
      	<a @click="requirements">参赛要求</a>
      	<!--报名-->
      	<a @click="isignUp">{{item.competitionState}}</a>
      	<!--赛前模拟-->
      	<a @click="simulation">赛前模拟</a>
      </div>
    </div>	
     	<router-view></router-view>
  </div>
 
</template>

<script type="text/ecmascript-6">
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import axios from 'axios'
import Global from 'common/js/global'
import { Loading } from 'element-ui'
import CompetitionDetail from 'components/competition/competitionDetail'
export default {
  data() {
    return {
      baseurl: Global.baseURL,
      competition: {
				data: {
					list: []
				}
			}
    }
  },
  created () {
    this.getdata()
    this.getCompetition()
  },
  methods: {
  	//参赛要求
  	requirements(){
  		
  	},
  	//我要报名
  	isignUp(){
  		
  	},
  	//赛前模拟
  	simulation(){
  		
  	},
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
         let loading = Loading.service({
             lock: true,
             text: '拼命加载中',
             background: 'rgba(0, 0, 0, 0.8)'
         })
         axios.get(Global.baseURL + '/Mobile/Competition/detail.html', {
           params: {
           id: id, uid: that.myData.uid
        }}).then((response) => {
              that.coursecataData = response.data
              console.log(that.coursecataData.data)
              loading.close()
           })
       }
     },
    components: {
      swiper,
      swiperSlide,
      CompetitionDetail,
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