import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Form from './views/Form.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detail/',
      name: 'detail',
      component: () => import('./views/Detail.vue')
    },
    // {
    //   path: '/detail/:type/:pk',
    //   name: 'detail',
    //   component: () => import('./views/Detail.vue')
    // },
    {
      path: '/list/:type/',
      name: 'list',
      component: () => import('./views/List.vue')
    },
    {
      path: '/form/:type/:pk',
      name: 'form',
      component: Form
    }
  ]
})
