<template>
	<div class="containerBox1">
		<div class="title1"><img class="submit" @click="$router.go(-1)" src="./wrong.png" alt=""></div>
		<div class="detailTitle1">
			<p>首届航空工业"全国通航日"航空知识 </p>
			<p>网络有奖竞答（青少组）</p>
		</div>
		<div class="answerBox">
			<div class="answerBox-small">
				<div class="subjectBox">
					<div class="subjectBox-title">
						<div class="subleft"><span class="subNum">{{titleNumber}}</span></div>
						<div class="subright"><span>{{problem}}</span></div>
					</div>
					<div class="subradio">
						<el-radio-group v-model="choose">
					    	<p><el-radio v-for="(item,index) in options" :label="item.value">{{item.content}}</el-radio></p>
					    	<!--<p><el-radio :label="2">B.5425颗</el-radio></p>
					    	<p><el-radio :label="3">C.4225颗</el-radio></p>
					    	<p><el-radio :label="4">D.2245颗</el-radio></p>-->
					    </el-radio-group>
					</div>
					<div class="checkSubject">
						<a class="prevSub">上一题(<span>22</span>)</a>
						<a class="nextSub">下一题(<span>22</span>/<span>{{allNum}}</span>)</a>
					</div>
				</div>
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
				AnswerDetail: {},
				choose: 4,
				allNum:'',
				titleNumber:'',
				problem:'',
				options:[]
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
			rendering(num,obj){
				let that = this;
				that.titleNumber = num;
				that.problem =obj.problem;
				that.options = new Array();

				let answer = obj.answer;
				console.log(answer)
  				for(var i in answer){
                	console.log(i,answer[i]);
             	}
  				//let arrays = obj.answer.split(",");
//				console.log(arrays)
//				that.answer.forEach(item => {
//					console.log(item)
////					this.options[index]['value'] = index+1;
////					this.options[index]['content'] = item;
//		   		})
			},
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
					that.answerDetail = response.data.data;
					that.allNum = that.answerDetail.num;
					console.log(that.answerDetail)
					let problemArray = new Array();
//					that.answerDetail.forEach(item => {
//						problemArray.push(item);
//					})
					that.rendering(1,that.answerDetail[0]);
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
	}
	.checkSubject{
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: 20px;
	}
	.prevSub{
		padding: 10px 90px;
		background: #007ee8;
		color: #fff;
		border-radius: 20px;
		letter-spacing: 1px;
	}
	.nextSub{
		padding: 10px 76px;
		background: #ffb718;
		color: #fff;
		border-radius: 20px;
		margin-top: 20px;
		letter-spacing: 1px;
		
	}
	.subradio{
		width: 100%;
		height: 200px;
	}
	.subradio p{
		width: 100%;
		height: 50px;
		margin-left: 30px;
	}
	.subjectBox-title{
		width: 100%;
		height: 80px;
		margin-top: 10px;
		display: flex;
	}
	.subleft{
		height: 40px;
		display: flex;
		align-items: center;
	}
	.subright{
		height: 80px;
		margin-left: 20px;
		line-height: 25px;
	}
	.subright span{
		font-size: 16px;
		font-weight: bolder;
	}
	
	.subNum{
		padding: 8px;
		border-radius: 50%;
		color: #FFF;
		background: #00a6ea;
		font-size: 20px;
		font-weight: 600;
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
		display: flex;
		justify-content: space-around;
	}
	.answerBox-small{
		width: 80%;
		height: 93%;
		background: white;		
		border-radius: 40px;
		padding: 20px;
	}
	.submit {
		width: 20px;
		position: absolute;
		right: 0px;
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
	.title1 {
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