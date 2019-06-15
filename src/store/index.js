import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store(
  {
    state,
    mutations,
    actions,
    getters,
  }
)
