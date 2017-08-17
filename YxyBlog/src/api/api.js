import Auth from 'utils/auth.js'
// import store from 'store'
let auth = new Auth()

/**
 * Api 基础父类
 */
class Api {
  /* eslint-disable no-useless-constructor */
  constructor () {
    this.http
    this.token = window.sessionStorage.getItem('token') || ''
  }

  setToken (token) {
    this.token = token
  }

  removeToken () {
  }

  /**
   * 作为Vue插件进行安装，挂载到Vue.prototype
   * @param  {Object} Vue     Vue
   * @param  {String} options 配置项: baseUrl
   * @return {}
   */
  install (Vue, options) {
    if (!options || typeof options !== 'string') throw new TypeError('TypeError: Api.prototype.install param Expect String, but not defined or it\'s not String')
    Vue.http.options.root = options
    let httpInstance = Vue.http
    this.http = httpInstance
    Vue.prototype.$api = this
  }
}

export default Api
