import Vue from 'vue'
import Router from 'vue-router'
import {CommonToken} from '@/common/CommonToken.js'
import $ from 'jquery'

const Error404 = () => import('@/components/Error/Error404')
const Download = () => import('@/components/Download/Download')
const TestList = () => import('@/components/test/TestList')
const MyBillList = () => import('@/components/Dbs/MyBillList')
const Home = () => import('@/components/Home')

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', component: Home }, // 根目錄
    // { path: '/about_pulo', name: 'about_pulo', component: AboutPULO }, // 關於PULO
    { path: '/error_404', name: 'error_404', component: Error404 }, // 404Error
    { path: '/download', name: 'download', component: Download }, // 下載
    {path: '/testlist', name: 'testlist', component: TestList},
    {path: '/mybilllist', name: 'mybilllist', component: MyBillList},
    { path: '*', component: Error404 }
  ]}
)

export default router

router.afterEach(function (to) {
  if (to && to.name !== 'project_list') {
    window.scrollTo(0, 0)
  }
})
router.beforeEach(async(to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let commonToken = new CommonToken()
    const hasToken = commonToken.HasToken()
    if (hasToken === false) {
      $('#LoginModal').modal('show')
      // next({
      //   path: ''
      // })
    } else {
      next() // 必須向下走
    }
  } else {
    next() // 必須向下走
  }
})
