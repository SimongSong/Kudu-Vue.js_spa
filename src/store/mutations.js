import {detailDataProcess} from "../helpers/util"

export default {
  SET_DATA (state, payload) {
    state.data = payload.data
    state.model = payload.model
    console.log("MODEL SET")
    console.log(state.model)
  },

  SET_DETAIL(state,payload) {
    state.detail = detailDataProcess(payload.data,"")
    state.model = payload.model
  }
}