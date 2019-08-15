import {detailDataProcess, detailEditForm} from "../helpers/util"
import router from '../router'

export default {
  SET_DETAIL(state,payload) {
    state.model = payload.model
    console.log("DETAIL")
    console.log(state.model.form_fields)
    console.log(payload.data)
    detailEditForm(payload.data, state.model.form_fields)
    console.log("DETAIL")
    console.log(state.model.form_fields)
  },

  AUTHENTICATE(state, payload) {
    state.account.authenticated = true
    state.account.username = payload.username
  },

  LOADING(state) {
    state.loading = !state.loading
  },

  KILLLOADING(state) {
    console.log(state.loading)
    console.log("LOADING KILLED")
    state.loading = false
    console.log(state.loading)
  },

  LOGOUT(state) {
    console.log(this._vm.$session)
    state.account.authenticated = false
    localStorage.removeItem('user-token')
    state.account.username = null
    router.push('/login')
  },

  UPDATE_AUTH_STATUS(state, payload) {
    state.account.authenticated = payload
  },

  UPDATE_COLOUR(state, colour) {
    state.account.colour = colour
  }
  
}