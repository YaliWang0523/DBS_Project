import Vue from 'vue'
export class CommonToken {
  constructor () {
    console.log('')
  }
  Setter (token, auth, depno) {
    Vue.localStorage.set('token', token)
    Vue.localStorage.set('depno', depno)
    Vue.localStorage.set('auth', JSON.stringify(auth))
  }
  Getter () {
    return Vue.localStorage.get('token')
  }
  GetterDepno () {
    return Vue.localStorage.get('depno')
  }
  Clear () {
    Vue.localStorage.set('token', '')
    Vue.localStorage.set('auth', '')
    Vue.localStorage.set('depno', '')
  }
  HasToken () {
    let token = Vue.localStorage.get('token')
    if (token && token !== '') {
      return true
    } else {
      return false
    }
  }
  SetterAuth (auth) {
    Vue.localStorage.set('auth', JSON.stringify(auth))
  }
  GetterAuthBill () {
    let auth = JSON.parse(Vue.localStorage.get('auth'))
    let authBill = false
    if (auth) {
      authBill = auth[0]
    }
    return authBill
  }
  GetterAuthSign () {
    let auth = JSON.parse(Vue.localStorage.get('auth'))
    let authSign = false
    if (auth) {
      authSign = auth[1]
    }
    return authSign
  }
  GetterAuthAssign () {
    let auth = JSON.parse(Vue.localStorage.get('auth'))
    let authAssign = false
    if (auth) {
      authAssign = auth[2]
    }
    return authAssign
  }
  GetterAuthDisposal () {
    let auth = JSON.parse(Vue.localStorage.get('auth'))
    let authDisposal = false
    if (auth) {
      authDisposal = auth[3]
    }
    return authDisposal
  }
  GetterAuthCheck () {
    let auth = JSON.parse(Vue.localStorage.get('auth'))
    let authCheck = false
    if (auth) {
      authCheck = auth[4]
    }
    return authCheck
  }
}
