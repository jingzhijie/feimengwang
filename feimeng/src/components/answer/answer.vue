<template>
	<div class="containerBox1">
		<div class="title1"><img class="submit" @click="mask" src="./wrong.png" alt=""></div>
		<div class="detailTitle1">
			<p>首届航空工业"全国通航日"航空知识 </p>
			<p>网络有奖竞答（青少组）</p>
		</div>
		<div class="answerBox">
			<div class="answerBox-small">
				<div class="subjectBox">
					<div class="subjectBox-title">
						<div class="subleft"><label><span class="subNum">{{titleNumber}}</span></label></div>
						<div class="subright"><span>{{problem}}</span></div>
					</div>
					<div class="subradio">
						<el-radio-group v-model="choose" @change="getRadio">
					    	<p v-for="(item,index) in options"  :key = 'index'><el-radio :label="item.value">{{item.content}}</el-radio></p>
					    </el-radio-group>
					</div>
					<div class="checkSubject">
						<a class="prevSub" @click="prevSub">上一题(<span>{{prevNum}}</span>)</a>
						<a class="nextSub" @click="nextSub">下一题(<span>{{nextNum}}</span>/<span>{{allNum}}</span>)</a>
						<a class="subAnswer" @click="mask"><span>提交</span></a>
					</div>
				</div>
			</div>
		</div>
		<img src="./roucket.png" class="roucket"/>
		<div class="alertWindow">
			<div class="alertbg">
				<div class="wrong">
					<img src="./wrong.png" @click="closeWindow"/>
				</div>
				<div class="sure">
					<p>确认提交？</p>
					<p>提交后不可修改</p>
				</div>
				<div class="btngroup">
					<a class="sureSub" @click="subAnswer">确认提交</a>
					<a class="think"  @click="closeWindow">在想想</a>
				</div>
			</div>
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
				AnswerDetail: {},
				choose: null,
				allNum:'',
				titleNumber:'',
				prevNum:'',
				nextNum:'',
				problem:'',
				options:[],
				answerArray:new Array()
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
			rendering(num,obj,chooseSelect = '',type){
				let that = this;
				that.titleNumber = num;
				that.prevNum = num-1;
				that.nextNum = num+1;
				that.problem =obj.problem;
				that.options = new Array();
				let answer = obj.answer;
				if(chooseSelect && num-1 >= 0){
				 //that.answerArray[num-1] = chooseSelect === "1" ?  "A" : chooseSelect === "2" ?  "B" : chooseSelect === "3" ?  "C" : "D";					
					switch(chooseSelect){
						case 1:
						  that.answerArray[num-1] = 'A';
						break;
						case 2:
						  that.answerArray[num-1] = 'B';
						break;
						case 3:
						  that.answerArray[num-1] = 'C';
						break;
						case 4:
						  that.answerArray[num-1] = 'D';
						break;
					}
				}
//				console.log(that.answerArray)
				that.choose = null;
				//第一题没有上一题
				
				if(num == 1){
					$(".prevSub").hide();
				}else{
					$(".prevSub").show();
				}
				//最后一题变成提交
				if(that.nextNum == Number(that.allNum)+Number(1)){
					$(".nextSub").hide();
//					$(".prevSub").hide();
					$(".subAnswer").show();
				}else{
					$(".nextSub").show();
					$(".subAnswer").hide();
				}
				let l = 1;
  				for(var i in answer){
  					if(that.answerArray[num]){
	  					switch(that.answerArray[num]){
	  						case 'A':
	  						  that.choose = 1;
	  						break;
	   						case 'B':
	  						  that.choose = 2;
	  						break;
	   						case 'C':
	  						  that.choose = 3;
	  						break;
	   						case 'D':
	  						  that.choose = 4;
	  						break;
	  					}
  					}else{
  						that.choose = null;
  					}
                	that.options.push({'value':l++,'content':i+'. '+answer[i]});               	
             	}
				
			},
			//上一题
			prevSub(){
				let that = this;
				that.choose = null;
				that.rendering(that.prevNum,that.answerDetail[that.prevNum-1],that.choose,1);
			},
			//下一题
			nextSub(){
				if(this.choose == null){
					this.$message.error('请选择您的答案');
			        return false;
				}
				let that = this;
				that.rendering(that.nextNum,that.answerDetail[that.nextNum-1],that.choose,2);
			},
			//获取那个radio
			getRadio(){
//				console.log(this.choose)
				//获取当前选择的radio
				let answerNum = this.choose;
//				answerArray.push(answerNum);
			},
			//遮罩显示
			mask(){
				$(".alertWindow").show();
			},
			//遮罩关闭
			closeWindow(){
				$(".alertWindow").hide();
			},
			//获取问题接口
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
					if(response.data.status == -1){
						this.$router.push({path:'/competitionDetail',query: {id: this.$route.query.id}})
						 this.$message.error(response.data.info);
						 return;
					}
					console.log(response.data.status)
					that.answerDetail = response.data.data;
					that.allNum = that.answerDetail.num;

					that.rendering(1,that.answerDetail[0]);
				})
			},
			//提交答案
			subAnswer(){
				let that = this;
				if(that.choose == null){
					that.$message.error('请选择您的答案');
			        return false;
				}
					switch(that.choose){
						case 1:
						  that.answerArray[that.allNum] = 'A';
						break;
						case 2:
						  that.answerArray[that.allNum] = 'B';
						break;
						case 3:
						  that.answerArray[that.allNum] = 'C';
						break;
						case 4:
						  that.answerArray[that.allNum] = 'D';
						break;
					}				
				$(".alertWindow").hide();				
				let loading = Loading.service({
					lock: true,
					text: '拼命加载中',
					background: 'rgba(0, 0, 0, 0.8)'
				})
				let newArray = new Array();
				for(let i = 0;i<that.answerArray.length-1;i++){
					newArray[i] = that.answerArray[i+1];
				}
//				console.log(newArray)
//				let newString = JSON.stringify(newArray); 
//				console.log(newString) 
				//return false;
				axios.get(Global.baseURL + '/Mobile/Competition/submitSubject.html', {
					params: {
						cid: this.$route.query.id,
						uid: that.myData.uid,
						answer:newArray
					}
				}).then((response) => { 
					loading.close()
//					console.log(response.data.status)
					let answerStatus = response.data.status;
					let answerInfo = response.data.info;
					if(answerStatus == 1){
						this.$router.push({path:'/asubject',query: {id: this.$route.query.id}})
						 this.$message({message:"提交成功",type: 'success'});
						 return;
					}
					if(answerStatus == -1){
//						this.$router.push({path:'/asubject',query: {id: this.$route.query.id}})
						this.$message.error('提交失败');
						 return;
						
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
	.alertWindow{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.7);
		position: absolute;
		top: 0;
		display: none;
	}
	.sure{
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		height: 60px;
		font-size: 20px;
		color: #444;
		margin-top:110px;
	}
	.btngroup{
		width: 100%;
		display: flex;
		justify-content: space-around;
		margin-top: 10px;
	}
	.sureSub{
		padding: 10px 20px;
		color: white;
		letter-spacing: 2px;
		font-size: 16px;
		background: #01a3ea;
		border-radius: 20px;
	}
	.think{
		padding: 10px 30px;
		color: white;
		letter-spacing: 2px;
		font-size: 16px;
		background: #faa22c;
		border-radius: 20px;
		
	}
	.sure p{
		width: 100%;
		line-height: 20px;
		text-align: center;
	}
	.alertbg{
		width: 300px;
		height: 300px;
		background: url(./alert.png);
		background-repeat:no-repeat ;
		background-size: 100%;
		border-radius: 10px;
		position: absolute;
        top:50%;
        left:50%;
        margin-left:-150px;
        margin-top:-150px;
	}
	.subradio .el-radio{
		width: 95%;
		margin-right: 0;
		margin: 10px 0;
		white-space: normal; 
		line-height: 22px;
	}
	.checkSubject{
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	.wrong{
		width: 100%;
		height: 30px;
	}
	.wrong img{
		width: 25px;
		float: right;
		margin-top: 10px;
		margin-right: 10px;
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
		letter-spacing: 1px;
		margin-bottom: 20px;
		margin-top: 20px;
	}
	.subAnswer{
		padding: 10px 116px;
		background: #ffb718;
		color: #fff;
		border-radius: 20px;
		letter-spacing: 1px;
		margin-bottom: 20px;
		margin-top: 20px;
	}
	.subradio{
		width: 100%;
		/*height: 200px;*/
		margin-top:20px;
	}
	.subradio p{
		width: 270px;
		margin-left: 30px;
		line-height: 30px;
	}
	.subjectBox{
		width: 100%;
		height:400px;
		min-height: 400px;
		overflow-y: scroll;
	}
	.subjectBox-title{
		width: 100%;
		/*height: 80px;*/
		margin-top: 10px;
		display: flex;
	}
	.subleft{
		height: 40px;
		display: flex;
		align-items: center;
	}
	.subright{
		/*height: 100px;*/
		margin-left: 20px;
		line-height: 25px;
	}
	.subright span{
		font-size: 16px;
		font-weight: bolder;
	}
	
	.subNum{
		font-weight: 600;
	}
	.subleft label{
		width: 35px;
		height: 35px;
		border-radius: 50%;
		color: #FFF;
		background: #00a6ea;
		font-size: 20px;
		font-weight: 600;
		text-align: center;
		line-height:28px;
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