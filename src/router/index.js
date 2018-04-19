import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index.vue'
import myslef from '@/views/mine.vue'
import details from '../components/details.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/myself',
      name: 'myslef',
      component:myslef
    },
    {
      path: '/details',
      name: 'details',
      component: details
    }
  ]
})
