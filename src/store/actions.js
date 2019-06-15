import axios from 'axios'


export default {
  loadData({ commit }) {
    axios
      .get('http://127.0.0.1:8000/api/kududlplibrary_list/',{},{
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
  