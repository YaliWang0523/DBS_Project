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
                td {{this.detail.FIXNO}}
              tr
                th(class="align-middle", width = '100') 機器設備
                td {{this.detail.EQUIPNAME}}
              tr
                th(class="align-middle") 描述
                td {{this.detail.DESCRIPTION}}
              tr
                th(class="align-middle", width = '100') 歷程
                td
                  table
                  tr
                    th 時間
                    th 操作者
                    th 動作
                    th 指派廠商
                  tr(v-for="item of this.log" ,v-if = "item.ACTION_TIME !== null" )
                    td {{item.ACTION_TIME}}
                    td {{item.USERNAME}}
                    td {{item.ACTION_NAME}}
                    td {{item.ASSIGN_TO}}
              
</template>

<script>
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import {ApiHandle} from '@/Api/ApiHandle.js'
import {CommonFunction} from '@/common/CommonFunction.js'
import {CommonToken} from '@/common/CommonToken.js'
import { mapGetters } from 'vuex'

export default {
  components: {ScaleLoader},
  name: 'BillDetail',
  data () {
    return {
      loading: false,
      detail: [],
      errors: [],
      pId: '',
      fixno: '',
      log: []
    }
  },
  methods: {
    onHandle: function (data) {
      if (data) {
        this.detail = data['1']
        this.log = data['2']
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
      console.log(this.fixno)
      params.append('fixno', this.fixno)
      window.Vue.axios({
        method: 'post',
        url: url + 'Bill/GetDetail',
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