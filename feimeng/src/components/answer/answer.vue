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
						<el-radio-group v-model="choose" @change="getRadio">
					    	<p><el-radio v-for="(item,index) in options" :label="item.value" :key = 'index'>{{item.content}}</el-radio></p>
					    </el-radio-group>
					</div>
					<div class="checkSubject">
						<a class="prevSub" @click="prevSub">上一题(<span>{{prevNum}}</span>)</a>
						<a class="nextSub" @click="nextSub">下一题(<span>{{nextNum}}</span>/<span>{{allNum}}</span>)</a>
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
				choose: null,
				allNum:'',
				titleNumber:'',
				prevNum:'',
				nextNum:'',
				problem:'',
				options:[],
				answerArray:[]
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
				that.prevNum = num-1;
				that.nextNum = num+1;
				that.problem =obj.problem;
				that.options = new Array();
				let answer = obj.answer;
				this.answerArray[this.problem - 1] = this.choose === "1" ?  "A" : this.choose === "2" ?  "B" : this.choose === "3" ?  "C" : "D"
//				that.choose = null;
				//第一题没有上一题
				if(num == 1){
					$(".prevSub").hide();
				}else{
					$(".prevSub").show();
				}
				//最后一题不让在点
//				console.log(that.allNum)
				if(that.nextNum == that.allNum){
					return false
				}
				let l = 1;
  				for(var i in answer){
                	that.options.push({'value':l++,'content':i+'. '+answer[i]});               	
             	}
//				console.log(this.options)
			},
			//上一题
			prevSub(){
				let that = this;
				that.rendering(that.prevNum,that.answerDetail[that.prevNum-1]);
			},
			//下一题
			nextSub(){
				let that = this;
				
				that.rendering(that.nextNum,that.answerDetail[that.nextNum-1]);
			},
			//获取那个radio
			getRadio(){
				console.log(this.choose)
				//获取当前选择的radio
				let answerNum = this.choose;
//				answerArray.push(answerNum);
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
		margin-top: 20px;
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
		height: 100px;
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