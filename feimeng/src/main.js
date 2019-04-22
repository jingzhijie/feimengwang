import Vue from 'vue'
import App from './App'
import router from './router'
import '@/common/stylus/reset.styl'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/dist/css/swiper.css'
//import fastclick from 'fastclick'
Vue.config.productionTip = false
//fastclick.attach(document.body)
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
