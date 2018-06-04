// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import MintUI from 'mint-ui'
import ElementUI from 'element-ui';

import './permission.js'
import VueWechatTitle from 'vue-wechat-title'
import 'lib-flexible'
import '../flexible.js'

import 'mint-ui/lib/style.css'
import './common/iconfont/iconfont.css'
import '../flexible.css'
import '../src/common/my-mint.scss'
import store from './store/index.js'
import 'element-ui/lib/theme-chalk/index.css';




Vue.config.productionTip = false
global.storage = window.localStorage
Vue.use(MintUI);
Vue.use(ElementUI);
Vue.use(VueWechatTitle)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
