import Vue from 'vue'
import Router from 'vue-router'
import Course from '@/components/course/course'
import Index from '@/components/index/index'
import Discovery from '@/components/discovery/discovery'
import Login from '@/components/login/login'
import My from '@/components/my/my'
import Competition from '@/components/competition/competition'
import CompetitionDetail from '@/components/competition/competitionDetail'
import SignUp from '@/components/csignup/signup'
import Answer from '@/components/answer/answer'
import Asubject from '@/components/asubject/asubject'
import SeeResult from '@/components/aseeresult/seeResult'
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
      meta: {auth: true, keepAlive: true,footShow:true}
    },
    {
      path: '/course',
      component: Course,
      meta: {auth: true, keepAlive: true,footShow:true}
      
    },
    {
      path: '/competition',
      component: Competition,
      meta: {auth: true, keepAlive: true,footShow:true}
      
    },
    {
		    path:'/signup',
		    component:SignUp
		},
    {
		    path:'/answer',
		    component:Answer
		},
    {
		    path:'/asubject',
		    component:Asubject
		},
    {
		    path:'/competitionDetail',
		    component:CompetitionDetail
		},
    {
		    path:'/seeResult',
		    component:SeeResult
		},
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {auth: true, keepAlive: true,footShow:true}
      
    },
    {
      path: '/my',
      component: My,
      meta: {auth: true, keepAlive: true,footShow:true}
      
    },
    {
      path: '/discovery',
      component: Discovery,
      meta: {auth: true, keepAlive: true,footShow:true}
      
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
