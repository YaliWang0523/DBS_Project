<template lang="jade">
div(class="bg-faded py-5")
  div(class="container")
    div(class="container mt-md-5")
    div(class="row flex-row align-items-center")
      div(class="col-md-12")
        //- 篩選
        div(class="card")
          div(class="card-body")
            table(class="table table-bordered m-0")
              tr
                th(class="align-middle", width = '100') 單號
                td 
              tr
                th(class="align-middle", width = '100') 機器設備
                td 
              tr
                th(class="align-middle") 描述
                td 
                  {{this.detail.DESCRIPTION}}
              tr 歷程
                td
              tr 
                td(colspan="2")
                  button(v-on:click="reject", type="button", class="btn btn-primary") 退回
                  &nbsp;&nbsp;
                  button(v-on:click="sign_ok", type="button", class="btn btn-primary") 核可
              
</template>

<script>
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import {ApiHandle} from '@/Api/ApiHandle.js'
import {CommonFunction} from '@/common/CommonFunction.js'
import {CommonToken} from '@/common/CommonToken.js'
import { mapGetters } from 'vuex'

export default {
  components: {ScaleLoader},
  name: 'SignDetail',
  data () {
    return {
      loading: false,
      detail: [],
      errors: [],
      pId: '',
      fixno: ''
    }
  },
  methods: {
    sign_ok: function () {

    },
    reject: function () {

    },
    onHandle: function (data) {
      if (data) {
        console.log(data)
        this.detail = data['1']
      }
    },
    onError: function () {
      this.detail = []
    },
    onTokenError: function () {
      this.detail = []
    },
    getData: function () {
      let commonFunction = new CommonFunction()
      let url = commonFunction.GetApiUrl()
      this.loading = true
      var params = new URLSearchParams()
      params.append('fixno', this.fixno)
      window.Vue.axios({
        method: 'post',
        url: url + '/Bill/GetDetail',
        data: params
      })
      .then((response) => {
      /* eslint-disable no-new */
        console.log(response)
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
    }
  },
  created () {
    let commonToken = new CommonToken()
    this.pId = commonToken.Getter()
    this.fixno = this.$route.params.info
    console.log(this.fixno)
    this.getData()
  },
  computed: {
    ...mapGetters({
      hasToken: (['getHasToken'])
    })
  },
  watch: {
    hasToken: function () {
      let commonToken = new CommonToken()
      this.token = commonToken.Getter()
      if (commonToken.HasToken()) {
      } else {
        this.$router.replace({path: '/'})
      }
    }
  }
}
</script>