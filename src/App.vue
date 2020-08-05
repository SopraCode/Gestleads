<template>
  <div id="app" class="container-fluid">
    <header-top class="row" id="header"></header-top>
    <div class="row">
      <connexion id="connexion"></connexion>
    </div>
    <div class="row">
      <Navbar class="col-12  col-md-3 col-lg-2" id="navbar"></Navbar>
      <div class="col-12 col-md-9 col-lg-10 px-5 pt-3" id="contenu">
        <router-view></router-view>
      </div>
    </div>
    

  </div>
</template>

<script>
import Navbar from './components/navbar/Navbar.vue'
import Header from './components/header/Header.vue'
import Connexion from './components/Connexion.vue'


export default {
  name: 'App',
  components: {
    Navbar,
    'header-top': Header,
    'connexion': Connexion,
  },
}
</script>

<style>

#app {

}
#navbar {
  margin-top: 75px;
  margin-left: 0px;
  margin-right: 0px;
  min-height: 100vh;
}
#header {
  position: fixed;
  height: 75px;
  z-index: 1;
  width: 100%;
}
#contenu {
  margin-top : 75px;
}

#connexion {
  margin-top : 75px;
}

@import './assets/variables.css';
@import './style.css';
</style>
