import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import './assets/sass/index.scss'
import VueSession from 'vue-session'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'


Vue.use(VueMaterial)
Vue.use(VueSession)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
