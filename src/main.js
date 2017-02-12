// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'

// Sync Vuex and Vue router 2
sync(store, router)

Vue.config.debug = true

// Validation
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

// Menu
import Navigation from './components/Navigation'

// Main application
import MainApp from './components/MainApp'

// Instance
new Vue({
  // Injection of instances to child components
  router,
  store,
  components: {
    'navigation': Navigation,
    'mainapp': MainApp
  },

  created: function () {
    store.dispatch('initApp')
  }
}).$mount('#app')
