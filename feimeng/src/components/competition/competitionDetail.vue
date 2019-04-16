<template>
	<div class="container">
		<div class="title"><img class="back" @click="backList" src="./back.png" alt=""></div>
		<div class="detailTitle">{{competitionDetail.competition_name}}</div>
		<div class="selectBtn">
		<a class="analog" @click="beforeSimulation"><img src="./moni.png" class="signimg" />赛前模拟</a>
		<router-link :to="{path:'/seeresult',query: {id: this.$route.query.id}}"><a class="seeResult"><img src="./moni.png" class="signimg" />查看结果</a></router-link>
		<router-link :to="{path:'/signup',query: {id: this.$route.query.id}}"><a class="signUp"><img src="./baoming.png" class="signimg" />{{competitionStatus}}</a></router-link>
		</div>
		<div class="content1" v-html="competitionDetail.content">

		</div>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import axios from 'axios'
	import Global from 'common/js/global'
	import { Loading } from 'element-ui'
	export default {
		data() {
			return {
				baseurl: Global.baseURL,
				competitionDetail: {
					content: ''
				},
				competitionStatus: ''
			}
		},
		watch: {
			'$route' (to, from) {
				// 对路由变化作出响应...
				//    console.log(this.$route.query.id,'-------------id')
				if(this.$route.query.id) {
					//路由变化获取接口id
					this.getCompetitionDetail(this.$route.query.id)
				}
			}
		},
		//页面创建之后执行
		created() {
			this.getdata()
			this.getCompetitionDetail(this.$route.query.id)

		},
		methods: {
			getCompetitionDetail(id) {
				let that = this
				let loading = Loading.service({
					lock: true,
					text: '拼命加载中',
					background: 'rgba(0, 0, 0, 0.8)'
				})
				axios.get(Global.baseURL + '/Mobile/Competition/detail.html', {
					params: {
						id: id,
						uid: that.myData.uid
					}
				}).then((response) => {
					loading.close()
					that.competitionDetail = response.data.data;
//					console.log(that.competitionDetail)
					//判断竞赛状态
					let raceStatus = that.competitionDetail.status;
					let raceSign = that.competitionDetail.is_sign;
					let answerStatus = that.competitionDetail.AnswerStatus;
					//      console.log(recommendStatus)
					//      console.log(recommendSign)
					if(raceStatus == 1) {
						if(raceSign == 1){
							this.competitionStatus = '我已报名'
						}else{
							this.competitionStatus = '我要报名'
						}
						$(".seeResult").hide()
						$(".analog").show();
						$(".signUp").show();
					}else {
						$(".analog").hide();
						$(".signUp").hide();
						$(".seeResult").show()
					}
					
				})
				.catch(function (error) {
		          console.log(error)
		        })
			},
			backList(){
				this.$router.push({path:'/competition'})
			},
			beforeSimulation(id){
				let that = this;
				axios.get(Global.baseURL + '/Mobile/Competition/checkSign.html', {
					params: {
						cid: this.$route.query.id,
						uid: that.myData.uid
					}
				}).then((response) => {
					//赛前模拟
					that.beforeImitate = response.data;

					console.log(that.beforeImitate.status)
					let contestStatus = that.beforeImitate.status;
					if(contestStatus == 1){
						this.$router.push({path:'/answer',query: {id: this.$route.query.id}})
					}else{
						this.$message.error(response.data.info);
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

			}
		},
		components: {
			swiper,
			swiperSlide,
		}
	}
</script>

<style>
	.signimg {
		width: 15px;
		height: 15px;
		margin-right: 5px;
	}
	
	.analog {
		padding: 7px 10px;
		background: white;
		border-radius: 20px;
		line-height: 10px;
		margin-top: 10px;
		color: #5ca7ef;
		font-size: 14px;
		float: right;
	}
	.seeResult{
		padding: 7px 10px;
		background: white;
		border-radius: 20px;
		line-height: 10px;
		margin-top: 10px;
		color: #5ca7ef;
		font-size: 14px;
		float: right;
		display: none;
	}
	.signUp {
		padding: 7px 10px;
		background: white;
		border-radius: 20px;
		line-height: 10px;
		margin-top: 10px;
		color: #5ca7ef;
		font-size: 14px;
		float: right;
		margin-right: 10px;
	}
	
	.container {
		width: 100%;
		height: 100%;
		background: #fff url(./indexbbg.png) no-repeat;
		background-size: 100%;
		position: absolute;
		display: block;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}
	
	.back {
		width: 10px;
		position: absolute;
		left: 0px;
		top: 10px;
		padding: 10px 14px;
	}
	
	.detailTitle {
		width: 82%;
		margin-left: 16px;
		color: #ffffff;
		font-size: 16px;
		font-weight: bold;
		line-height: 20px;
		margin-bottom: 10px;
	}
	
	.title {
		text-align: center;
		font-size: 20px;
		line-height: 50px;
		height: 50px;
		color: #fff;
		position: relative;
		top: 0;
	}
	
	.selectBtn {
		width: 90%;
		padding: 0 3%;
		height: 50px;
		color: white;
	}
	
	.content1 {
		width: 90%;
		padding: 0 5% 15%;
		background: #fff;
		background-size: 100%;
		margin-top: 30px;
	}
</style>