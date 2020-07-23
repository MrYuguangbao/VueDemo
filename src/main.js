// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import JsonEditor from 'vue-json-ui-editor'
import axios from 'axios'
// eslint-disable-next-line standard/object-curly-even-spacing
import {get, post, del, put } from './libs/request'

Vue.config.productionTip = false
Vue.use(echarts)
Vue.use(ElementUI)
Vue.use(JsonEditor)

Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$del = del
Vue.prototype.$put = put
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
