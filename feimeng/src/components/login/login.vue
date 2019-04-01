<template>
  <div class="loginbg">
    <div class="loginmain">
      <div class="content">
        <h1>登录</h1>
        <div class="userid" v-bind:style="bordercolori">
          <input type="text" name="" value="username" v-model="username"  placeholder="用户名" @focus="focusInt(1)" @blur="blurInt(1)">
        </div>
        <div class="userpwd" v-bind:style="bordercolorp">
          <input type="password" name="pass" v-model="pass" value="" placeholder="密码" @focus="focusInt(2)" @blur="blurInt(2)">
        </div>
        <a class="forgetPwd" href="javascript:;">忘记密码？</a>
        <div class="clear"></div>
        <div class="loginbtn" @click="getLogin">登录</div>
        <div class="tips"><span>没有账号？</span><a href="javascript:;" style="color：#5d74e3">马上注册</a></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import Global from 'common/js/global'
// import { MessageBox } from 'element-ui'
export default {
  data: function() {
  return {
        bordercolori: {
          borderBottom: '2px solid #e5ecf5'
        },
        bordercolorp: {
          borderBottom: '2px solid #e5ecf5'
        },
    username: '',
    pass: ''
    }
  },
  components: {
  },
  methods: {
    focusInt(obj) {
      if (obj === 1) {
        this.bordercolori = {borderBottom: '2px solid #489de5'}
      } else if (obj === 2) {
        this.bordercolorp = {borderBottom: '2px solid #489de5'}
      }
    },
    blurInt(obj) {
      if (obj === 1) {
        this.bordercolori = {borderBottom: '2px solid #e5ecf5'}
      } else if (obj === 2) {
        this.bordercolorp = {borderBottom: '2px solid #e5ecf5'}
      }
    },
    getLogin() {
      let that = this
      axios.get(Global.baseURL + '/Mobile/into/login.html', {params: {
      username: that.username,
      pass: that.pass
   }}).then((response) => {
//           console.log(response)
//           return false;
          if (response.data.status === 1) {
            that.setUsers('userInfo', response.data)
            that.$router.push({path: '/index'})
          } else {
            that.$alert(response.data.info, '提示')
          }
          // return response
        })
      },
   setUsers(item, obj) {
     localStorage.setItem(item, JSON.stringify(obj))
   }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.loginbg
    background: #fff url(./loginbg.png) no-repeat
    background-size: 100%
    position: fixed
    z-index: 999
    width: 100%
    height: 100%
    overflow-y: scroll
    .loginmain
      width: 100%
      margin-top: 180px
      .content
        width: 80%
        margin: 0 auto
        h1
          font-size: 20px
          font-weight: bold
          color: #3e4a59
        .userid
          width: 100%
          border-bottom: 2px solid #e5ecf5
          margin-top: 20px
          position: relative
          input
            width: 100%
            padding-left: 14px
            height: 46px
            outline: 0
            box-sizing: border-box
          .mr
            position: absolute
            left: 10px
            top: 13px
        .userpwd
          width: 100%
          border-bottom: 2px solid #e5ecf5
          margin-top: 20px
          position: relative
          input
            width: 100%
            height: 46px
            padding-left: 14px
            outline: 0
            box-sizing: border-box
        .forgetPwd
          font-size: 12px
          color: #6078ea
          margin-top: 42px
          float: right
        .loginbtn
          width: 100%
          height: 42px
          line-height: 42px
          text-align: center
          background: #007ce8
          color: #ffffff
          font-size: 18px
          margin-top: 28px
          border-radius: 20px
        .tips
          text-align: center
          font-size: 14px
          margin-top: 60px
    .clear
      clear: both
.el-message-box
  width: 80%!important
  position: absolute
  left: 10%
  top: 33%
</style>
