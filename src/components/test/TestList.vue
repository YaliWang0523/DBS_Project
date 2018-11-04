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
                th(class="align-middle") No
                th(class="align-middle") Name
              tr(v-for="item of this.datas")
                td
                  p {{item.title}}
                td 
                  strong {{item}}
        

</template>

<script>
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import {ApiHandle} from '@/Api/ApiHandle.js'
import {CommonFunction} from '@/common/CommonFunction.js'

export default {
  components: {ScaleLoader},
  name: 'testList',
  data () {
    return {
      loading: false,
      datas: [],
      errors: []
    }
  },
  methods: {
    onHandle: function (data) {
      this.datas = data
      console.log(this.datas)
    },
    onError: function () {
      this.datas = []
      console.log('2')
    },
    onTokenError: function () {
      this.datas = []
      console.log('3')
    },
    getData: function () {
      let commonFunction = new CommonFunction()
      let url = commonFunction.GetApiUrl()
      this.loading = true
      window.Vue.axios({
        method: 'get',
        url: url + '/'
      })
      .then((response) => {
      /* eslint-disable no-new */
        console.log(response)
        new ApiHandle(this.onHandle, this.onError, this.onTokenError, response.data, true, this)
        console.log('4')
        console.log(url)
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
  }
}
</script>

