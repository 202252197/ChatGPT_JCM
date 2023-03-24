import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index'
import "./mock/index.js"
import { copyToClipboard } from '@/util/util'
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(ElementUI);

/**
 * 复制
 */

Vue.prototype.$copy = function (value,mes) {
  if (copyToClipboard(value)) {
    this.$message.success(mes)
  }
}

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')



