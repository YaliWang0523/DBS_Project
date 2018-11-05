// import {CommonToken} from '@/common/CommonToken.js'
export class ApiHandle {
  constructor (onHanle, onError, onTokenError, apiData, showError, current) {
    // if (apiData && apiData.result && apiData.result === '10') {
    onHanle(apiData)
    return 'success'
    // }
//      else if (apiData && apiData.result && apiData.result === '19') {
//       // 登出清空暫存，顯示錯誤訊息
//       let commonToken = new CommonToken()
//       commonToken.Clear()
// //      current.$router.push({path: '/login'})
//       onTokenError()
//       return 'tokenError'
//     } else {
//       onError(showError, apiData)

//       return 'error'
//     }
  }
}
