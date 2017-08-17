import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from 'store'
import api from 'api'
import eventBus from './eventBus.js'
import ElementUI from 'element-ui'
import VueSimplemde from 'vue-simplemde'

import 'assets/style/media.query.css'
import 'assets/style/reset.css'
import 'assets/style/base.css'
import 'assets/style/common.css'
import 'assets/style/simple-flex.css'
import 'element-ui/lib/theme-default/index.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css' //样式文件
Vue.directive('highlight',function (el) {
  hljs.highlightBlock(el)
})

Vue.use(VueResource)
Vue.use(api, 'http://127.0.0.1:8360')
Vue.use(eventBus)
Vue.use(ElementUI)
Vue.use(VueSimplemde)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
