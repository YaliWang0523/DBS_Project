import Vue from 'vue'
import Router from 'vue-router'
import {CommonToken} from '@/common/CommonToken.js'
import $ from 'jquery'

const Error404 = () => import('@/components/Error/Error404')
const Download = () => import('@/components/Download/Download')
const TestList = () => import('@/components/test/TestList')
const MyBillList = () => import('@/components/Dbs/MyBillList')
const CreateBill = () => import('@/components/Dbs/CreateBill')
const SignList = () => import('@/components/Dbs/SignList')
const Home = () => import('@/components/Home')
const SignDetail = () => import('@/components/Dbs/SignDetail')
const AssignList = () => import('@/components/Dbs/AssignList')
const DisposalList = () => import('@/components/Dbs/DisposalList')
const CheckList = () => import('@/components/Dbs/CheckList')
const ReSend = () => import('@/components/Dbs/ReSend')

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', component: Home }, // 根目錄
    // { path: '/about_pulo', name: 'about_pulo', component: AboutPULO }, // 關於PULO
    { path: '/error_404', name: 'error_404', component: Error404 }, // 404Error
    { path: '/download', name: 'download', component: Download }, // 下載
    {path: '/testlist', name: 'testlist', component: TestList},
    {path: '/mybilllist',
      name: 'mybilllist',
      component: MyBillList,
      meta: {requiresAuth: true}},
    {path: '/createbill',
      name: 'createbill',
      component: CreateBill,
      meta: {requiresAuth: true}},
    {path: '/signlist',
      name: 'signlist',
      component: SignList,
      meta: {requiresAuth: true}},
    {path: '/assignlist',
      name: 'assignlist',
      component: AssignList,
      meta: {requiresAuth: true}},
    {path: '/disposallist',
      name: 'disposallist',
      component: DisposalList,
      meta: {requiresAuth: true}},
    {path: '/checklist',
      name: 'checklist',
      component: CheckList,
      meta: {requiresAuth: true}},
    {path: '/signdetail/:info',
      name: 'signdetail',
      component: SignDetail,
      meta: {requiresAuth: true}},
    {path: '/resend/:info',
      name: 'resend',
      component: ReSend,
      meta: {requiresAuth: true}},
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
