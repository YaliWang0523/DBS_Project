export class CommonFunction {
  constructor () {
    console.log('commonfunction')
  }
  ToError404 (current) {
    current.$router.push({path: '/error_404'})
  }

  DateForamt (date) {
    var dateFormat = require('dateformat')
    let result = new Date(date)
    result.setDate(result.getDate() - 0)
    return dateFormat(result, 'yyyy/mm/dd')
  }

  GetApiUrl () {
    if (process.env.NODE_ENV === 'production') {
      // return 'https://apiv1.puloapp.com/'
      return ''
    } else {
      return '/data/'
    }
  }
}
