<template lang="jade">
div(class="container h-75")
  div(class="row h-100 py-5")
    div(class="col-md-6 my-auto text-center")
      img(src="static/images/img_404.png" class="imgError404", v-rjs="3" , alt="404 網頁不存在")
    div(class="col-md-6 my-auto text-center text-md-left px-3")
      h1(class="display-4 pt-md-5 pb-md-3") 404 - 網頁不存在
      p(class="text-gray-light pb-md-5") 你要瀏覽的網頁不存在，可能是因為網址已移除，或輸入的網址有誤。
      a(href="/" class="btn btn-primary btn-lg" title="回 PULO 首頁") 回 PULO 首頁
</template>

<script>
export default {
  name: 'Error404'
}
</script>


