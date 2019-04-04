<template>
	<div class="container">
		<div class="title"><img class="back" @click="$router.go(-1)" src="./back.png" alt="" /></div>
		<div class="comp"></div>
		<!--<div class="content" v-html="competitionDetail.content"></div>-->
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
				}
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
					console.log(that.competitionDetail)
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
	.container {
		width: 100%;
		height: 100%;
		background: #fff url(../coursecatalog/cscatalog.png) no-repeat;
		position: absolute;
		top: 0;
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
	
	.title {
		text-align: center;
		font-size: 20px;
		line-height: 50px;
		height: 50px;
		color: #fff;
		position: relative;
	}
</style>