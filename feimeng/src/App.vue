<template>
  <div id="app">
    <div class="appbox">
      <div class="appcontent">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
        <m-footer  v-if="$route.meta.footShow"></m-footer>
      </div>
    </div>
  </div>
</template>

<script>
import MFooter from './components/footer/footer'
export default {
  components: {
    'm-footer': MFooter
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  html,body
    width: 100%
    height: 100%
    #app
      width: 100%
      height: 100%
      .appbox
        width: 100%
        height: 100%
        box-sizing: border-box
        position: relative
      .appcontent
        width: 100%
        height: 100%
</style>
<style>
	.el-message{
		min-width:90% !important;
	}
</style>
