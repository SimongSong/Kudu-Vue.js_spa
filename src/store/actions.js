import axios from 'axios'
import { start } from 'repl';
const BASE_URL = 'http://127.0.0.1:8000/api/'
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozMSwidXNlcm5hbWUiOiJzc29uZyIsImV4cCI6MTU2MjA4OTkxOCwiZW1haWwiOiIiLCJvcmlnX2lhdCI6MTU2MjA4NjMxOH0.W6e1WX_qhk4UNmSCdCxooTcvYwjvpke32SWW5Fgm9zc'
export default {
  loadData({ commit, dispatch, state }, payload) {
    let app_model = state.structure[payload.app][payload.model]
    let url = (payload.type === "list") ? app_model.list_api : (app_model.detail_api + payload.pk)
    return new Promise(function(resolve, reject) {
    axios
      .get(BASE_URL + url,{
        headers : {
          Authorization : 'JWT ' + payload.token
        }
      })
      .then(r => {
        resolve("success")
        if(payload.type === "list")
          commit('SET_DATA', {data: r.data, model: app_model} )
        else if(payload.type === "detail")
          commit('SET_DETAIL', {data: r.data, model: app_model} )
      })
      .catch(e => {
        if(e.response.data.detail.includes("expired"))
        commit('LOGOUT')
      })
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

  },

}
  