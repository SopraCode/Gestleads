<template>
    <div id="contenu-projet">

        <!-- composant tableau  -->
        <div id="tableau" class="mx-1 my-3 p-3">
            <div class="d-flex justify-content-between align-items-center">
                <div><h1>Projets</h1></div>
                <div class="ml-auto mr-3">
                    <b-button variant="outline-info" to="/projet"><font-awesome-icon icon="plus-circle" size="lg"/> Ajouter</b-button>
                    <!-- <b-button variant="outline-info" v-b-modal.modal-1><font-awesome-icon icon="plus-circle" size="lg"/> Ajouter en modal</b-button> -->
                </div>
            </div>
            

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
                <b-list-group-item class="d-flex justify-content-between align-items-center" to="/projets/" exact-active-class="tous">
                    Tous
                </b-list-group-item>
                <b-list-group-item to="/projets/a_faire" active-class="faire" class="d-flex justify-content-between align-items-center">
                    A faire
                    <b-badge variant="info" pill>{{ nombreTypeProjet['a_faire'] }}</b-badge>
                </b-list-group-item>
                <b-list-group-item to="/projets/en_attente" active-class="attente" class="d-flex justify-content-between align-items-center">
                    En attente
                    <b-badge variant="info" pill>{{ nombreTypeProjet['en_attente'] }}</b-badge>
                </b-list-group-item>
                <b-list-group-item to="/projets/a_relancer" active-class="relancer" class="d-flex justify-content-between align-items-center">
                    A relancer
                    <b-badge variant="info" pill>{{ nombreTypeProjet['a_relancer'] }}</b-badge>
                </b-list-group-item>
                <b-list-group-item to="/projets/gagne" active-class="gagne" class="d-flex justify-content-between align-items-center">
                    Gagné
                    <b-badge variant="info" pill>{{ nombreTypeProjet['gagne'] }}</b-badge>
                </b-list-group-item>
                <b-list-group-item to="/projets/perdu" active-class="perdu" class="d-flex justify-content-between align-items-center">
                    Perdu
                    <b-badge variant="info" pill>{{ nombreTypeProjet['perdu'] }}</b-badge>
                </b-list-group-item>
            </b-list-group>

            <!-- Table -->
            <b-table striped hover responsive :items="items" :fields="enTete" :filter="filter" ref="table" :tbody-tr-class="rowClass">
                <template v-slot:cell(client)="data">
                    <div v-if="data.item.client">{{ data.item.client.Nom }}</div>
                </template>
                <template v-slot:cell(Chiffre)="data">
                    {{ new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(data.item.Chiffre) }}
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
                <template v-slot:cell(lienModification)="data">
                    <div class="d-flex justify-content-center">
                        <b-button :to="data.item.lienModification" id="edit">
                            <font-awesome-icon icon="edit" />
                        </b-button>
                    </div>
                </template>
                <template v-slot:cell(id)="data">
                    <div class="d-flex justify-content-center">
                        <b-button id="delete" @click="supprimerProjet(data)">
                            <font-awesome-icon icon="trash-alt" />
                        </b-button>
                    </div>
                </template>
                
                
            </b-table>
        </div>
        <b-modal id="modal-1" title="Projet" hide-footer>
            <nouveauProjet />
        </b-modal>
    </div>
</template>

<script>

import axios from 'axios'
import moment from 'moment'

import nouveauProjet from './projet'

export default {
    name: 'Projets',

    components : {
        'nouveauProjet': nouveauProjet,
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
                    label: 'Prio',
                    sortable: true,
                },
                {
                    key: 'Chiffre',
                    sortable: true
                },
                {
                    key: 'DateDeRelance',
                    label: 'Relance',
                    sortable: true,
                },
                // {
                //     key: 'DescriptifDuProjet',
                //     label: 'Descriptif',
                //     sortable: true
                // },
                {
                    key: 'created_at',
                    label: "Créé le",
                    sortable: true
                },
                {
                    key: 'type_daffaires',
                    label: "Type d'affaire",
                    sortable: true
                },
                {
                    key: 'etatprojet.etatNonSlug',
                    label: 'Etat',
                    sortable: true
                },
                {
                    key: 'lienModification',
                    label: 'Modif.',
                },
                {
                    key: 'id',
                    label: 'Sup.',
                },

                
            ],
            filter: null,
            nombreTypeProjet: {
                'a_faire' : 0,
                'en_attente' : 0,
                'a_relancer' : 0,
                'gagne' : 0,
                'perdu' : 0,
            },
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
                this.ajouterLienModificationProjet()
                this.reqNombreProjets()
            })
        },
        reqNombreProjets : function() {
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
                    this.nombreTypeProjet[type] = reponse.data
                })
            }
        },
        ajouterLienModificationProjet() {
            this.items.forEach(objProjet => {
                objProjet['lienModification'] = `/projet/${objProjet.id}`
            })
        },
        supprimerProjet(objProjet) {
            if (confirm(`Voulez-vous supprimer le projet "${objProjet.item.Nom}" ?`)) {
                let urlRequete = `${this.$store.state.baseUrlApi}projets/${objProjet.item.id}`
                axios
                .delete(urlRequete, {
                    headers: {
                        Authorization:
                        `Bearer ${this.$store.state.user.jwt}`,
                    },
                })
                .catch(error => console.log(error))
                .then(
                    setTimeout(this.majProjets, 500),
                )
            }
        },
        maj() {
            this.majProjets()
        },
        rowClass(item, type) {
            if (!item || type !== 'row') return
            const aujourdui = moment().format("YYYY-MM-DD")
            if (moment(item.DateDeRelance).isBefore(aujourdui)) {
                return 'table-danger'
            }
        }
    },

    created () {
        this.majProjets();
    },
    
    watch: {
        '$route' (to, from) {
            // réagir au changement de route..
            console.log(to + from);
            this.majProjets()
        },
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
#edit {
    background-color: #318fb5;
    justify-content: center;
}
#delete {
    background-color: #b83b5e;
    justify-content: center;
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
