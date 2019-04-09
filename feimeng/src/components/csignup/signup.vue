<template>
	<div class="containerBox">
		<div class="title"><img class="back" @click="$router.go(-1)" src="./back.png" alt="">飞梦网</div>
		<div class="signupTitle">
			我要报名
		</div>
		<div class="mustFill">
			(<b style="color: red;margin: 0 3px;">*</b>为必填项)
			<span class="receive" v-on:click="getInformation()">一键获取</span>
		</div>
		<div class="tiao"></div>
		<div class="competitionGroup">
			<p><b style="color: red;margin: 0 2px;">*</b>参赛组别</p>
			<el-radio-group v-model="form.grade"> 
				<p><el-radio :label="false">低年级（1997年01月01日之前出生）</el-radio> </p>
				<p><el-radio :label="true">高年级（1997年01月01日之后出生）</el-radio> </p>
			 </el-radio-group>
		</div>
		<div class="tiao"></div>
		<div class="realName">
			<p><b style="color: red;">*</b>真实姓名 <el-input v-model="form.name" placeholder="请输入姓名" style="width: 200px;margin-left: 5px;"></el-input> </p>
		</div>
		<div class="xian"><div class="neixian"></div></div>
		<div class="birthday">
			<p><b style="color: red;">*</b>出生日期<el-date-picker type="date" placeholder="请选择出生日期" v-model="form.birthday" style="width: 200px;margin-left: 10px;"></el-date-picker> </p>
		</div>
		<div class="xian"><div class="neixian"></div></div>
		<div class="sex">
			<p>
				<b style="color: red;">*</b>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别
				<el-radio-group v-model="form.sex" style="width: 200px;margin-left: 20px;"> 
					<el-radio :label="false">男</el-radio> <el-radio :label="true">女</el-radio> 
				</el-radio-group>
			</p>
		</div>
		<div class="xian"><div class="neixian"></div></div>
		<div class="region">
			<p><b style="color: red;">*</b>所在地区
				<el-select v-model="provinces" placeholder="请选择" @change="changeProvinces" style="width: 140px;margin-left: 10px;">
			    <el-option
			      v-for="(item,index) in options"
			      :label="item.name"
			      :value="item.id" 
			      :key='index'>
			    </el-option>
			  </el-select>
				<el-select v-model="city" placeholder="请选择" style="width: 140px;">
			    <el-option
			      v-for="(item,index) in optionsChild"
			      :label="item.name"
			      :value="item.id"
			      :key='index'>
			    </el-option>
			  </el-select>
			  <el-input v-model="form.address" placeholder="请输入" style="width: 250px;margin-left: 5px;"></el-input>
			</p>
		</div>
		<div class="xian"><div class="neixian"></div></div>
		<div class="tel">
			<p><b style="color: red;">*</b>联系方式 <el-input v-model="form.tel" placeholder="获奖后，方便我们与你联系" style="width: 200px;margin-left: 5px;"></el-input> </p>
		</div>
		<div class="xian"><div class="neixian"></div></div>
		<div class="idNumber">
			<p><b style="color: red;">*</b>身份证号 <el-input v-model="form.idNumber" placeholder="获奖后，验证您身份的唯一凭证" style="width: 230px;margin-left: 5px;"></el-input> </p>
		</div>
		<div class="schoolName">
			<p><b style="color: red;">*</b>学校名称/工作单位 <el-input v-model="form.schoolName" placeholder="请填写学校名称/工作单位" style="width: 230px;margin-left: 5px;"></el-input> </p>
		</div>
		<div class="xian"><div class="neixian"></div></div>
		<div class="realemail">
			<p><b style="color: red;">*</b>邮箱<el-input v-model="form.email" placeholder="请输入邮箱" style="width: 230px;margin-left: 5px;"></el-input> </p>
		</div>
		<div class="xian"><div class="neixian"></div></div>
		<div class="footbtn">
			<a class="modify" @click="checkSign()">修改</a>
			<a class="goback" @click="$router.go(-1)">返回</a>
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
				form: {
				  name:'',
		          birthday:'',
		          grade: '',
		          sex:'',
		          tel:'',
		          idNumber:'',
		          schoolName:'',
		          email:'',
		          address:''
		        },
				baseurl: Global.baseURL,
				competitionStatus: '',
				 options: [],
                 optionsChild:[],
      			 provinces:'',
      			 city:''
				
			}
		},
		watch: {
			'$route' (to, from) {
				// 对路由变化作出响应...
//				 console.log(this.$route.query.id,'-------------id')
				if(this.$route.query.id) {
					//路由变化获取接口id
					this.getsignUp(this.$route.query.id)
				}
			}
		},
		//页面创建之后执行
		created() {
			this.getdata()
			this.getsignUp(this.$route.query.id)
		},
		methods: {
			getsignUp(){
				let that = this
				let loading = Loading.service({
					lock: true,
					text: '拼命加载中',
					background: 'rgba(0, 0, 0, 0.8)'
				})
//				console.log(that.myData)
				axios.get(Global.baseURL + '/Mobile/Competition/sign_up.html', {
					params: {
						cid: this.$route.query.id,
						uid: that.myData.uid
					}
				}).then((response) => {
					loading.close()
					that.signUp = response.data.data;
					that.address = response.data;
					console.log(that.address)
					let addressArray = new Array();
					//遍历地区数组  = that.address.provinces
					that.address.provinces.forEach(item => {
						if(item.level == 1){
							addressArray.push(item);
						}
					})
					//将获取的省级目录放置 options 里
					this.options = addressArray;
//					console.log(that.signUp)
					that.form.name = that.signUp.name;
					that.form.birthday = that.signUp.birthday;
					that.form.tel = that.signUp.phone;
					that.form.idNumber = that.signUp.identity;
					that.form.schoolName = that.signUp.company;
					that.form.email = that.signUp.email;
					that.form.sex = that.signUp.sex === '1' ? false : true;
					that.form.grade = that.signUp.group === '1' ? false : true;
					that.provinces = that.signUp.province;
					that.city = that.signUp.city;
					that.form.address = that.signUp.address;
					//进页面就调用方法 然后在下面赋值city
					this.changeProvinces(that.signUp.province,that.signUp.city)
//					this.changeProvinces(that.information.provinces,that.information.city)
					
					
				})
				.catch(function (error) {
		          console.log(error)
		        })
			},
			//一键获取信息
			getInformation(){
				let that = this
				let loading = Loading.service({
					lock: true,
					text: '拼命加载中',
					background: 'rgba(0, 0, 0, 0.8)'
				})
				axios.get(Global.baseURL + '/Mobile/Competition/obtainData.html', {
					params: {
						cid: this.$route.query.id,
						uid: that.myData.uid
					}
				}).then((response) => {
					loading.close()
					that.information = response.data.data;
					console.log(that.information)
					that.form.name = that.information.name;
					that.form.birthday = that.information.birthday;
					that.form.tel = that.information.phone;
					that.form.idNumber = that.information.identity;
					that.form.schoolName = that.information.school_name;
					that.form.email = that.information.email;
					that.form.sex = that.information.sex === '1' ? false : true;
					that.form.grade = that.information.group === '1' ? false : true;
					that.provinces = that.information.provinces;
					that.form.address = that.information.address;
					that.city = that.information.city;
					this.changeProvinces(that.information.provinces,that.information.city)
				})
				.catch(function (error) {
		          console.log(error)
		        })
			},
			//提交接口
			checkSign(){
				//验证字段不为空
				let name = this.form.name;
				if(name=='' || name.length==0){
			     	this.$message.error('用户名不能为空');
			        return false;
			    }
				//验证生日不为空
				let birthday = this.form.birthday;
				console.log(birthday)
				if(birthday==null){
			     	this.$message.error('出生日期不能为空');
			        return false;
			    }
				//验证手机号
				let phone = this.form.tel
				if(!(/^1[34578]\d{9}$/.test(phone))){
			       this.$message.error('手机号码格式不正确');
			        return false;
			   }
				let card = this.form.idNumber
				//验证身份证号
				let result = checkIDnumber(card);
				if(result !== true){
					this.$message.error(result);
					return false;
				}
				//验证学校单位
				let school = this.form.schoolName;
				if(school=='' || school.length==0){
			     	this.$message.error('学校名称/工作单位不能为空');
			        return false;
			    }
				//验证邮箱
				let mailbox = this.form.email;
				 if(!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(mailbox))){
			        this.$message.error("邮箱格式不正确，请确认");
			        return false;
			    }
//				console.log(this.provinces) // 获取的省份id = parent_id
//				console.log(this.city) // 获取的市级id
				let that = this
				let loading = Loading.service({
					lock: true,
					text: '拼命加载中',
					background: 'rgba(0, 0, 0, 0.8)'
				})
				axios.get(Global.baseURL + '/Mobile/Competition/addSign.html', {
					params: {
						cid: this.$route.query.id,
						uid: that.myData.uid,
						group:that.form.grade,
						name:that.form.name,
						birthday:that.form.birthday,
						sex:that.form.sex,
						province:this.provinces,
						city:this.city,
						address:that.form.address,
						phone:that.form.tel,
						identity:that.form.idNumber,
						company:that.form.schoolName,
						email:that.form.email,
						id:that.signUp.id
					}
				}).then((response) => {
					loading.close()
					that.information = response.data.data;
					console.log(that.information)
				})
				.catch(function (error) {
		          console.log(error)
		        })
			},
			 changeProvinces(id,city){
			 		// 获取的id 为省级 id
			 	    let childAddressArray = new Array() ;
			 	    let that = this	
			 	    // 先将市级select重置为空
			 	    that.city = '';
					//遍历地区数组  = that.address.provinces			 	    		 	    
        			that.address.provinces.forEach(item => {
        				// parent_id 为第一个select 框的 id （省级id）
						if(item.level == 2 && item.parent_id == id){
							childAddressArray.push(item);
						}
					})
        			this.optionsChild = childAddressArray;
        			that.city = city;
//      			console.log(that.city)
           },
			getdata() {
				let that = this
				let userinfo = JSON.parse(localStorage.getItem('userInfo'))
				that.myData = userinfo.data

			}
		},
	}
	function checkIDnumber(code) {
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    var tip = true;
    var pass= true;

    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(!reg.test(code)){
        tip = "身份证号格式错误";
        pass = false;
    }

    else if(!city[code.substr(0,2)]){
        tip = "开始两位的地址编码错误";
        pass = false;
    }
    else{
        //18位身份证需要验证最后一位校验位
        if(code.length == 18){
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != code[17]){
                tip = "身份证有误";
                pass =false;
            }
        }
    }
    return tip;
}
</script>

<style>
	.el-input__inner{
		border:none;
		outline: none;
	}
	.receive{
		padding: 8px 15px;
	    background: #e7f4ff;
	    border-radius: 15px;
	    line-height: 10px;
	    float: right;
	    color: #0088e9;
	    font-size: 12px;
	}
	.containerBox{
		width: 100%;
		height: 100%;
		background: #fff url(./signupbg.png) no-repeat;
		background-size: 100%;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}
	.footbtn{
		width: 100%;
		display: flex;
		justify-content: space-around;
		margin-bottom: 70px;
	}
	.modify{
		padding: 10px 40px;
		color: #FFF;
		font-size: 16px;
		background: #01a3ea;
		border-radius: 20px;
		letter-spacing: 5px;
		margin-top: 20px;
		text-align: center;
	}
	.goback{
		padding: 10px 40px;
		color: #FFF;
		font-size: 16px;
		background: #faa22c;
		border-radius: 20px;
		letter-spacing:5px;
		margin-top: 20px;
	}
	.birthday{
		width: 95%;
		margin-left: 15px;
		color: #000;
		font-size: 16px;
		letter-spacing: 1px;
	}
	.realemail{
		width: 95%;
		margin-left: 15px;
		color: #000;
		font-size: 16px;
		letter-spacing: 1px;
	}
	.realemail p{
		line-height: 50px;
	}
	.schoolName{
		width: 95%;
		margin-left: 15px;
		color: #000;
		font-size: 16px;
		letter-spacing: 1px;
	}
	.schoolName p{
		line-height: 50px;
	}
	.birthday p{
		line-height: 50px;
	}
	.idNumber{
		width: 95%;
		margin-left: 15px;
		color: #000;
		font-size: 16px;
		letter-spacing: 1px;
	}
	.idNumber p{
		line-height: 50px;
	}
	.tel{
		width: 95%;
		margin-left: 15px;
		color: #000;
		font-size: 16px;
		letter-spacing: 1px;
	}
	.tel p{
		line-height: 50px;
	}
	.region{
		width: 95%;
		margin-left: 15px;
		color: #000;
		font-size: 16px;
		letter-spacing: 1px;
	}
	.region p{
		line-height: 50px;
	}
	.sex{
		width: 95%;
		margin-left: 15px;
		color: #000;
		font-size: 16px;
		letter-spacing: 1px;
	}
	.sex p{
		line-height: 50px;
	}
	.realName{
		width: 95%;
		margin-left: 15px;
		color: #000;
		font-size: 16px;
		letter-spacing: 1px;
	}
	.realName p{
		line-height: 50px;
	}
	.xian{
		width:100%;
		display: flex;
		justify-content: space-around;
	}
	.neixian{
		width: 97%;
		border-bottom:1px solid #d5d5d5;
	}
	.competitionGroup{
		width: 95%;
		margin-left: 15px;
		color: #000;
		font-size: 16px;
		letter-spacing: 1px;
		
	}
	.competitionGroup p{
		line-height: 40px;
	}
	.competitionGroup p input{
		margin-right: 10px;
	}
	.tiao{
		width: 100%;
		height: 8px;
		background: #f8f6f9;
		margin: 10px 0;
	}
	.mustFill{
		width: 92%;
		margin-left: 20px;
		margin-top: 10px;
		color: #000;
		font-size: 16px;
		letter-spacing: 2px;
	}
	.back {
		width: 10px;
		position: absolute;
		left: 0px;
		top: 10px;
		padding: 10px 14px;
	}
	
	.signupTitle {
		width: 82%;
		margin-left: 25px;
		color: #000;
		font-size: 20px;
		font-weight: bold;
		margin-top: 50px;
		letter-spacing: 3px;
		margin-bottom: 20px;
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
</style>