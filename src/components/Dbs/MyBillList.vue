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
                th(class="align-middle") 單號
                th(class="align-middle") 部門
                th(class="align-middle") 姓名
                th(class="align-middle") 設備
                th(class="align-middle") 描述
                th(class="align-middle") 時間
                th(class="align-middle") 狀態
              tr(v-for="item of this.datas")
                td
                  router-link(class="p-0", :to="{path: '/billdetail/' + item.FIXNO}") {{item.FIXNO}}
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
                  strong(v-if="item.STATUS !== 'REJECT'") {{getStatusName(item.STATUS)}}
                  button(v-if="item.STATUS === 'REJECT'",v-on:click="reSend(item.FIXNO)", type="button", class="btn btn-primary") 重送

        

</template>

<script>
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import {ApiHandle} from '@/Api/ApiHandle.js'
import {CommonFunction} from '@/common/CommonFunction.js'
import {CommonToken} from '@/common/CommonToken.js'
import { mapGetters } from 'vuex'

export default {
  components: {ScaleLoader},
  name: 'MyBillList',
  data () {
    return {
      loading: false,
      datas: [],
      errors: [],
      pId: ''
    }
  },
  methods: {
    getStatusName: function (status) {
      if (status) {
        if (status === 'NEW') {
          return '審核'
        } else if (status === 'SIGNED') {
          return '指派'
        } else if (status === 'ASSIGN') {
          return '處置'
        } else if (status === 'REJECT') {
          return '拒絕'
        } else if (status === 'DISPOSAL') {
          return '驗收'
        } else if (status === 'CHECKED') {
          return '完工'
        }
      }
    },
    reSend: function (fixno) {
      this.$router.replace({name: 'resend', params: {info: fixno}})
    },
    onHandle: function (data) {
      this.datas = data
      console.log(this.datas)
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
      params.append('uId', this.pId)
      window.Vue.axios({
        method: 'post',
        url: url + 'MyBill/List',
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