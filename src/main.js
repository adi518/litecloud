// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Core
import Vue from 'vue'

// Components
import App from '@/App'

// Resources
import router from '@/router'
import { store } from '@/store/store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})

// Clear after module reload
// https://github.com/webpack/webpack-dev-server/issues/565
// window.addEventListener('message', e => {
//   if (process.env.NODE_ENV !== 'production') {
//     console.clear()
//   }
// })
