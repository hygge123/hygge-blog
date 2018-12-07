// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//将状态管理的文件引入进来
import store from '@/store'
//将图标库的JS文件引入进来
import '@/assets/image/icon/iconfont'
//将全局的样式引入进来
import '@/assets/style'
// 如果以后做项目,vue里面的插件都是main.js入口文件中引入的
// 在这里我们引入了一个表单验证的插件,用来对用户输入的用户名和密码进行验证
import VeeValidata from 'vee-validate'
// 引入一个消息提示插件,用来对用户输入的用户名的正式合法性进行验证
import Notifications from 'vue-notification'
Vue.use(VeeValidata)
Vue.use(Notifications)
// 加入我们的权限判断
import '@/permission'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
