import {detailDataProcess, detailEditForm} from "../helpers/util"

export default {
  SET_DATA (state, payload) {
    console.log("HELLFIN")
    console.log(payload.model)

    state.data = payload.data
    state.model = payload.model
  },

  SET_DETAIL(state,payload) {
    state.detail = detailDataProcess(payload.data,"")
    state.model = payload.model
    state.model.form_fields = detailEditForm(payload.data, state.model.form_fields)
  }
}