export default {
  getModel: state => {
    return state.model
  },
  getListHeaders: state => {
    console.log("WHY!!!")
    if(typeof state.data[0] !== 'undefined'){
      console.log(Object.keys(state.data[0]))
      return Object.keys(state.data[0])
    }
      console.log("WHY")
    return null

  },
  getListValues: state => {
    if(state.data[0] !== 'undefined')
      return state.data
    return null
  }
}
