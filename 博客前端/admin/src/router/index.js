import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 引入登录组件
import Login from '@/components/Login'
// 引入主页面组件
import List from '@/components/List'
// 引入阅读列表页面
import RedingList from '@/components/ReadingList'
// 引入标签页面
import Tag from '@/components/Tag'
// 引入关于我
import About from '@/components/About'

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/list',
      component: List
    },
    {
      path: '/readinglists',
      component: RedingList
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/tags',
      component: Tag
    },
    {path: '*', redirect: '/login'}
  ]
})
