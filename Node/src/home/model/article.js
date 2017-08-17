'use strict';
/**
 * model
 */
export default class extends think.model.mongo {
  addActicle(val) {
    val.timer = new Date()
    return this.add(val);
  }
  getAllActicle() {
    return this.select()
  }
  delActicle(val) {
    return this.where(val).delete()
  }
  editActicle(val) {
    val.timer = new Date()
    return this.where({ _id: val._id }).update(val)
  }
}