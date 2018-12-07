import Vue from 'vue'
import Router from 'vue-router'

// 引入主页组件
import Home from '@/components/Home'
import Archives from '@/components/Archives'
import Tags from '@/components/Tags'
import Lists from '@/components/Lists'
import About from '@/components/About'
import Article from '@/components/Article'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/articles'
    },
    {
      path: '/articles',
      component: Home
    },
    {
      path: '/archives',
      component: Archives
    },
    {
      path: '/articles/:id',
      component: Article
    },
    {
      path: '/tags',
      component: Tags
    },
    {
      path: '/lists',
      component: Lists
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '*',
      redirect: {
        path: 'articles',
        query: {
          page: 0
        }
      }
    }
  ]
 })
