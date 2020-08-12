<template>
    <div id="contenu-projet">

        <!-- composant : choix du type de projet -->
        <div class="row">
            <div class="col-3">
                <router-link to="/projets" exact class="nav-link px-1">
                    <badgeTypeProjet addStyle="background-color: #b83b5e;" typeDeProjet="A faire" rechercheReqEtat="a_faire" icone="tasks"></badgeTypeProjet>
                </router-link>
            </div>
            <div class="col-3">
                <router-link to="/projets" exact class="nav-link px-1">
                    <badgeTypeProjet addStyle="background-color: #e97171;" typeDeProjet="En attente" rechercheReqEtat="en_attente" icone="clock"></badgeTypeProjet>
                </router-link>
            </div>
            <div class="col-3">
                <router-link to="/projets" exact class="nav-link px-1">
                    <badgeTypeProjet addStyle="background-color: #3fc1c9;" typeDeProjet="A relancer" rechercheReqEtat="a_relancer" icone="phone"></badgeTypeProjet>
                </router-link>
            </div>
            <div class="col-3">
                <router-link to="/projets" exact class="nav-link px-1">
                    <badgeTypeProjet addStyle="background-color: #318fb5;" typeDeProjet="Solder" rechercheReqEtat="solder" icone="folder-open"></badgeTypeProjet>
                </router-link>
            </div>
        </div>

        <!-- composant tableau  -->

        <div id="tableau" class="row mx-1 my-3 p-3">
            <h1>Tableau</h1>
            <div>
                <table>
                    <thead>
                    <tr>
                        <th v-for="projet in projets" :key="projet.id">
                            {{ projet.id }}
                        </th>
                        <!-- <th v-for="key in columns"
                        @click="sortBy(key)"
                        :class="{ active: sortKey == key }">
                        {{ key | capitalize }}
                        <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
                        </span>
                        </th> -->
                    </tr>
                    </thead>
                    <tbody>
                    <!-- <tr v-for="entry in filteredHeroes">
                        <td v-for="key in columns">
                        {{entry[key]}}
                        </td>
                    </tr> -->
                    </tbody>
                </table>
                <br>
                <p>{{ projets }}</p>


            </div>
        </div>
        </div>
    

</template>

<script>

import axios from 'axios'

import badgeTypeProjet from './badgeTypeProjet'

export default {
    name: 'Projets',
    components : {
        'badgeTypeProjet': badgeTypeProjet,
    },
    data() {
        return {
            projets: []
        }
    },
    methods: {
      
    },
    mounted() {
        axios
        .get(this.$store.state.baseUrlApi+'projets', {
            headers: {
                Authorization:
                `Bearer ${this.$store.state.user.jwt}`,
            },
        })
        .then(reponse => {
            this.projets = reponse.data
        })
    },
    
}

</script>

<style scoped>
#tableau {
    background-color: #ffffff;
    border-radius: 3px;
}
@import '../../assets/variables.css';
</style>
