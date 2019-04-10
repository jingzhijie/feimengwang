<template>
	<div class="subjectBoxer">
		<div class="title2"><img class="back" @click="$router.go(-1)" src="./back.png" alt=""></div>
		<div class="answerTitle">
			<p>本次答题您共答对5道题</p>
			<p>得分33.33分</p>
		</div>
		<div class="answerBox1">
			<div class="answerBox-small1">
				<div class="subjectContainer">
					<div class="subjectContainer-title">
						<div class="subright1"><span>1.&nbsp;&nbsp;</span><span>2月22日，SpaceX“猎鹰9号”5年的 时间将多少颗卫星送入近地轨道？</span></div>
					</div>
				</div>
			</div>
		</div>
		<img src="./subsub.png" class="roucket1"/>
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
//			this.getAnswerDetail(this.$route.query.id)

		},
		methods: {
			getAnswerDetail(id) {
				let that = this
				let loading = Loading.service({
					lock: true,
					text: '拼命加载中',
					background: 'rgba(0, 0, 0, 0.8)'
				})
//				axios.get(Global.baseURL + '/Mobile/Competition/subject.html', {
//					params: {
//						id: id,
//						uid: that.myData.uid
//					}
//				}).then((response) => {
//					loading.close()
//					that.answerDetail = response.data.data;
//					that.allNum = that.answerDetail.num;
//					console.log(that.answerDetail[0].problem)
//					
//
//				})
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
	.subjectBoxer{
		width: 100%;
		height: 100%;
		background:url(./answerbg.png) no-repeat;
		background-size: 100% 100%;
	}
	.subjectContainer-title{
		width: 100%;
		height: 80px;
		margin-top: 10px;
		display: flex;
	}
	.subright1{
		height: 80px;
		line-height: 25px;
	}
	.subright1 span{
		font-size: 16px;
	}
	.roucket1{
		width: 100px;
		height: 150px;
		position: absolute;
		top:87px ;
		left: 0;
	}
	.answerBox1{
		width: 100%;
		height: 75%;
		display: flex;
		justify-content: space-around;
	}
	.answerBox-small1{
		width: 80%;
		height: 93%;
		background: white;		
		border-radius: 40px;
		padding: 20px;
	}
	.back {
		width: 10px;
		position: absolute;
		left: 0px;
		top: 10px;
		padding: 10px 14px;
	}
	.answerTitle{
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
	.answerTitle p{
		font-weight: 900;
	}
	.title2 {
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