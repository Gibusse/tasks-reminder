import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import VueSwal from 'vue-swal'

window.axios = axios
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  VueSwal,
  render: h => h(App)
}).$mount('#app')
