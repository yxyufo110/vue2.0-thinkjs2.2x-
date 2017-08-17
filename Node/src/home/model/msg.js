'use strict';
/**
 * model
 */
export default class extends think.model.mongo {
  leaveMsg(val) {
    val.timer = new Date()
    return this.add(val);
  }
  getAllMsg() {
    return this.select()
  }
  delMsg(val) {
    return this.where(val).delete()
  }
}