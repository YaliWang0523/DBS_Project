import Vue from 'vue'
export class CommonToken {
  constructor () {
    console.log('')
  }
  Setter (token, user) {
    Vue.localStorage.set('token', token)
    Vue.localStorage.set('userName', user)
  }
  GetUserName () {
    return Vue.localStorage.get('userName')
  }
  Getter () {
    return Vue.localStorage.get('token')
  }
  Clear () {
    Vue.localStorage.set('token', '')
    Vue.localStorage.set('userName', '')
  }
  HasToken () {
    let token = Vue.localStorage.get('token')
    if (token && token !== '') {
      return true
    } else {
      return false
    }
  }
}
