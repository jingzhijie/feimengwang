<template>
	<div class="subjectBoxer">
		<div class="title2"><img class="back" @click="backDetail" src="./back.png" alt=""></div>
		<div class="answerTitle">
			<p>本次答题您共答对{{count}}道题</p>
			<p>得分{{score}}分</p>
		</div>
		<div class="answerBox1">
			<div class="answerBox-small1">
				<div class="subjectContainer">
					<div class="subjectContainer-title" v-for="(item,index) in answerComparison.lists" :key = 'index' >
						<div class="subright1"><span>{{index+1}}.&nbsp;&nbsp;</span><span>{{item.title}}</span> 
							<!--判断是否显示 √ ×-->
							<span class="answerTrue" v-if="item.is_correct==1">[√]</span><span class="answerFalse" v-else>[×]</span>
							<div class="rightKey">{{item.correct_str}}</div>
							<div class="youChoose">{{item.error_str}}</div>
						</div>
						
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
				count:'',
				score:'',
				lists:[]
				
			}
		},
		watch: {
			'$route' (to, from) {
				// 对路由变化作出响应...
				//    console.log(this.$route.query.id,'-------------id')
				if(this.$route.query.id) {
					//路由变化获取接口id
					this.answerComparison(this.$route.query.id)
				}
			}
		},
		//页面创建之后执行
		created() {
			this.getdata()
			this.answerComparison(this.$route.query.id)

		},
		methods: {
			answerComparison(id) {
				let that = this
				let loading = Loading.service({
					lock: true,
					text: '拼命加载中',
					background: 'rgba(0, 0, 0, 0.8)'
				})
				axios.get(Global.baseURL + '/Mobile/Competition/competitionreturn.html', {
					params: {
						cid: id,
						uid: that.myData.uid
					}
				}).then((response) => {
					loading.close()
					that.answerComparison = response.data.data;
					console.log(that.answerComparison)
					that.count = that.answerComparison.success_count;
					that.score = that.answerComparison.fraction;
				})
			},
			backDetail(){
				this.$router.push({path:'/competitionDetail',query: {id: this.$route.query.id}})
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
	.rightKey{
		color: #00854b;
	}
	.answerTrue{
		color: #00854b;
	}
	.youChoose{
		color: #fa4a2e;
	}
	.answerFalse{
		color: #fa4a2e;
	}
	.subjectContainer-title{
		width: 100%;
		margin-top: 10px;
		display: flex;
	}
	.subright1{
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
		overflow-y: scroll;
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