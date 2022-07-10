import Vue from 'vue'
import App from './App.vue'

import '@/assets/styles/reset.css'
import '@/assets/mobile/flexible.js'

Vue.config.productionTip = false

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

import router from './router/index'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
