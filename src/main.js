import Vue from 'vue'
import App from './App.vue'

// VueX
import store from './store'

// Bootstrap
import { BootstrapVue } from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

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
  // mode: 'history'
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/connexion'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.state.isAuthentified;

  if (authRequired && !loggedIn) {
    return next('/connexion');
  }

  next();
})

new Vue({
  render: h => h(App),
  store,
  router: router
}).$mount('#app')
