export default {
  SET_DATA (state, data) {
    console.log("WTF")
    console.log(state)
    state.data = data
    state.model ="CHANGED"
  }
}