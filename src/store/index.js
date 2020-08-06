import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isAuthentified: false,
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
      Axios
      .post('http://localhost:1337/auth/local', {
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
    }
  },

  modules: {
  }
})
