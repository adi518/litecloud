import Vue from 'vue'
import Router from 'vue-router'
import Item from '@/components/Item'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Item',
      component: Item
    }
  ]
})
