'use strict';

import Base from './base.js';

export default class extends Base {
  /**
 * index action
 * @return {Promise} []
 */

__call() {
  console.log(think.locale('ACTION_INVALID', this.http.action, this.http.url))
   return this.fail(think.locale('ACTION_INVALID', this.http.action, this.http.url));
}

  // 添加文章
  async addAction() {
    this.indexAction()
    if (this.isPost()) {
      let model = this.model('article')
      let data = await model.addActicle(this.post())
      if (think.isEmpty(data)) {
        return this.fail(500, '添加失败')
      } else {
        let elsData = await model.getAllActicle()
        return this.success(elsData)
      }
    }
  }
  // 获取文章列表
  async getallAction() {
    this.indexAction()
    if (this.isGet()) {
      let model = this.model('article')
      let data = await model.getAllActicle()
      return this.success(data)
    }
  }
  //删除文章
   async deleteAction() {
    this.indexAction()
    if (this.isPost()) {
      let model = this.model('article')
      let data =  await model.delActicle(this.post())
      if (think.isEmpty(data)) {
        return this.fail(403, '删除失败，找不到该数据')
      } else {
        let elsData = await model.getAllActicle()
        return this.success(elsData)
      }
    }
  }
  // 修改文章
    // 添加文章
  async editAction() {
    this.indexAction()
    if (this.isPost()) {
      let model = this.model('article')
      let data = await model.editActicle(this.post())
      if (think.isEmpty(data)) {
        return this.fail(500, '修改失败')
      } else {
        let elsData = await model.getAllActicle()
        return this.success(elsData)
      }
    }
  }
}