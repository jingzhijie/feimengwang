<template>
	<div class="containerBox">
		<div class="title"><img class="back" @click="$router.go(-1)" src="./back.png" alt="">飞梦网</div>
		<div class="signupTitle">
			我要报名
			<button style="float: right;">一键获取资料</button>
		</div>
		<div class="mustFill">(<b style="color: red;margin: 0 3px;">*</b>为必填项)</div>
		<div class="tiao"></div>
		<div class="competitionGroup">
			<p><b style="color: red;margin: 0 2px;">*</b>参赛组别</p>
			<p><input type="radio" name="group" value="1"/><label >低年级（1997年01月01日之前出生）</label> </p>
			<p><input type="radio" name="group" value="2"/><label>高年级（1997年01月01日之后出生）</label> </p>
		</div>
		<div class="tiao"></div>
		<div class="realName">
			<p><b style="color: red;">*</b>真实姓名 <el-input v-model="form.name" style="width: 200px;margin-left: 5px;"></el-input> </p>
		</div>
		<div class="birthday">
			<p><b style="color: red;">*</b>出生日期<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 200px;margin-left: 10px;"></el-date-picker> </p>
		</div>
		<div class="sex">
			<p><b style="color: red;">*</b>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别<el-radio-group v-model="form.resource"> <el-radio label="男"></el-radio> <el-radio label="女"></el-radio> </el-radio-group></p>
		</div>
		<div class="region">
			<p><b style="color: red;">*</b>所在地区<el-cascader :options="options" change-on-select></el-cascader></p>
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
		          date1: '',
		          resource: ''
		        },
				baseurl: Global.baseURL,
				competitionDetail: {
					content: ''
				},
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
		//		watch: {
		//			'$route' (to, from) {
		//				// 对路由变化作出响应...
		//				//    console.log(this.$route.query.id,'-------------id')
		//				if(this.$route.query.id) {
		//					//路由变化获取接口id
		//					this.getCompetitionDetail(this.$route.query.id)
		//				}
		//			}
		//		},
		//页面创建之后执行
		created() {
			this.getdata()
			//			this.getCompetitionDetail(this.$route.query.id)

		},
		methods: {

			getdata() {
				let that = this
				let userinfo = JSON.parse(localStorage.getItem('userInfo'))
				that.myData = userinfo.data

			}
		},
	}
</script>

<style>
	.containerBox{
		width: 100%;
		height: 100%;
		background: #fff url(./signupbg.png) no-repeat;
		background-size: 100%;
		position: absolute;
		display: block;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}
	.birthday{
		width: 95%;
		margin-left: 20px;
		color: #000;
		font-size: 16px;
		letter-spacing: 1px;
	}
	.birthday p{
		line-height: 50px;
	}
	.sex{
		width: 95%;
		margin-left: 20px;
		color: #000;
		font-size: 16px;
		letter-spacing: 1px;
	}
	.sex p{
		line-height: 50px;
	}
	.realName{
		width: 95%;
		margin-left: 20px;
		color: #000;
		font-size: 16px;
		letter-spacing: 1px;
	}
	.realName p{
		line-height: 50px;
	}
	.competitionGroup{
		width: 95%;
		margin-left: 20px;
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
		width: 82%;
		margin-left: 20px;
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