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
    return null

  },

  getListValues: state => {
    if(typeof state.data[0] !== 'undefined')
      return state.data
    return null
  },

  getDetailHeaders: state => {
    if(typeof state.detail[0] !== 'undefined'){
      let headers = []
      state.detail.forEach(element => {
        headers.push(element[0])
      });
      return headers
    }
    return null   
  },

  cardValues: state => {
    if(typeof state.detail[0] !== 'undefined') {
      console.log("CARDS")  
      console.log(state.detail.slice(1))  
      return state.detail.slice(1)
    }
    return null
  },
  cardParentValues: state => {
    if(typeof state.detail[0][1] !== 'undefined'){
      return state.detail[0][1]
    }
    return null
  },

  formFields: state => {
    console.log("HELO")
    console.log(state.structure.Core.Sample.form_fields)
    return state.structure.Core.Sample.form_fields
    // console.log("HINP")
    // console.log(state.model)
    // console.log(state.structure.Core)
    // return state.structure.Core[state.model].formFields 
  }
}
