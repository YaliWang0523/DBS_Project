// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLocalStorage from 'vue-localstorage'
import store from './store'
import retina from 'retinajs'
import VueRetina from 'vue-retina'

require('./assets/js/bootstrap.js')
// require('./assets/commonJS/Mixpanel.js')
// require('./assets/commonJS/Intercom.js')
// require('./assets/commonJS/retina.min.js')

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueRetina, {retina})
window.Vue = new Vue({})
Vue.use(VueLocalStorage)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
