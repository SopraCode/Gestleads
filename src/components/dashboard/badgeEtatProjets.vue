<template>
<div>
    <!-- composant : badge types projets -->
        <div class="row">
            {{ prop }}
            <div class="col-3">
                <router-link to="/projets/a_faire" exact class="nav-link px-1">
                    <composantBadge addStyle="background-color: #b83b5e;" typeDeProjet="A faire" :nombreProjets="nombreEtatProjet.a_faire" icone="tasks"></composantBadge>
                </router-link>
            </div>
            <div class="col-3">
                <router-link to="/projets/en_attente" exact class="nav-link px-1">
                    <composantBadge addStyle="background-color: #e97171;" typeDeProjet="En attente" :nombreProjets="nombreEtatProjet.en_attente" icone="clock"></composantBadge>
                </router-link>
            </div>
            <div class="col-3">
                <router-link to="/projets/a_relancer" exact class="nav-link px-1">
                    <composantBadge addStyle="background-color: #3fc1c9;" typeDeProjet="A relancer" :nombreProjets="nombreEtatProjet.a_relancer" icone="phone"></composantBadge>
                </router-link>
            </div>
            <div class="col-3">
                <router-link to="/projets/gagne" exact class="nav-link px-1">
                    <composantBadge addStyle="background-color: #318fb5;" typeDeProjet="Solder" :nombreProjets="nombreEtatProjet.perdu + nombreEtatProjet.gagne" icone="folder-open"></composantBadge>
                </router-link>
            </div>
        </div>
  


</div>
</template>

<script>
import axios from 'axios'

import composantBadge from './composantbadgeEtatProjets'

export default {
    name: 'badgeEtatProjet',
    components : {
        composantBadge
    },

    data() {
        return {
            nombreEtatProjet: {
                'a_faire' : 0,
                'en_attente' : 0,
                'a_relancer' : 0,
                'gagne' : 0,
                'perdu' : 0,
            },
        }
    },
    methods: {
        reqNombreProjets() {
            const typesProjet = ['a_faire', 'en_attente', 'a_relancer', 'gagne', 'perdu']
            for (let type of typesProjet) {
                // constitution de l'url pour la requete
                const countEtatProjetUrl = `${this.$store.state.baseUrlApi}projets/count?etatprojet.etat=${type}`
                axios
                .get(countEtatProjetUrl, {
                    headers: {
                        Authorization:
                        `Bearer ${this.$store.state.user.jwt}`,
                    },
                })
                .then(reponse => {
                    this.nombreEtatProjet[type] = reponse.data
                })
            }

        },

        },
    beforeCreated () {
        this.reqNombreProjets();
        this.$emit('etatProjet', this.nombreEtatProjet)
    },
    props: ['prop']
  
}
</script>

<style>


</style>