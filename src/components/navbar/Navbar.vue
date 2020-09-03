<template>
<div id="navbar">
    <ul class="nav flex-column mt-5">

        <li><router-link to="/" exact class="nav-link"><font-awesome-icon icon="home" size="lg"/><span class="ml-2">Dashboard</span></router-link></li>

        <li><router-link to="/projet" exact class="nav-link"><font-awesome-icon icon="code" size="lg"/><span class="ml-2">Nouveau projet</span></router-link></li>

        <li><router-link to="/projets" exact class="nav-link"><font-awesome-icon icon="tasks" size="lg"/><span class="ml-2">Projets</span></router-link></li>

        <li class="nav-link"> <a href="">tretterte</a></li>

        <li class="nav-link"> <a href="">tretterte</a></li>

        <li class="nav-link"> <a href="">tretterte</a></li>
    </ul>
</div>
</template>

<script>
export default {
  name: 'Navbar',
  
}
</script>

<style>
#navbar {
  background-color: var(--dark-color);
  /* color: #f5f5f5; */
  
}
#navbar a {
  color: var(--light-color);
}
#navbar a:hover {
  color: var(--dark-color);
  background: var(--light-color);
  border-radius: 20px 20px 20px 20px;
}

</style>