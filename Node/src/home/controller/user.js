'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  // 用户登录
  async loginAction() {
    this.indexAction()
    if (this.isPost()) {
      let model = this.model('user')
      let data = model.login(this.post())
      if (think.isEmpty(data)) {
        // 检查是否为空，think.isEmpty({}) == true
        return this.fail(403, '用户名密码输入错误')
      } else {
        return this.success(data)
      }
    }
  }
  // 查询用户消息
  async usermsgAction() {
    this.indexAction()
    if (this.isGet()) {
      let model = this.model('user')
      let data = await model.userMsg()
      return this.success(data)
    }
  }
  // 修改用户信息
  async changepwdAction() {
    console.log(1111111111111111111111111111111111)
    await this.indexAction()
    if (this.isPost()) {
      let model = this.model('user')
      let data = await model.updateUser(this.post())
      if (think.isEmpty(data)) {
        return this.fail(500, '数据未改变')
      } else {
        return this.success('修改成功')
      }
    }
  }

}