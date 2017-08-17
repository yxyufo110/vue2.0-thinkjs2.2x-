/*
事件总线，作为Vue插件安装
 */
const eventBus = {}

eventBus.install = function (Vue) {
  Vue.prototype.$bus = new Vue()
}

export default eventBus
