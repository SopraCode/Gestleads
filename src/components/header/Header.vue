<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light" id="navbar_header">

  <img class="navbar-brand ml-4" id="logo" :src="require('../../assets/logo.png')">

  <div class="ml-auto d-flex">
    <form class="form-inline mr-4">
      <input class="form-control mr-sm-2" type="search" placeholder="Recherche" aria-label="Search">
    </form>

    <div class="navbar" >
      <ul class="navbar-nav pr-5">
        <li class="nav-item">
          <a class="nav-link" href="#"><span class="mr-3">{{ userName || '' }}</span><font-awesome-icon icon="user" size="lg"/></a>
        </li>
      </ul>
    </div>

  </div>


</nav>
</template>

<script>
export default {
  name: 'Header',

  data() {
    return {
      nomDutilisateur: null,
    }
  },

  computed: {
    userName() {
      if (this.$store.state.user.user.username) {return this.$store.state.user.user.username}
      else {return ''}
    }
  }
  
}
</script>

<style scoped>
#header {
  background: #f0f5f9;
  
  -webkit-box-shadow: 0px 1px 5px 0px rgba(50, 50, 50, 0.35);
  -moz-box-shadow:    0px 1px 5px 0px rgba(50, 50, 50, 0.35);
  box-shadow:         0px 1px 5px 0px rgba(50, 50, 50, 0.35);
}
#logo {
  height: 75px;
}

</style>
