import * as URL from './urlType.js'
import Api from './api.js'
// import Auth from 'utils/auth.js'
// let auth = new Auth()

/**
 * 导出的子类，继承了Api父类
 */
class ExportApi extends Api {
  /* eslint-disable no-useless-constructor */
  constructor () {
    super()
  }

  login (userInfo) {
    if (!userInfo) throw new TypeError('this.$api.login\'s param userInfo is undefined')
    return new Promise((resolve, reject) => {
      this.http.post(URL.login,userInfo).then(res => {
         resolve(res.body)
      }, reject)
    })
  }

  userMsg () {
    return new Promise((resolve, reject) => {
      this.http.get(URL.userMsg).then(res => {
         resolve(res.body)
      }, reject)
    })
  }

  changePwd (userInfo) {
    if (!userInfo) throw new TypeError('this.$api.login\'s param userInfo is undefined')
    return new Promise((resolve, reject) => {
      this.http.post(URL.changePwd, userInfo).then(res => {
         resolve(res.body)
      }, reject)
    })
  }
}

/*
循环getFilterList对象数组，返回方法挂载到Export.protype上
 */
URL.getFilterList.forEach((getObj) => {
  ExportApi.prototype[getObj.name] = function (quertStr) {
    return new Promise((resolve, reject) => {
      this.http.get(getObj.url + quertStr).then(res => {
        resolve(res.body)
      }, reject)
    })
  }
})

/*
循环getList对象数组，返回方法挂载到Export.protype上
 */
URL.getList.forEach((getObj) => {
  ExportApi.prototype[getObj.name] = function () {
    return new Promise((resolve, reject) => {
      this.http.get(getObj.url).then(res => {
        resolve(res.body)
      }, reject)
    })
  }
})

URL.postList.forEach((postObj) => {
  ExportApi.prototype[postObj.name] = function (postBody) {
    return new Promise((resolve, reject) => {
      this.http.post(postObj.url, postBody).then(res => {
        resolve(res.body)
      }, reject)
    })
  }
})

URL.deleteList.forEach((deleteObj) => {
  ExportApi.prototype[deleteObj.name] = function (deleteQuery) {
    let isQuery = typeof deleteQuery === 'string'
    let query = isQuery ? '?_id=' + deleteQuery : ''
    let deleteList = isQuery ? null : deleteQuery
    return new Promise((resolve, reject) => {
      this.http.delete(deleteObj.url + query, {body: deleteList}).then(res => {
        resolve(res.body)
      }, reject)
    })
  }
})

URL.putList.forEach((putObj) => {
  ExportApi.prototype[putObj.name] = function (putBody) {
    return new Promise((resolve, reject) => {
      this.http.put(putObj.url, putBody).then(res => {
        resolve(res.body)
      }, reject)
    })
  }
})

export default new ExportApi()
