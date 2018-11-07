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
                  button(v-on:click="insertBreakDown", type="button", class="btn btn-primary") 確定 
              
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
      selectEqno: ''
    }
  },
  methods: {
    onNewBreakDownHandle: function (data) {
      console.log(data)
      this.$router.replace({path: '/mybilllist'})
    },
    onNewBreakDownError: function () {
    },
    onNewBreakDownTokenError: function () {
    },
    insertNewBreakDown: function () {
      let commonFunction = new CommonFunction()
      let url = commonFunction.GetApiUrl()
      this.loading = true
      var params = new URLSearchParams()
      params.append('fixno', this.fixno)
      params.append('depno', 'MIS001')
      params.append('pid', this.pId)
      params.append('equipno', this.selectEqno)
      params.append('description', this.description)
      window.Vue.axios({
        method: 'post',
        url: url + 'Breakdown/Add',
        data: params
      })
      .then((response) => {
      /* eslint-disable no-new */
        console.log(response)
        new ApiHandle(this.onNewBreakDownHandle, this.onNewBreakDownError, this.onNewBreakDownTokenError, response.data, true, this)
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
    onGetFixnoHandle: function (data) {
      let dfixno = data
      this.fixno = dfixno['1']['NewFixNo']
      this.insertNewBreakDown()
    },
    onGetFixnoError: function () {
      this.fixno = ''
    },
    onGetFixnoTokenError: function () {
      this.fixno = ''
    },
    getFixno: function () {
      let commonFunction = new CommonFunction()
      let url = commonFunction.GetApiUrl()
      this.loading = true
      window.Vue.axios({
        method: 'post',
        url: url + 'Breakdown/Fixno',
        data: {
        }
      })
      .then((response) => {
      /* eslint-disable no-new */
        new ApiHandle(this.onGetFixnoHandle, this.onGetFixnoError, this.onGetFixnoTokenError, response.data, true, this)
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
    onHandle: function (data) {
      this.equipment = data
      console.log(this.equipment)
    },
    onError: function () {
      this.equipment = []
    },
    onTokenError: function () {
      this.equipment = []
    },
    getEquipment: function () {
      let commonFunction = new CommonFunction()
      let url = commonFunction.GetApiUrl()
      this.loading = true

      window.Vue.axios({
        method: 'post',
        url: url + 'Equipment/List',
        data: {
        }
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
    },
    insertBreakDown: function () {
      this.getFixno()
    }
  },
  created () {
    let commonToken = new CommonToken()
    this.pId = commonToken.Getter()
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