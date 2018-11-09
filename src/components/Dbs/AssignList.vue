<template lang="jade">
div(class="bg-faded py-5")
  scale-loader(v-show="loading" color="#45aaf4" size="10px")
  div(class="container")
    div(class="container mt-md-5")
    div(class="row flex-row align-items-center")
      div(class="col-md-12")
        //- 篩選
        div(class="card")
          div(class="card-body")

            table(class="table table-bordered m-0")
              tr
                th(class="align-middle") 單號
                th(class="align-middle") 部門
                th(class="align-middle") 姓名
                th(class="align-middle") 設備
                th(class="align-middle") 描述
                th(class="align-middle") 時間
                th(class="align-middle") 廠商
                th(class="align-middle")
              tr(v-for="item of this.datas")
                td
                  h4(class="projectList")
                  router-link(class="p-0", :to="{path: '/billdetail/' + item.FIXNO}") {{item.FIXNO}}
                  p 
                td 
                  strong {{item.DEPNAME}}
                td 
                  strong {{item.NAME}}
                td 
                  strong {{item.EQUIPNAME}}
                td 
                  strong {{item.DESCRIPTION}}
                td 
                  strong {{item.TRANSTIME}}
                td
                  {{item.VENDOR}}
                  select(v-model="item.selectVend", class="form-control")
                    option(value= "") 請選擇
                    option(v-for="vd in item.VEND", :value= "vd.VENDNO") {{vd.VENDNAME}}
                td
                  button(v-on:click="assign(item)", type="button", class="btn btn-primary") 指派
</template>

<script>
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import {ApiHandle} from '@/Api/ApiHandle.js'
import {CommonFunction} from '@/common/CommonFunction.js'
import {CommonToken} from '@/common/CommonToken.js'
import { mapGetters } from 'vuex'

export default {
  components: {ScaleLoader},
  name: 'AssignList',
  data () {
    return {
      loading: false,
      datas: [],
      errors: [],
      pId: '',
      selectVendor: '',
      vendors: []
    }
  },
  methods: {
    toSignDetail: function (fixno) {
      this.$router.replace({name: 'signdetail', params: {info: fixno}})
    },
    assign: function (item) {
      this.getAssignData(item)
    },
    onAssignHandle: function (data) {
      this.getVendorData()
    },
    onAssignError: function () {
    },
    onAssignTokenError: function () {
    },
    getAssignData: function (item) {
      let commonFunction = new CommonFunction()
      let url = commonFunction.GetApiUrl()
      let commonToken = new CommonToken()
      this.pId = commonToken.Getter()
      this.loading = true
      var params = new URLSearchParams()
      params.append('fixno', item['FIXNO'])
      params.append('depno', commonToken.GetterDepno())
      params.append('pid', this.pId)
      params.append('vendor', item['selectVend'])
      window.Vue.axios({
        method: 'post',
        url: url + 'Assign/Ok',
        data: params
      })
      .then((response) => {
      /* eslint-disable no-new */
        new ApiHandle(this.onAssignHandle, this.onAssignError, this.onAssignTokenError, response.data, true, this)
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
    onVendorHandle: function (data) {
      let ven = data
      for (var i = 0; i < ven['1'].length; i++) {
        var temp = data['1'][i]
        this.vendors.push(temp)
      }
      this.getData()
    },
    onVendorError: function () {
      this.vendor = []
    },
    onVendorTokenError: function () {
      this.vendor = []
    },
    getVendorData: function () {
      let commonFunction = new CommonFunction()
      let url = commonFunction.GetApiUrl()
      this.loading = true
      var params = new URLSearchParams()
      params.append('', '')
      window.Vue.axios({
        method: 'post',
        url: url + 'Vendor/List',
        data: params
      })
      .then((response) => {
      /* eslint-disable no-new */
        new ApiHandle(this.onVendorHandle, this.onVendorError, this.onVendorTokenError, response.data, true, this)
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
    onHandle: function (listdata) {
      var ds = listdata
      for (let key in ds) {
        ds[key]['VEND'] = this.vendors
        ds[key]['selectVend'] = ''
      }
      this.datas = ds
    },
    onError: function () {
      this.datas = []
    },
    onTokenError: function () {
      this.datas = []
    },
    getData: function () {
      let commonFunction = new CommonFunction()
      let url = commonFunction.GetApiUrl()
      this.loading = true
      let commonToken = new CommonToken()
      this.pId = commonToken.Getter()
      var params = new URLSearchParams()
      params.append('pid', this.pId)
      window.Vue.axios({
        method: 'post',
        url: url + 'Assign/List',
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
    }
  },
  created () {
    this.getVendorData()
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