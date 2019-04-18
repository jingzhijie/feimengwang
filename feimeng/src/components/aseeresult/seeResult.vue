<template>
	<div class="containerBox3">
		<div class="endTop">
			<div class="title3"><img class="back" @click="$router.go(-1)" src="./back.png" alt="">飞梦网</div>
		</div>
		<div class="endBottom">
			<div class="headline">{{titleName}}</div>
			<div class="selection">评选结果</div>
			<div class="noticeContent" v-html="winner.find.reward_info"></div>
			<div class="groupClass">
				<div class="oldGroupClass"><span>获奖名单({{groupClass}})</span></div>
			</div>
			<div class="onePrize">
				<div class="groupClass">
					<div class="firstPrize">一等奖</div>
				</div>
				<div class="groupClassical">
					<div class="theFirst" v-for="(item,index) in winner.first_prize" :key = 'index' >
						<p>{{item.username}}</p>
						<p>{{item.school_name}}</p>
						<p>{{people}}</p>
					</div>
				</div>
			</div>
			<div class="twoPrize">
				<div class="groupClass">
					<div class="firstPrize">二等奖</div>
				</div>
				<div class="groupClassical">
					<div class="theFirst" v-for="(item,index) in winner.second_prize" :key = 'index' >
						<p>{{item.username}}</p>
						<p>{{item.school_name}}</p>
					</div>
				</div>
			</div>
			<div class="threePrize">
				<div class="groupClass">
					<div class="firstPrize">三等奖</div>
				</div>
				<div class="third">
					<div class="theFirst" v-for="(item,index) in winner.third_prize" :key = 'index' >
						<p>{{item.username}}</p>
						<p>{{item.school_name}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import Global from 'common/js/global'
	import { Loading } from 'element-ui'
	export default {
		data() {
			return {
				baseurl: Global.baseURL,
				titleName:'',
				groupClass:'',
				people:'',
				winner:{
					find:{
						reward_info:''
					}
				}
			}
		},
		watch: {
			'$route' (to, from) {
				// 对路由变化作出响应...
//				 console.log(this.$route.query.id,'-------------id')
				if(this.$route.query.id) {
					//路由变化获取接口id
					this.getresult(this.$route.query.id)
				}
			}
		},
		//页面创建之后执行
		created() {
			this.getdata()
			this.getresult(this.$route.query.id)
		},
		methods: {
			getresult(id) {
				let that = this;
				let loading = Loading.service({
					lock: true,
					text: '拼命加载中',
					background: 'rgba(0, 0, 0, 0.8)'
				})
				axios.get(Global.baseURL + '/Mobile/Competition/matchResult.html', {
					params: {
						cid: id
					}
				}).then((response) => {
					loading.close()
					that.winner = response.data.data;
					that.titleName = that.winner.find.competition_name;
					that.groupClass = that.winner.find.gid === '1' ? '青年组' :'成年组';
					//判断是否有人中奖
					if(that.winner.first_prize.length == 0){
						that.people = '无人参加竞赛'
					}
					if(that.winner.second_prize.length == 0){
						$(".twoPrize").hide()
					}
					if(that.winner.third_prize.length == 0){
						$(".threePrize").hide()
					}
				})
			},
			getdata() {
				let that = this
				let userinfo = JSON.parse(localStorage.getItem('userInfo'))
				that.myData = userinfo.data

			}
		},
	}
</script>

<style>
	.containerBox3{
		width: 100%;
		height: 100%;
		/*overflow-y: scroll;
		-webkit-overflow-scrolling: touch;*/
	}
	.endTop{
		width: 100%;
		height: 180px;
		background: #fff url(./signup.jpg) no-repeat;
		background-size: 100% 100%;
		position: fixed;
		top: 0;
	}
	.endBottom{
		width: 100%;
		height: 80%;
		position: absolute;
		top:125px;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}
	.onePrize{
		margin-bottom: 20px;
	}
	.twoPrize{
		margin-bottom: 20px;
	}
	.threePrize{
		margin-bottom: 20px;
	}
	.groupClassical{
		width: 100%;
		height: 60px;
		display: flex;
		justify-content: center;
		font-size: 14px;
	}
	.third{
		width: 100%;
		height: 60px;
		display: flex;
		justify-content: center;
		font-size: 14px;
		margin-bottom: 20px;
	}
	.groupClass{
		width: 100%;
		height: 60px;
		line-height:60px;
		display: flex;
		justify-content: center;
		font-size: 14px;
	}
	.theFirst{
		width: 90%;
		height: 60px;
		background: #fafeff;
		text-align: center;
		color: #444;
		border: 1px solid #ddf1f9;
		box-sizing:border-box;
	}
	.theFirst p:first-child{
		margin: 10px 0;
	}
	.theFirst p:nth-of-type(2){
		margin-bottom: 10px;
	}
	.oldGroupClass{
		width: 90%;
		background: #0084eb;
		text-align: center;
		color: white;
	}
	.firstPrize{
		width: 90%;
		background: #e5f4ff;
		text-align: center;
		color: #006e94;
	}
	.noticeContent{
		width: 90%;
		padding: 0 5% 10%;
		margin-top: 20px;
	}
	.noticeContent p{
		font-size: 14px !important;
		color: #444 !important;
		line-height: 25px !important;
	}
	.headline{
		width: 100%;
		height: 60px;
		line-height: 80px;
		text-align: center;
		font-weight: bold;
		font-size: 18px;
		color: #444;
	}
	.title3{
		text-align: center;
		font-size: 20px;
		line-height: 50px;
		height: 50px;
		color: #fff;
		position: relative;
		top: 0;
	}
	.selection{
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-weight: bold;
		font-size: 20px;
		color: #444;
	}
	.back {
		width: 10px;
		position: absolute;
		left: 0px;
		top: 10px;
		padding: 10px 14px;
	}
</style>