import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },

  mutations: {
    setUser(state, data) {
      state.user = data;
    }
  },

  actions: {
    getUser(context, obj) {
      console.log(obj.login);
      console.log(obj.mdp);
      Axios
      .post('http://localhost:1337/auth/local', {
        identifier: obj.login,
        password: obj.mdp,
      })
      .then(response => {
          // Handle success.
          console.log('Authentification réussi ;)');
          context.commit("setUser", response)
          
      })
      .catch(error => {
          // Handle error.
          console.log('Erreur de login mdp', error.response);
      })
    }
  },

  modules: {
  }
})
