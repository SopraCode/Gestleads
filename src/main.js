import Vue from 'vue'
import App from './App.vue'

// VueX
import store from './store'

// Bootstrap
import { BootstrapVue } from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'


// Vue Router
import VueRouter from 'vue-router'
import Routes from './Routes'

// AWESOME
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas, far);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  store,
  router: router
}).$mount('#app')
