<template lang="jade">
div(class="download")
  //- Hero Image
  div(class="heroImg")
    div(class="heroText text-center")
      h1(class="display-3 mb-3") 下載 PULO
      p(class="mx-4") 
        | PULO App — 給你美好裝潢體驗的裝潢行動媒合平台
        br
        | 支援安卓(Android)、蘋果(iOS)兩大行動系統。
        br
        | 屋主使用 PULO，可享有專屬裝潢顧問服務：
        br 
        | 丈量→估價→檢視裝潢合約→簽約→裝修信託→施工→驗收→階段付款→完工→評價。
  //- 下載屋主版
  div(class="container mt-md-5")
    div(class="row flex-row align-items-center")
      div(class="col-md-6 text-center")
        img(class="mr-md-3 my-5 my-md-0" src="static/images/download/img_screenshot_detail.png", v-rjs="3" , alt="下載 PULO app 屋主版")
      div(class="col-md-6 align-middle")
        h2(class="text-center text-md-left mb-3") PULO 屋主版下載
        p(class="text-center text-md-left")
          | 1. 嚴格篩選把關裝潢廠商身分、資格
          br
          | 2. 過濾負評師傅、不實廠商加入
          br
          | 3. 全平台實名制，廠商真實姓名直接公開
          br
          | 4. App 線上幫手，你的隨身裝修顧問
          br
          | 5. 提供估價單、合約書檢視服務
          br
          | 6. 師傅溝通、施工過程產生不合，告訴 PULO ，馬上協助。
        div(class="row pt-3 justify-content-center justify-content-md-start")
          a(class="col-auto mr-3" href="https://app.appsflyer.com/id1160638151?pid=PortaliOShome" title="下載 iOS PULO 屋主版" target="_blank")
            img(src="static/images/badge_app_store.png", v-rjs="3" , alt="下載 iOS PULO 屋主版")
          a(class="col-auto " href="https://app.appsflyer.com/com.nexti.pulohome?pid=PortalAndroid" title="下載 Android PULO 屋主版" target="_blank")
            img(src="static/images/badge_google_play.png", v-rjs="3" , alt="下載 Android PULO 屋主版")
  //- 下載師傅版
  hr(class="m-md-0")
  div(class="container" id="downloadProApp")
    div(class="row align-items-center pt-md-5 pb-5 pb-md-0")
      div(class="col-md-6 text-center")
        img(class="mr-md-3 my-5 my-md-0" src="static/images/download/img_screenshot_profile.png", v-rjs="3" , alt="下載 PULO app 師傅版")
      div(class="col-md-6 align-middle")
        h2(class="text-center text-md-left mb-3") PULO 師傅版下載
        p(class="text-center text-md-left")
          | 1. 成交不抽佣金
          br
          | 2. 累積口碑評價
          br
          | 3. 隨時隨地獲得新案件通知
        div(class="row pt-3 justify-content-center justify-content-md-start")
          a(class="col-auto mr-3" href="https://app.appsflyer.com/id1266584276?pid=PortaliOSpro" title="下載 iOS PULO 師傅版" target="_blank")
            img(src="static/images/badge_app_store.png", v-rjs="3" , alt="下載 iOS PULO 師傅版")
          a(class="col-auto" href="https://app.appsflyer.com/com.pulo.app?pid=PortalAndroidPro" title="下載 Android PULO 師傅版" target="_blank")
            img(src="static/images/badge_google_play.png", v-rjs="3" , alt="下載 Android PULO 師傅版")

</template>

<script>
export default {
  name: 'Download',
  created () {
    this.metaDetail()
  },
  methods: {
    metaDetail: function () {
      document.head.querySelector('meta[name=robots]').content = 'index , follow'
      document.title = '下載 App—PULO 裝潢 App'
      document.head.querySelector('meta[name=keywords]').content = 'Android、iOS APP'
      document.head.querySelector('meta[name=description]').content = 'PULO App — 給你美好裝潢體驗的裝潢行動媒合平台，支援安卓(Android)、蘋果(iOS)兩大行動系統。屋主使用 PULO，可享有專屬裝潢顧問服務：丈量→估價→檢視裝潢合約→簽約→裝修信託→施工→驗收→階段付款→完工→評價。'
            // Facebook meta
      document.head.querySelector('meta[property=og\\:title]').content = '下載 App—PULO 裝潢 App'
      document.head.querySelector('meta[property=og\\:description]').content = 'PULO App — 給你美好裝潢體驗的裝潢行動媒合平台，支援安卓(Android)、蘋果(iOS)兩大行動系統。屋主使用 PULO，可享有專屬裝潢顧問服務：丈量→估價→檢視裝潢合約→簽約→裝修信託→施工→驗收→階段付款→完工→評價。'
    }
  }
}
</script>

