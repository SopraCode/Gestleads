<template>
    <div id="contenu-projet">
        <!-- composant : choix du type de projet -->
        <div class="row">
            <div class="col-3">
                <router-link to="/projets/a_faire" exact class="nav-link px-1">
                    <badgeTypeProjet addStyle="background-color: #b83b5e;" typeDeProjet="A faire" rechercheReqEtat="a_faire" icone="tasks"></badgeTypeProjet>
                </router-link>
            </div>
            <div class="col-3">
                <router-link to="/projets/en_attente" exact class="nav-link px-1">
                    <badgeTypeProjet addStyle="background-color: #e97171;" typeDeProjet="En attente" rechercheReqEtat="en_attente" icone="clock"></badgeTypeProjet>
                </router-link>
            </div>
            <div class="col-3">
                <router-link to="/projets/a_relancer" exact class="nav-link px-1">
                    <badgeTypeProjet addStyle="background-color: #3fc1c9;" typeDeProjet="A relancer" rechercheReqEtat="a_relancer" icone="phone"></badgeTypeProjet>
                </router-link>
            </div>
            <div class="col-3">
                <router-link to="/projets/gagne" exact class="nav-link px-1">
                    <badgeTypeProjet addStyle="background-color: #318fb5;" typeDeProjet="Solder" rechercheReqEtat="perdu&etatprojet.etat=gagne" icone="folder-open"></badgeTypeProjet>
                </router-link>
            </div>
        </div>

        <!-- composant tableau  -->
        <div id="tableau" class="mx-1 my-3 p-3">
            <h1>Projets {{ $route.params.type }}</h1>

            <!-- Filtres -->
            <b-form-group
                label="Filtres :"
                label-for="filterInput"
            >
                <b-input-group >
                    <b-form-input
                    v-model="filter"
                    type="search"
                    id="filterInput"
                    placeholder="Recherche"
                    ></b-form-input>
                    <b-button :disabled="!filter" @click="filter = ''" class="ml-3" variant="outline-info">Clear</b-button>
                </b-input-group>
            </b-form-group>
            <b-list-group horizontal="md" class="mb-3 ">
                <b-list-group-item to="/projets/a_faire" active-class="faire">A faire</b-list-group-item>
                <b-list-group-item to="/projets/en_attente" active-class="attente">En attente</b-list-group-item>
                <b-list-group-item to="/projets/a_relancer" active-class="relancer">A relancer</b-list-group-item>
                <b-list-group-item to="/projets/gagne" active-class="gagne">Gagné</b-list-group-item>
                <b-list-group-item to="/projets/perdu" active-class="perdu">Perdu</b-list-group-item>
                <b-list-group-item to="/projets/" exact-active-class="tous">Tous</b-list-group-item>
            </b-list-group>

            <!-- Table -->
            <b-table striped hover responsive :items="items" :fields="enTete" :filter="filter">
                <template v-slot:cell(client)="data">
                    {{ data.item.client.Nom }}
                </template>
                <template v-slot:cell(Chiffre)="data">
                    {{ new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumSignificantDigits: 1 }).format(data.item.Chiffre) }}
                </template>
                <template v-slot:cell(DateDeRelance)="data">
                    {{ data.item.DateDeRelance | formatDate}}
                </template>
                <template v-slot:cell(type_daffaires)="data">
                    <div v-for="type in data.item.type_daffaires" :key="type.id">
                        {{ type.Domaine }}
                    </div>
                </template>
                <template v-slot:cell(created_at)="data">
                    {{ data.item.created_at | formatDate}}
                </template>
            </b-table>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import moment from 'moment'

import badgeTypeProjet from './badgeTypeProjet'

export default {
    name: 'Projets',
    components : {
        'badgeTypeProjet': badgeTypeProjet,
    },
    data() {
        return {
            items: [],
            enTete: [
                {
                    key: 'Nom',
                    sortable: true
                },
                {
                    key: 'client',
                    sortable: true
                },
                {
                    key: 'Priorite',
                    label: 'Priorité',
                    sortable: true,
                },
                {
                    key: 'Chiffre',
                    sortable: true
                },
                {
                    key: 'DateDeRelance',
                    label: 'Relance',
                    sortable: true
                },
                {
                    key: 'DescriptifDuProjet',
                    label: 'Descriptif',
                    sortable: true
                },
                {
                    key: 'created_at',
                    label: "Créé le",
                    sortable: true
                },
                {
                    key: 'type_daffaires',
                    label: 'Type d affaire',
                    sortable: true
                },
            ],
            filter: null,
        }
    },
    methods: {
        majProjets : function () {
            // type de projet en fonction de l'url
            let urlProjets
            if (this.$route.params.type) {
                urlProjets = this.$store.state.baseUrlApi + 'projets?etatprojet.etat=' + this.$route.params.type
            }
            else {
                urlProjets = this.$store.state.baseUrlApi+'projets'
            }
            console.log('url projet :' + urlProjets);
            // Récuperation restapi des projets
            axios
            .get(urlProjets, {
                headers: {
                    Authorization:
                    `Bearer ${this.$store.state.user.jwt}`,
                },
            })
            .then(reponse => {
                this.items = reponse.data
                console.log(reponse.data)
            })
            }
    },
    mounted() {
        this.majProjets();
    },
    watch: {
        '$route' (to, from) {
            // réagir au changement de route..
            console.log(to + from);
            this.majProjets()
        }
    },

    filters: {
        formatDate: function (value) {
            if (!value) return ''
                return moment(String(value)).format('DD/MM/YYYY')
        }
    }
}

</script>

<style scoped>
#tableau {
    background-color: #ffffff;
    border-radius: 3px;
}
.faire {
    background-color: #b83b5e;
    color: #ffffff;
}
.attente {
    background-color: #e97171;
    color: #ffffff;
}
.relancer {
    background-color: #3fc1c9;
    color: #ffffff;
}
.gagne {
    background-color: #0b8b0b;
    color: #ffffff;
}
.tous {
    background-color: #318fb5;
    color: #ffffff;
}
.perdu{
    background-color: #3c4472;
    color: #ffffff;
}
.faire:hover {
    opacity: 0.8;
}
.attente:hover {
    opacity: 0.8;
}
.relancer:hover {
    opacity: 0.8;
}
.gagne:hover {
    opacity: 0.8;
}
.tous:hover {
    opacity: 0.8;
}
.perdu:hover {
    opacity: 0.8;
}
@import '../../assets/variables.css';
</style>
