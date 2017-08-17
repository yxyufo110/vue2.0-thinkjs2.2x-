'use strict';
/**
 * model
 */
export default class extends think.model.mongo {
  login (userMsg) {
    return this.where(userMsg).find()
  }
  userMsg () {
    return this.select()
  }
  updateUser (data) {
    return this.where({userName: data.userName}).update({pwd: data.pwd,title: data.title,desc: data.desc});
  }
}