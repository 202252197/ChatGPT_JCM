import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index'
import { copyToClipboard } from '@/util/util'
import i18n from '@/config/i18n'
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
  i18n,
  router,
  render: h => h(App),
}).$mount('#app')



