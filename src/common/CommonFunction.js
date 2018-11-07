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
      // http://59.127.224.170:1234/
      // http://127.0.0.1:5000/
      return 'http://127.0.0.1:5000/'
    } else {
      return '/data/'
    }
  }
}
