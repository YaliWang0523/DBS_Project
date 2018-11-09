<template lang="jade">
  div(class="modal fade" id="LoginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="vuemodal")
    div(class="modal-dialog" role="document")
      component(v-on:toLoginLayout="toLayout",:is="customLayout" ,:loginData="loginData", :errorMsg="errorMsg")
      scale-loader(v-show="loading" color="#45aaf4" size="10px")
</template>

<script>
import LoginLayout from '@/components/Modal/Login/Login'
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import {CommonToken} from '@/common/CommonToken.js'
import $ from 'jquery'
import { mapActions } from 'vuex'
import {ApiHandle} from '@/Api/ApiHandle.js'
import {CommonFunction} from '@/common/CommonFunction.js'

export default {
  components: {ScaleLoader, LoginLayout},
  name: 'LoginModal',
  data () {
    return {
      loading: false,
      customLayout: 'LoginLayout',
      loginData: [],
      errorMsg: '',
      pId: ''
    }
  },
  created () {
    this.loginData['loginType'] = 'login'
  },
  methods: {
    onHandle: function (data) {
      this.datas = data
      let auth = [false, false, false, false, false]
      for (let key in this.datas) {
        if (this.datas[key]['AUTHORITY'] === 'Bill') {
          auth[0] = true
        } else if (this.datas[key]['AUTHORITY'] === 'Sign') {
          auth[1] = true
        } else if (this.datas[key]['AUTHORITY'] === 'Assign') {
          auth[2] = true
        } else if (this.datas[key]['AUTHORITY'] === 'Disposal') {
          auth[3] = true
        } else if (this.datas[key]['AUTHORITY'] === 'Check') {
          auth[4] = true
        }
      }
      let commonToken = new CommonToken()
      this.pId = this.loginData['pId']
      commonToken.Setter(this.pId, auth, this.datas['1']['DEPNO'])
      console.log(commonToken.GetterDepno())
      this.loading = false
      this.toogleToken(this.pId)
      this.toogleAuth(auth)
      this.toLayout('Login', [])
      $('#LoginModal').modal('hide')
    },
    onError: function () {
      this.datas = []
    },
    onTokenError: function () {
      this.datas = []
    },
    login: function () {
      let commonFunction = new CommonFunction()
      let url = commonFunction.GetApiUrl()
      this.loading = true
      var params = new URLSearchParams()
      params.append('uId', this.loginData['pId'])
      window.Vue.axios({
        method: 'post',
        url: url + 'Auth/List',
        data: params
      })
      .then((response) => {
      /* eslint-disable no-new */
        new ApiHandle(this.onHandle, this.onError, this.onTokenError, response.data, true, this)
        this.loading = false
      })
      .catch(e => {
        this.errors.push(e)
        this.loading = false
        // Error404
        let commonFunction = new CommonFunction()
        commonFunction.ToError404(this)
      })
    },
    toLayout: function (layoutName, backData) {
      this.loginData = backData
      if (layoutName === 'endFlowAndHiddenModal') {
        this.loginData = backData
        this.login()
      }
    },
    doShown () {
      this.errorMsg = 'shown'
    },
    ...mapActions([
      'toogleToken', 'toogleAuth'
    ])
  },
  mounted () {
    $('#LoginModal').on('hidden.bs.modal', this.doHidden)
    $('#LoginModal').on('shown.bs.modal', this.doShown)
  }
}
</script>

