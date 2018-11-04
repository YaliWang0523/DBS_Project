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

export default {
  components: {ScaleLoader, LoginLayout},
  name: 'LoginModal',
  data () {
    return {
      loading: false,
      customLayout: 'LoginLayout',
      loginData: [],
      errorMsg: ''
    }
  },
  created () {
    this.loginData['loginType'] = 'login'
  },
  methods: {
    toLayout: function (layoutName, backData) {
      this.loginData = backData
      if (layoutName === 'endFlowAndHiddenModal') {
        this.loginData = backData
        let commonToken = new CommonToken()
        commonToken.Setter('aaa', 'aaa')
        this.loading = false
        this.toogleToken('aaa')
        this.toLayout('Login', [])
        $('#LoginModal').modal('hide')
      }
    },
    doShown () {
      this.errorMsg = 'shown'
    },
    ...mapActions([
      'toogleToken'
    ])
  },
  mounted () {
    $('#LoginModal').on('hidden.bs.modal', this.doHidden)
    $('#LoginModal').on('shown.bs.modal', this.doShown)
  }
}
</script>

