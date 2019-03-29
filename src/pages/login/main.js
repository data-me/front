import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import router from '../router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


axios.interceptors.response.use(
  response => {
    // do someting on response
    return response
  },
  error => {
    // do someting on errir
    return Promise.reject(error.response.data) // => gives me the server resonse
  }
)

Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueCookies)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
