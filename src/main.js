import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import VueSwal from 'vue-swal'
import moment from 'moment'
import VueLocalStorage from 'vue-localstorage'

window.axios = axios

Vue.config.productionTip = false

Vue.use(VueLocalStorage)

Vue.filter('formatDateTime', function(value) {
  if(value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
})

Vue.filter('formatDate', function(value) {
  if(value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
})

new Vue({
  vuetify,
  axios,
  router,
  VueSwal,
  render: h => h(App)
}).$mount('#app')
