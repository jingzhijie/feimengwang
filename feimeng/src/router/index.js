import Vue from 'vue'
import Router from 'vue-router'
import Course from '@/components/course/course'
import Index from '@/components/index/index'
import Discovery from '@/components/discovery/discovery'
import Login from '@/components/login/login'
import My from '@/components/my/my'
import Competition from '@/components/competition/competition'
import CompetitionDetail from '@/components/competition/competitionDetail'
import Aa from '@/components/competition/a'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index,
      meta: {auth: true, keepAlive: true}
    },
    {
      path: '/course',
      component: Course
    },
    {
      path: '/competition',
      component: Competition
    },
    {
		    path:'/competitionDetail',
		    component:CompetitionDetail
		},
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/my',
      component: My
    },
    {
      path: '/discovery',
      component: Discovery
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 对路由进行验证
  let userinfo = JSON.parse(localStorage.getItem('userInfo'))
  if (!userinfo) { // 已经登陆
      if (to.path === '/login') {
        next()
      } else {
        next({path: '/login'})
      }
    } else {
    next() // 正常跳转到你设置好的页面
  }
})
export default router
