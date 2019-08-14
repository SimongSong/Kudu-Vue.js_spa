import Vue from 'vue'
import store from './store/'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {auth: true},
    },
    {
      path: '/detail/:app/:type/:pk',
      name: 'detail',
      meta: {auth: true},
      component: () => import('./views/DetailView.vue')
    },
    {
      path: '/list/:app/:type/',
      name: 'list',
      meta: {auth: true},
      component: () => import('./views/ListView.vue')
    },
    {
      path: '/search/:query',
      name: 'search',
      meta: {auth: true},
      component: () => import('./views/SearchResult.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some((route) => route.meta.auth)
  const authorized = !!localStorage.getItem('user-token') || ''
  if(authRequired && !authorized) next('/login')
  else next()
})

export default router