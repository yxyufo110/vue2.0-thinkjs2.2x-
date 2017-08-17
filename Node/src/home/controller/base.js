'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
  indexAction() {
    // 解决跨域
    let method = this.http.method.toLowerCase();
    if(method === 'options'){
      this.setCorsHeader();
      this.end();
      return;
    }
    this.setCorsHeader()
  }
  setCorsHeader(){
    this.header('Access-Control-Allow-Origin', '*');
    this.header('Access-Control-Allow-Headers', 'x-requested-with,content-type'); // token
    this.header('Access-Control-Request-Method', 'GET,POST,PUT,DELETE');
    this.header('Access-Control-Allow-Credentials', 'true');
  }
}