import axios from 'axios'
import { BASE_URL } from '../helpers/util'


export default {
    searchQuery({ commit }, payload) {
        return new Promise(function(resolve, reject) {
            if (!payload.query) reject("empty")
            axios.get(BASE_URL + 'kudusearch/' + payload.query, {
                    headers: {
                        Authorization: 'JWT ' + payload.token
                    }
                })
                .then(r => {
                    console.log("FFEE")
                    resolve(r.data)
                })
                .catch(e => {
                    console.log(e.response)
                    reject(e.response)
                })
        })
    },
    updateData({}, payload) {

    },
    deleteData({}, payload) {

    },
    createData({ state }, payload) {
        let base = state.structure[payload.app][payload.model].detail_api
        let url = (payload.type === "post") ? base : base + payload.pk + "/"
        console.log("SEDnDING")
        console.log(url)
        console.log(payload.type)
        console.log(payload.data)
        return new Promise(function(resolve, reject) {
            axios({
                method: payload.type,
                url: BASE_URL + url,
                dataType: "json",
                data: payload.data,
                headers: {
                    "X-CSRFToken": payload.token,
                    "content-type": "application/json"
                }
            }).then((response) => resolve(response.data)).catch((e) => console.log(e.response))
        })

    },
    loadData({ commit, dispatch, state }, payload) {
        console.log("LOAD DATA")
        console.log(payload.type)
        let app_model = state.structure[payload.app][payload.model]
        let url = (payload.type === "list" || payload.type === "relation") ? app_model.list_api : (app_model.detail_api + payload.pk + "/")
        return new Promise(function(resolve, reject) {
            axios
                .get(BASE_URL + url, {
                    headers: {
                        Authorization: 'JWT ' + payload.token
                    }
                })
                .then(r => {
                    if (payload.type === "list") {
                        commit('SET_STRUCTURE', { model: app_model })
                    } else if (payload.type === "detail") commit('SET_DETAIL', { data: r.data, model: app_model })
                    resolve(r.data)

                })
                .catch(e => {
                    console.log(e)
                    reject('fefe')
                        // if(e.response.data.detail.includes("expired")) commit('LOGOUT')
                })
        })
    },

    loadRelationList({ commit, state }, payload) {
        console.log("LOADRELATIONINFO")
        console.log(payload)
        let list = payload.list.join(",")
        return new Promise(function(resolve, reject) {
            if (payload.list.length == 0) reject("empty")
            axios.get(BASE_URL + payload.url, {
                    params: {
                        id__in: list
                    },
                    headers: {
                        Authorization: 'JWT ' + payload.token
                    }
                })
                .then(r => {
                    console.log(r)
                    resolve(r.data)
                })
                .catch(e => {
                    console.log(e)
                    reject(e.response)
                })
        })
    },

    login({ commit }, payload) {
        return new Promise(function(resolve, reject) {
            axios.post(BASE_URL + "auth/", {
                username: payload.username,
                password: payload.password
            }).then(res => {
                localStorage.setItem('user-token', res.data.token)
                resolve('authenticated');
                commit('AUTHENTICATE', { username: payload.username })
            }).catch(e => {
                console.log("ERROR")
                commit('LOGOUT')
                console.log(e)
                reject('wrong username or password')
            })
        });

    },

    refresh({ commit }, payload) {
        return new Promise(function(resolve, reject) {
            axios.post(BASE_URL + "auth/refresh/", {
                token: payload.token,
            }).then(res => {
                resolve('refreshed');
            }).catch(e => {
                commit('LOGOUT')
            })
        });
    }

}