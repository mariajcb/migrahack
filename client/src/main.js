import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import moment from 'moment'

Vue.config.productionTip = false
Vue.prototype.moment = moment

new Vue({
  router,
  store,
  vuetify,
  moment,
  render: h => h(App)
}).$mount('#app')
