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
                th(class="align-middle", width = '100') 機器設備
                td 
                  select(v-model="selectEqno", class="form-control")
                    option(value= "") 請選擇
                    option(v-for="eq in equipment", :value= "eq.EQUIPNO") {{eq.EQUIPNAME}}
              tr
                th(class="align-middle") 描述
                td 
                  textarea(v-model="description", placeholder = "請輸入故障情況")
              tr 
                td(colspan="2")
                  button(v-on:click="Resend()", type="button", class="btn btn-primary") 重送
              
</template>

<script>
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import {ApiHandle} from '@/Api/ApiHandle.js'
import {CommonFunction} from '@/common/CommonFunction.js'
import {CommonToken} from '@/common/CommonToken.js'
import { mapGetters } from 'vuex'

export default {
  components: {ScaleLoader},
  name: 'CreateBill',
  data () {
    return {
      loading: false,
      datas: [],
      errors: [],
      equipment: [],
      pId: '',
      description: '',
      fixno: '',
      selectEqno: '',
      detail: []
    }
  },
  methods: {
    onBillResendHandle: function (data) {
      this.$router.replace({path: '/mybilllist'})
    },
    onBillResendError: function () {
    },
    onBillResendTokenError: function () {
    },
    BillResend: function () {
      let commonFunction = new CommonFunction()
      let url = commonFunction.GetApiUrl()
      this.loading = true
      var params = new URLSearchParams()
      params.append('fixno', this.fixno)
      params.append('equipno', this.selectEqno)
      params.append('description', this.description)
      window.Vue.axios({
        method: 'post',
        url: url + '/Bill/Resend',
        data: params
      })
      .then((response) => {
      /* eslint-disable no-new */
        console.log(response)
        new ApiHandle(this.onBillResendHandle, this.onBillResendError, this.onBillResendTokenError, response.data, true, this)
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
    onDetailHandle: function (data) {
      this.detail = data
      this.selectEqno = this.detail['1']['EQUIPNO']
      this.description = this.detail['1']['DESCRIPTION']
    },
    onDetailError: function () {
      this.detail = []
    },
    onDetailTokenError: function () {
      this.detail = []
    },
    getDetailDate: function () {
      let commonFunction = new CommonFunction()
      let url = commonFunction.GetApiUrl()
      this.loading = true
      var params = new URLSearchParams()
      params.append('fixno', this.fixno)
      window.Vue.axios({
        method: 'post',
        url: url + 'Bill/GetDetail',
        data: params
      })
      .then((response) => {
      /* eslint-disable no-new */
        console.log(response)
        new ApiHandle(this.onDetailHandle, this.onDetailError, this.onDetailTokenError, response.data, true, this)
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
    onEquipmentHandle: function (data) {
      this.equipment = data
      this.getDetailDate()
    },
    onEquipmentError: function () {
      this.equipment = []
    },
    onEquipmentTokenError: function () {
      this.equipment = []
    },
    getEquipment: function () {
      let commonFunction = new CommonFunction()
      let url = commonFunction.GetApiUrl()
      this.loading = true
      var params = new URLSearchParams()
      params.append('', '')
      window.Vue.axios({
        method: 'post',
        url: url + 'Equipment/List',
        data: params
      })
      .then((response) => {
      /* eslint-disable no-new */
        console.log(response)
        new ApiHandle(this.onEquipmentHandle, this.onEquipmentError, this.onEquipmentTokenError, response.data, true, this)
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
    Resend: function () {
      this.BillResend()
    }
  },
  created () {
    let commonToken = new CommonToken()
    this.pId = commonToken.Getter()
    this.fixno = this.$route.params.info
    this.getEquipment()
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