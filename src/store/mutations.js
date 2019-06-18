import {detailDataProcess} from "../helpers/util"

export default {
  SET_DATA (state, data) {
    state.data = data
  },

  SET_DETAIL(state,data) {
    state.detail = detailDataProcess(data,"")
  }
}