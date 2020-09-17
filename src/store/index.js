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
      localStorage.user = data.user.email
      localStorage.jwt = data.jwt
    },
    setIsAuthentified(state, bool) {
      state.isAuthentified = bool;
    }
  },

  actions: {
    getUserAuth(context, obj) {
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
    getUserMe(context, obj) {
      const urlAuthentification = context.state.baseUrlApi + 'users/me'
      Axios
      .get(urlAuthentification, {
        headers: {
          Authorization:
          `Bearer ${obj.jwt}`,
        },
      })
      .then(reponse => {
        console.log(reponse.data),
        context.commit("setUser", reponse.data),
        context.commit("setIsAuthentified", true)
      })
      .catch(error => {
        console.log('Erreur de JWT', error.response);
      })
    },
  },

  modules: {
  }
})
