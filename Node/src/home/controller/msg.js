'use strict';

import Base from './base.js';

export default class extends Base {
  async leaveAction() {
    this.indexAction()
    if (this.isPost()) {
      let model = this.model('msg')
      let data = await model.leaveMsg(this.post())
      if (think.isEmpty(data)) {
        return this.fail(403, '留言失败')
      } else {
        return this.success('留言成功')
      }
    }
  }

  async getallAction() {
    this.indexAction()
    if (this.isGet()) {
      let model = this.model('msg')
      let data = await model.getAllMsg()
      if (think.isEmpty(data)) {
        return this.fail(404, '获取失败')
      } else {
        return this.success(data)
      }
    }
  }

  //删除留言
  async deleteAction() {
    this.indexAction()
    if (this.isPost()) {
      let model = this.model('msg')
      let data = await model.delMsg(this.post())
      if (think.isEmpty(data)) {
        return this.fail(403, '删除失败，找不到该数据')
      } else {
        let elsData = await model.getAllMsg()
        return this.success(elsData)
      }
    }
  }
}