import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//引入登录组件
import Login from '@/components/Login'
//引入主页面组件
import List from '@/components/List'
import About from '@/components/AboutMe'
import Read from '@/components/Read'

export default new Router({
  routes: [
    {
      path: '/about',
      component:About
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/list',
      component:List
    },
    {
      path:'/readinglists',
      component:Read
    },
    {path:'*',redirect:'/login'}
  ]
})
