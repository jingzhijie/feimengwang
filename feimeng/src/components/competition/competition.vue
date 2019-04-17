<template>
  <div class="competitionbg">
    <div class="competitionTitle">竞赛</div>
    <div class="competitionmain">
      <div class="competitionbanner">
        <div class="content">
        	<div class="recommendbg">
        		<div class="recommendbg-title">
        			<p>歌尔杯2018荣成全国航空 嘉年华活动成功起航</p>
        		</div>
        		<ul class="recommendul">
        			<li>
        				<img src="./fmjs_icon1.png" />
        				<router-link :to="{path:'/competitionDetail',query:{id:recommendId}}"><span>参赛要求</span></router-link>
        			</li>
        			<li class="signup">
        				<img src="./fmjs_icon2.png" />
        				<router-link :to="{path:'/signUp',query:{id:recommendId}}"><span>{{recommendStatus}}</span></router-link>
        			</li>
        			<li class="mock">
        				<img src="./fmjs_icon3.png" />
        				<router-link class="beforeMock" :to="{path:'/answer',query:{id:recommendId}}"><span>赛前模拟</span></router-link>
        			</li>
        			<li class="result" style="display: none;">
        				<img src="./fmjs_icon3.png" />
        				<router-link class="viewResults" :to="{path:'/seeResult',query:{id:recommendId}}"><span>查看结果</span></router-link>
        			</li>
        		</ul>
        	</div>
        </div>
      </div>
      <div class="competitionList">
      	<li class="listDetail" v-for="(item,index) in competition.data.list" :key = 'index' >
	      		<router-link :to="{path:'/competitionDetail',query: {id: item.id}}"><div class="img"><img :src="baseurl + item.thumb" style="width: 100px;height: 100px;"/></div></router-link>
	      		<div class="listDetail_right">
	      			<p class="listDetail_right_title">{{item.competition_name}}</p>
	      			<div class="listDetail_right_btn">
	      				<router-link :to="{path:'/seeresult',query:{id:item.id}}" v-if="item.status == 2"><span class="signUp"><img style="width: 15px;height: 15px;margin-right: 5px;" src="./sign.png" />查看结果</span></router-link>
	      				<router-link :to="{path:'/signUp',query:{id:item.id}}" v-else-if="(item.status ==1)&&(item.is_sign == 1)"><span class="signUp"><img style="width: 15px;height: 15px;margin-right: 5px;" src="./sign.png" />我已报名</span></router-link>
	      				<router-link :to="{path:'/signUp',query:{id:item.id}}" v-else><span class="signUp"><img style="width: 15px;height: 15px;margin-right: 5px;" src="./sign.png" />我要报名</span></router-link>
	      			</div>
	      		</div>
      	</li>
      </div>
    </div>
  </div>
 
</template>

<script type="text/ecmascript-6">
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import axios from 'axios'
import Global from 'common/js/global'
import { Loading } from 'element-ui'
import CompetitionDetail from 'components/competition/competitionDetail'
import signUp from 'components/csignup/signup'
export default {
  data() {
    return {
      baseurl: Global.baseURL,
      competition: {
				data: {
					list: [
						
					]
				},
			},
			recommendStatus:'',
			recommendId:''
			
    }
  },
  created () {
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
//      console.log(that.competition.data.recommend)
        //判断列表页竞赛状态
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
        //获取推荐列表id
        that.recommendId = that.competition.data.recommend.id
        //判断推荐列表竞赛状态
        let recommendStatus = that.competition.data.recommend.status;
        let recommendSign = that.competition.data.recommend.is_sign;
//      console.log(recommendStatus)
//      console.log(recommendSign)
           if(recommendStatus == 1){
          	if(recommendSign == 1){
          		 this.recommendStatus = '我已报名'
          	}else{
	          	this.recommendStatus = '我要报名'
          	}
          	$(".result").hide();
          	$(".mock").show();
          	$(".signup").show();
          }else{
          	$(".result").show();
          	$(".mock").hide();
          	$(".signup").hide();
          }
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
//          console.log(id)
         let that = this
         let loading = Loading.service({
             lock: true,
             text: '拼命加载中',
             background: 'rgba(0, 0, 0, 0.8)'
         })
//       axios.get(Global.baseURL + '/Mobile/Competition/detail.html', {
//         params: {
//         id: id, uid: that.myData.uid
//      }}).then((response) => {
//            that.coursecataData = response.data
//            console.log(that.coursecataData.data)
//            loading.close()
//         })
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
      height:250px
      margin-bottom:44px
      .competitionbanner
        background: url(./bannerbg.png)
        background-size: cover
        .content
          padding: 0 14px
          height:200px
          overflow: hidden
          position: relative
          .recommendbg
          	width:93%
          	height:70%
          	background: url(./beibeibg.png) no-repeat
          	background-size: 100% 100%
          	position:absolute
          	top:40px
          	.recommendbg-title
          	 width:70%
          	 margin-left:25%
          	 padding:20px 3%
          	p
          	 	 font-size:20px
          	 	 color:white
          	 	 font-weight:bold
          	 	 letter-spacing:2px
          	 	 line-height:25px
          	.recommendul
          	 width:100%
          	 display:flex
          	 justify-content:space-around
          		li
          			display:flex
          			width:90px
          			line-height:20px
          			padding:5px 10px
          			font-size:14px
          			border-radius:5px
          			background:#ffeea3
          			justify-content:center
          			span
          				margin-left:5px 
          			a
          				color:#000	
          			img
          				width:20px
          				height:20px
          			
          			
      .competitionList
        width: 100%
        background: #fff url(./courselistbg.png) no-repeat
        overflow: hidden
        background-size: 100%
        padding-bottom: 20px
        display:flex
        justify-content:center
        flex-wrap: wrap
				.listDetail
				 width:90%
				 height:100px
				 border:1px solid #0085ea
				 margin-bottom:10px
				 border-radius:10px
				 padding:10px
				 display:flex
				 .img
				 	width:29%
				 	height:100px
				 	margin-right:10px
				 .listDetail_right
				 		width:71%
				 		height:100px
						.listDetail_right_title
						 	width:100%
						 	font-size:20px	
						 	font-weight:bold
						 	line-height:30px
						 	height:60px
						 	letter-spacing:3px
				 		.listDetail_right_btn
						 	width:100%
						 	height:40px
						  line-height:40px
						  .signUp
						   padding:7px 15px
						   background:#0083e7
						   border-radius:20px
						   line-height:10px
						   float:right
						   margin-top:10px
						   color:white
						   font-size:14px
</style>