import Vue from 'vue'
import App from './App'
import mpvueToastRegistry from 'mptoast/registry'
import './assets/css/weui.css'
import httpsRequest from '@/utils/request'
import store from '@/vuex'


Vue.prototype.$net=httpsRequest
Vue.prototype.$store=store


mpvueToastRegistry(Vue)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main','pages/classify/main','pages/mine/main'],
    window: {
      navigationBarBackgroundColor: '#40586d',
      navigationBarTextStyle: 'white',
      navigationBarTitleText: '豆瓣',
      backgroundColor: '#f8f9fb',
      backgroundTextStyle: 'dark'
    },
    tabBar:{
      color:"#8a8a8a",
      selectedColor:"#f73859",
      borderStyle:'white',
      backgroundColor:'#f8f9fb',
      list:[
        {
          text:"首页",
          pagePath: 'pages/index/main',
          iconPath: 'static/images/index1.png',
          selectedIconPath: 'static/images/index2.png'
        },
        {
          text:"分类",
          pagePath: 'pages/classify/main',
          iconPath: 'static/images/all1.png',
          selectedIconPath: 'static/images/all2.png'
        },
        {
          text:"我的",
          pagePath: 'pages/mine/main',
          iconPath: 'static/images/user1.png',
          selectedIconPath: 'static/images/user2.png'
        }
      ]
    }
  }
}
