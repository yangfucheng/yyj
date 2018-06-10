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
import recharge from '@/views/minepage/recharge.vue'
import moneyDeatil from '@/views/minepage/moneyDeatil.vue'
import details from '../components/details.vue'
import ranking from '../components/ranking.vue'
import error from '../404.vue'
import login from '../views/login/login.vue'
import banner1 from '../views/indexpage/banner.vue'
import commentDetailList from '../views/comment/detail.vue'
import withDrawList from '../views/minepage/tixianList.vue'
import invite from '@/views/minepage/invite.vue'
import inviteCode from '@/views/minepage/inviteCode.vue'
import inputCode from '@/views/minepage/inputCode.vue'
import guafen from '@/views/minepage/guafen.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta:{title:"预测市场"}
    },
    {
      path: '/exception',
      name: 'error',
      component: error,
      meta:{title:"错误页面"}
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: ranking,
      meta:{title:"排行榜"}
    },
    {
      path: '/comment/detail/:id',
      name: 'detail',
      component: commentDetailList,
      meta:{title:"评论详情"}
    },
    {
      path: '/index/banner1',
      name: 'banner1',
      component: banner1,
      meta:{title:"玩法介绍"}
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
      path: '/index/details/:id',
      name: 'details',
      component: details,
      meta:{title:"详情",keepAlive: true}
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
    },
    {
      path: '/myself/recharge',
      name: 'recharge',
      component: recharge,
      meta:{title:"充值"}
    },
    {
      path: '/myself/moneyDetail:tradeCoin',
      name: 'moneyDeatil',
      component: moneyDeatil,
      meta:{title:"充值详情"}
    },
    {
      path: '/myself/tixianList',
      name: 'tixianList',
      component: withDrawList,
      meta:{title:"提现记录"}
    },
      path: '/myself/invite',
      name: 'invite',
      component: invite,
      meta:{title:"邀请好友"}
    },
    {
      path: '/myself/inviteCode',
      name: 'inviteCode',
      component: inviteCode,
      meta:{title:"邀请卡"}
    },
    {
      path: '/myself/inputCode',
      name: 'inputCode',
      component: inputCode,
      meta:{title:"邀请卡"}
    },
    {
      path: '/myself/guafen',
      name: 'guafen',
      component: guafen,
      meta:{title:"瓜分"}
    }
  ]
})
