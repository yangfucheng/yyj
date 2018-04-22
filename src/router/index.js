import Vue from 'vue'
import Router from 'vue-router'
import vote from '@/views/vote.vue'
import myslef from '@/views/mine.vue'
import index from '@/views/index.vue'
import join from '@/views/minepage/join.vue'
import tixian from '@/views/minepage/tixian.vue'
import connect from '@/views/minepage/connect.vue'
import business from '@/views/minepage/business.vue'
import details from '../components/details.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    //
    {
      path: '/myself',
      name: 'myslef',
      component:myslef
    },
    {
      path: '/vote',
      name: 'vote',
      component:vote
    },
    {
      path: '/index/details',
      name: 'details',
      component: details
    },
    {
      path: '/myself/join',
      name: 'join',
      component: join
    },
    {
      path: '/myself/tixian',
      name: 'tixian',
      component: tixian
    },
    {
      path: '/myself/connect',
      name: 'connect',
      component: connect
    },
    {
      path: '/myself/business',
      name: 'business',
      component: business
    }
  ]
})
