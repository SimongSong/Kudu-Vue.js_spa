import axios from 'axios'


export default {
  loadData({ commit }, url) {
    axios
      .get(url,{},{
      auth: {
        username: 'ssong',
        password: 'Iamsuperstar1#'}
    })
      .then(r => r.data)
      .then(data => {
        console.log("TRIGGER")
        commit('SET_DATA', data)
      })
  }
}
  