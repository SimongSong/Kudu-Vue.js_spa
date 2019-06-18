import axios from 'axios'


export default {
  loadData({ commit }, payload) {
    console.log(payload.url)
    console.log(payload.type)
    axios
      .get(payload.url,{},{
      auth: {
        username: 'ssong',
        password: 'Iamsuperstar1#'}
    })
      .then(r => r.data)
      .then(data => {
        console.log("TRIGGER")
        if(payload.type === "list")
          commit('SET_DATA', data)
        else if(payload.type === "detail")
          commit('SET_DETAIL', data)
      })
  }
}
  