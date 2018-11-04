<template lang="jade">
div(class="modal-content" ref="vuemodal")
  modal-header(:title="title")
  div(class="modal-body")
    div(id="input-group", class="form-group has-danger")
      p(class="form-control-label") {{desc}}
      input(class="form-control form-control-lg", v-model="pId", aria-describedby="help-x1", placeholder="工號,ex:1234", maxlength="8")
      div(id="help-x1" class="form-control-feedback") {{selfErrorMsg}}
      scale-loader(v-show="loading" color="#45aaf4" size="10px")
  div(class="modal-footer")
    button(type="button", class="btn btn-outline-secondary", data-dismiss="modal") 上一頁
    button(v-on:click="toMyMain", type="button", class="btn btn-primary", :disabled="(pId.length != 8)") 登入 
    
</template>

<script>
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import ModalHeader from '@/components/Modal/ModalHeader'

export default {
  components: {ScaleLoader, ModalHeader},
  name: 'Login',
  props: ['loginData', 'errorMsg'],
  data () {
    return {
      loading: false,
      pId: '',
      title: '請填寫你的工號',
      desc: '',
      selfErrorMsg: ''
    }
  },
  methods: {
    toMyMain: function () {
      this.loginData['pId'] = this.pId
      this.$emit('toLoginLayout', 'endFlowAndHiddenModal', this.loginData)
    }
  }
}
</script>


