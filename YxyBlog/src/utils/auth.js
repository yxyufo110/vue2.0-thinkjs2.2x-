/**
 * 用户权限单例
 * @return {Function}   Auth函数
 */
const Auth = (function () {
  let instance
  let authConstruct = function () {
    if (instance) return instance
    instance = this
    return instance
  }

  /**
   * 判断是否登陆
   * @return {Boolean}
   */
  authConstruct.prototype.loggedIn = function () {
    return (!!window.sessionStorage.getItem('token'))
  }

  /**
   * 保存用户信息，设置sessionStorage
   * @param  {String} token,userid,options.username,rolename,powers
   */
  authConstruct.prototype.saveUser = function (token, {username}, {userid, name, message, roles}) {
    let isAdmin = roles[0] === 'buser_admin' ? 1 : 0
    window.sessionStorage.setItem('token', token)
    window.sessionStorage.setItem('userid', userid)
    window.sessionStorage.setItem('username', username)
    window.sessionStorage.setItem('name', name)
    window.sessionStorage.setItem('company', message)
    window.sessionStorage.setItem('isAdmin', isAdmin)
  }

  /**
   * 移除用户，清楚sessionStorage
   */
  authConstruct.prototype.removeUser = function () {
    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('userid')
    window.sessionStorage.removeItem('username')
    window.sessionStorage.removeItem('name')
    window.sessionStorage.removeItem('company')
    window.sessionStorage.removeItem('isAdmin')
  }

  /**
   * 判断是否是管理员
   * @return {Boolean}
   */
  authConstruct.prototype.isAdmin = function () {
    let isAdmin = JSON.parse(window.sessionStorage.getItem('isAdmin'))
    return parseInt(isAdmin) === 1
  }

  return authConstruct
})()

export default Auth
