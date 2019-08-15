export default {
  getModel: state => {
    return state.model
  },
  // getListHeaders: state => {
  //   console.log("WHY!!!")
  //   if(typeof state.data[0] !== 'undefined'){
  //     console.log(Object.keys(state.data[0]))
  //     return Object.keys(state.data[0])
  //   }
  //   return null

  // },

  // getListValues: state => {
  //   if(typeof state.data[0] !== 'undefined')
  //     return state.data
  //   return null
  // },

  colourGetter:state => {
    console.log("waht do you mean")
    console.log(state.account.colour)
    if (state.account.colour === null) return 'pink'
    else return state.account.colour
  },
  
  getModelTitle: state => (app, model) => {
    return state.structure[app][model].title
  },

  getStructurekeys: state => {
    var keys = {}
    Object.keys(state.structure).forEach((key) => {
      var child_keys = Object.keys(state.structure[key])
      keys[key.toUpperCase()] = []
      if (!state.structure[key].summary) child_keys = child_keys.filter(item => item !== 'summary')
      child_keys.forEach(child => {
        var text_value = child.charAt(0).toUpperCase() + child.slice(1)
        var path =  state.structure[key][child].url
        if(child=="summary")keys[key.toUpperCase()].push({icon : 'mdi-chart-bar', text: text_value, link: path})
        else keys[key.toUpperCase()].push({icon : 'mdi-folder-open', text: text_value, link: path})
      })
    })
    return keys
  },

  // getListHeaders: state => {
  //   var headers = []

  //   return [{
  //     text: 'Dessert (100g serving)',
  //     align: 'left',
  //     sortable: false,
  //     value: 'name',
  //   }]
  // },

  // getListData: state => {

  // },

  // getDetailHeaders: state => {
  //   if(typeof state.detail[0] !== 'undefined'){
  //     let headers = []
  //     state.detail.forEach(element => {
  //       headers.push(element[0])
  //     });
  //     return headers
  //   }
  //   return null   
  // },

  // cardValues: state => {
  //   if(typeof state.detail[0] !== 'undefined') return state.detail.slice(1)
    
  //   return null
  // },
  // cardParentValues: state => {
  //   if(typeof state.detail[0][1] !== 'undefined') return state.detail[0][1]    
  //   return null
  // },

  // getUsername: state => {
  //   return state.account.username
  // },

  isEditable: state => {
    return state.model.noteditable
  }
}
