
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

// Components and pages
import Home from '../pages/Home'
import Category from '../pages/Category'
import Order from '../pages/Order'
import Error404 from '../pages/404'

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { nextUrl: '/category-1', nextName: 'Start shopping' }
    },
   {
      path: '/category-1',
      name: 'category-1',
      component: Category,
      meta: { nextUrl: '/category-2', nextName: 'Continue' }
    },
    {
      path: '/category-2',
      name: 'category-2',
      component: Category,
      meta: { nextUrl: '/order', nextName: 'Finish order' }
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '*',
      name: 'error404',
      component: Error404
    }
  ]
})
