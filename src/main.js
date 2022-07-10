import Vue from 'vue'
import App from './App.vue'
import router from '@/router'

import '@/assets/mobile/flexible'
import '@/assets/styles/reset.css'

Vue.config.productionTip = false

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

new Vue({ router, render: (h) => h(App) }).$mount('#app')
