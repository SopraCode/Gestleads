import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isAuthentified: false,
    baseUrlApi: 'http://localhost:1337/',
  },

  mutations: {
    setUser(state, data) {
      state.user = data;
    },
    setIsAuthentified(state, bool) {
      state.isAuthentified = bool;
    }
  },

  actions: {
    getUser(context, obj) {
      let urlAuthentification = context.state.baseUrlApi + 'auth/local'
      Axios
      .post(urlAuthentification, {
        identifier: obj.login,
        password: obj.mdp,
      })
      .then(response => {
        console.log('Authentification réussi ;)');
        context.commit("setUser", response.data)
        context.commit("setIsAuthentified", true)
      })
      .catch(error => {
        console.log('Erreur de login mdp', error.response);
      })
    },
  },

  modules: {
  }
})
