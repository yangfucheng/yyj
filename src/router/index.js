import Vue from 'vue'
import Router from 'vue-router'
import vote from '@/views/vote.vue'
import myslef from '@/views/mine.vue'
import index from '@/views/index.vue'
import join from '@/views/minepage/join.vue'
import tixian from '@/views/minepage/tixian.vue'
import connect from '@/views/minepage/connect.vue'
import business from '@/views/minepage/business.vue'
import set from '@/views/minepage/set.vue'
import money from '@/views/minepage/money.vue'
import recodeDetail from '@/views/minepage/recodeDetail.vue'
import details from '../components/details.vue'
import login from '../views/login/login.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta:{title:"首页"}
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta:{title:"登陆"}
    },
    //
    {
      path: '/myself',
      name: 'myslef',
      component:myslef,
      meta:{title:"我的"}
    },
    {
      path: '/vote',
      name: 'vote',
      component:vote,
      meta:{title:"投票"}
    },
    {
      path: '/index/details',
      name: 'details',
      component: details,
      meta:{title:"详情"}
    },
    {
      path: '/myself/join',
      name: 'join',
      component: join,
      meta:{title:"我参加的"}
    },
    {
      path: '/myself/tixian',
      name: 'tixian',
      component: tixian,
      meta:{title:"提现"}
    },
    {
      path: '/myself/connect',
      name: 'connect',
      component: connect,
      meta:{title:"联系客服"}
    },
    {
      path: '/myself/business',
      name: 'business',
      component: business,
      meta:{title:"流水"}
    },
    {
      path: '/myself/set',
      name: 'set',
      component: set,
      meta:{title:"设置"}
    },
    {
      path: '/myself/money',
      name: 'money',
      component: money,
      meta:{title:"我的钱包"}
    },
    {
      path: '/myself/recodeDetail',
      name: 'recodeDetail',
      component: recodeDetail,
      meta:{title:"我的钱包"}
    }
  ]
})
