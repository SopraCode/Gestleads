import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      jwt: {},
      user: {username:''}
    },
    isAuthentified: false,
    baseUrlApi: 'https://frozen-brook-28380.herokuapp.com/',
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
      let urlAuthentification = context.state.baseUrlApi + 'auth/local/'
      Axios
      .post(urlAuthentification, {
        identifier: obj.login,
        password: obj.mdp,
      })
      .then(response => {
        console.log('Authentification réussi avec login + mdp ;)')
        context.commit("setUser", response.data)
        context.commit("setIsAuthentified", true)
        
      })
      .catch(error => {
        console.log('Erreur de login mdp', error.response),
        alert("Erreur de login ou mot de passe")
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
        context.commit("setIsAuthentified", true),
        context.commit("setUser", {
          jwt: obj.jwt,
          user: reponse.data
        })
      })
      .catch(error => {
        console.log('Erreur de JWT', {user:error.response});
      })
    },
    decoUser(context) {
      context.commit("setIsAuthentified", false),
      context.commit("setUser", {
        jwt: null,
        user: {
          jwt: null,
          user: {username:''}
        },
      })
      localStorage.jwt = null
    }
  },

  modules: {
    
  }
})
