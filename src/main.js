import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import VueSwal from 'vue-swal'
import moment from 'moment'

window.axios = axios
Vue.config.productionTip = false
Vue.filter('formatDate', function(value) {
  if(value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
})

new Vue({
  vuetify,
  router,
  VueSwal,
  render: h => h(App)
}).$mount('#app')
