import Vue from 'vue'
import Vuex from 'vuex'
import { CommonToken } from '@/common/CommonToken'

Vue.use(Vuex)

/*
    State.
 */
const state = {
  hasToken: false,
  authBill: false,
  authSign: false,
  authAssign: false,
  authDisposal: false,
  authCheck: false
}

/*
    Getters.
 */
const getters = {
  getHasToken (state) {
    let commonToken = new CommonToken()
    state.hasToken = commonToken.HasToken()
    return state.hasToken
  },
  gettersBill (state) {
    let commonToken = new CommonToken()
    state.authBill = commonToken.GetterAuthBill()
    return state.authBill
  },
  gettersSign (state) {
    let commonToken = new CommonToken()
    state.authSign = commonToken.GetterAuthSign()
    return state.authSign
  },
  gettersAssign (state) {
    let commonToken = new CommonToken()
    state.authAssign = commonToken.GetterAuthAssign()
    return state.authAssign
  },
  gettersDisposal (state) {
    let commonToken = new CommonToken()
    state.authDisposal = commonToken.GetterAuthDisposal()
    return state.authDisposal
  },
  gettersCheck (state) {
    let commonToken = new CommonToken()
    state.authCheck = commonToken.GetterAuthCheck()
    return state.authCheck
  }
}

/*
    Actions.
 */
const actions = {
  toogleToken ({ commit }, token) {
    commit('setHasToken', token)
  },
  toogleAuth ({commit}, auth) {
    commit('setAuth', auth)
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
  },
  setAuth (state, auth) {
    let commonToken = new CommonToken()
    state.authBill = commonToken.GetterAuthBill()
    state.authSign = commonToken.GetterAuthSign()
    state.authAssign = commonToken.GetterAuthAssign()
    state.authDisposal = commonToken.GetterAuthDisposal()
    state.authCheck = commonToken.GetterAuthCheck()
    console.log(auth)
    return state.authBill
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
