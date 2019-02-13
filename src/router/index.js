import Vue from 'vue'
import Router from 'vue-router'
import Ebook from '@/Ebook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Ebook
    },
    {
      path: '/ebook',
      component: Ebook
    }
  ]
})
