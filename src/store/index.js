import Vue from 'vue'
import Vuex from 'vuex'
import { CommonToken } from '@/common/CommonToken'

Vue.use(Vuex)

/*
    State.
 */
const state = {
  hasToken: false
}

/*
    Getters.
 */
const getters = {
  getHasToken (state) {
    let commonToken = new CommonToken()
    state.hasToken = commonToken.HasToken()
    return state.hasToken
  }
}

/*
    Actions.
 */
const actions = {
  toogleToken ({ commit }, token) {
    commit('setHasToken', token)
  }
}

/*
    Mutations.
 */
const mutations = {
  setHasToken (state, token) {
    let commonToken = new CommonToken()
    state.hasToken = commonToken.HasToken()
    return state.hasToken
  }
}

/*
    Bulid Vuex Store.
 */
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
