import axios from 'axios'
import { start } from 'repl';
const BASE_URL = 'http://127.0.0.1:8000/api/'

export default {
  loadData({ commit, state }, payload) {
    let app_model = state.structure[payload.app][payload.model]
    let url = (payload.type === "list") ? app_model.list_api : (app_model.detail_api + payload.pk)
    
    axios
      .get(BASE_URL + url,{},{
      auth: {
        username: 'ssong',
        password: 'Iamsuperstar1#'}
    })
      .then(r => r.data)
      .then(data => {
        console.log("TRIGGER")
        if(payload.type === "list")
          commit('SET_DATA', {data: data, model: app_model} )
        else if(payload.type === "detail")
          commit('SET_DETAIL', {data: data, model: app_model} )
      })
  },

  login({ commit }, payload) {
    console.log("payload")
    console.log(payload)
    return new Promise(function(resolve, reject) {
      axios.post(BASE_URL + "auth/", {
        username: payload.username,
        password: payload.password
    }).then(res =>
        {
        resolve(res.data.token);
        commit('AUTHENTICATE', {username : payload.username })
        }).catch(e => {
          console.log("ERROR")
          console.log(e)
          reject('wrong username or password')
        })
    });

  }
}
  