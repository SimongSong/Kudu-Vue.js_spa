import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import './assets/sass/index.scss'
import VueSession from 'vue-session'
// import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.min.css'

// src/plugins/vuetify.js

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vuetify from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'
import vuetify from './plugins/vuetify';

Vue.use(Vuetify)
// Vue.use(VueMaterial)
Vue.use(VueSession)

Vue.config.productionTip = false

export default new Vuetify({
  icons: {
    iconfont: 'md',
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
