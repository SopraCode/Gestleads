<template>
<div>
    <!-- composant : badge types projets -->
        <div class="row">
            <div class="col-3">
                <router-link to="/projets/a_faire" exact class="nav-link px-1">
                    <composantBadge addStyle="background-color: #b83b5e;" typeDeProjet="A faire" nombreProjets="a_faire" icone="tasks"></composantBadge>
                </router-link>
            </div>
            <div class="col-3">
                <router-link to="/projets/en_attente" exact class="nav-link px-1">
                    <composantBadge addStyle="background-color: #e97171;" typeDeProjet="En attente" nombreProjets="en_attente" icone="clock"></composantBadge>
                </router-link>
            </div>
            <div class="col-3">
                <router-link to="/projets/a_relancer" exact class="nav-link px-1">
                    <composantBadge addStyle="background-color: #3fc1c9;" typeDeProjet="A relancer" nombreProjets="a_relancer" icone="phone"></composantBadge>
                </router-link>
            </div>
            <div class="col-3">
                <router-link to="/projets/gagne" exact class="nav-link px-1">
                    <composantBadge addStyle="background-color: #318fb5;" typeDeProjet="Gagné" nombreProjets="gagne" icone="folder-open"></composantBadge>
                </router-link>
            </div>
            <div class="col-3">
                <router-link to="/projets/perdu" exact class="nav-link px-1">
                    <composantBadge addStyle="background-color: #318fb5;" typeDeProjet="Perdu" nombreProjets="perdu" icone="folder"></composantBadge>
                </router-link>
            </div>
        </div>
</div>
</template>

<script>

import composantBadge from './composantbadgeEtatProjets'

export default {
    name: 'badgeEtatProjet',
    components : {
        composantBadge
    },

    data() {
        return {
        }
    },
    methods: {

    },
  
}
</script>

<style>


</style>