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
			<p><b style="color: red;">*</b>所在地区<el-cascader placeholder="请选择所在地区" :options="options" change-on-select style="width: 280px;margin-left: 5px;"></el-cascader></p>
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
			<a class="goback"  @click="$router.go(-1)">返回</a>
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
		          birthday: '',
		          grade: '',
		          sex:'',
		          tel:'',
		          idNumber:'',
		          schoolName:'',
		          email:'',
		        },
				baseurl: Global.baseURL,
				competitionStatus: '',
				options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
				
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
//					console.log(that.signUp)
					that.form.name = that.signUp.name;
					that.form.birthday = that.signUp.birthday;
					that.form.tel = that.signUp.phone;
					that.form.idNumber = that.signUp.identity;
					that.form.schoolName = that.signUp.company;
					that.form.email = that.signUp.email;
					that.form.sex = that.signUp.sex === '1' ? false : true
					that.form.grade = that.signUp.group === '1' ? false : true
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
						cid: that.myData.id,
						uid: that.myData.uid
					}
				}).then((response) => {
					loading.close()
					that.information = response.data.data;
//					console.log(that.information)
					that.form.name = that.information.username;
					that.form.birthday = that.information.birthday;
					that.form.tel = that.information.phone;
					that.form.idNumber = that.information.identity;
					that.form.schoolName = that.information.school_name;
					that.form.email = that.information.email;
					that.form.sex = that.information.sex === '1' ? false : true
					that.form.grade = that.information.group === '1' ? false : true
				})
			},
			checkSign(){
				let name = this.form.name;
				//验证字段不为空
				if(name=='' || name.length==0){
			     	this.$message.error('用户名不能为空');
			        return false;
			    }
				//验证手机号
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
	.el-input__inner{
		border:none;
		outline: none;
	}
	.el-input__suffix{
		display: none;
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