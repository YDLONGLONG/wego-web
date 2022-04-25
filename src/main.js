import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './assets/base.css'
//element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
let BASE_URL = 'http://localhost:3000'
Vue.prototype.$apiServer = BASE_URL
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
