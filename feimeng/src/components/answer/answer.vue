<template>
	<div class="containerBox1">
		<div class="title"><img class="back" @click="$router.go(-1)" src="./back.png" alt=""></div>
		<div class="detailTitle1">
			<p>首届航空工业"全国通航日"航空知识 </p>
			<p>网络有奖竞答（青少组）</p>
		</div>
		<div class="answerBox">
			<div class="answerBox-small">
				
			</div>
		</div>
		<img src="./roucket.png" class="roucket"/>
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
				AnswerDetail: {
				}
			}
		},
		watch: {
			'$route' (to, from) {
				// 对路由变化作出响应...
				//    console.log(this.$route.query.id,'-------------id')
				if(this.$route.query.id) {
					//路由变化获取接口id
					this.getAnswerDetail(this.$route.query.id)
				}
			}
		},
		//页面创建之后执行
		created() {
			this.getdata()
			this.getAnswerDetail(this.$route.query.id)

		},
		methods: {
			getAnswerDetail(id) {
				let that = this
				let loading = Loading.service({
					lock: true,
					text: '拼命加载中',
					background: 'rgba(0, 0, 0, 0.8)'
				})
				axios.get(Global.baseURL + '/Mobile/Competition/subject.html', {
					params: {
						id: id,
						uid: that.myData.uid
					}
				}).then((response) => {
					loading.close()
					that.answerDetail = response.data;
					console.log(that.answerDetail)
					

				})
			},
			getdata() {
				let that = this
				let userinfo = JSON.parse(localStorage.getItem('userInfo'))
				that.myData = userinfo.data

			}
		},
		components: {
		}
	}
</script>

<style>
	.containerBox1{
		width: 100%;
		height: 100%;
		background:url(./answerbg.png) no-repeat;
		background-size: 100% 100%;
		/*overflow: hidden;*/
	}
	.roucket{
		width: 150px;
		height: 150px;
		position: absolute;
		bottom:0 ;
		left: 0;
	}
	.answerBox{
		width: 100%;
		height: 75%;
		/*background: white;*/
		display: flex;
		justify-content: space-around;
	}
	.answerBox-small{
		width: 90%;
		height: 100%;
		background: white;		
		border-radius: 40px;
	}
	.back {
		width: 10px;
		position: absolute;
		left: 0px;
		top: 10px;
		padding: 10px 14px;
	}
	.detailTitle1{
		width: 100%;
		color: #ffffff;
		font-size: 20px;
		font-weight: bold;
		line-height: 40px;
		margin-bottom: 10px;
		text-align: center;
		letter-spacing: 2px;
		height: 100px;
	}
	.detailTitle1 p{
		font-weight: 900;
	}
	.title {
		width: 100%;
		text-align: center;
		font-size: 20px;
		line-height: 50px;
		height: 50px;
		color: #fff;
		position: relative;
		top: 0;
	}
</style>