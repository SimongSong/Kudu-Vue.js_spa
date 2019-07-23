import {detailDataProcess, detailEditForm} from "../helpers/util"

export default {
  SET_DATA (state, payload) {
    console.log("HELLFIN")
    console.log(payload.model)
    state.model = payload.model
  },

  SET_DETAIL(state,payload) {
    state.detail = detailDataProcess(payload.data,"")
    state.model = payload.model
    state.model.form_fields = detailEditForm(payload.data, state.model.form_fields)
    console.log("DETAIL")
    console.log(state.model.form_fields)
  },

  AUTHENTICATE(state, payload) {
    state.account.expired = false
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
    state.account.expired = true
    state.account.username = null
    this._vm.$session.remove('token')
  }
  
}