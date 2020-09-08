<template>
    <div id="contenu-client">
        <div id="tableau" class="mx-1 my-3 p-3">
            <div class="d-flex justify-content-between align-items-center">
                <div><h1>Clients</h1></div>
                <div class="ml-auto mr-3">
                    <b-button variant="outline-info" to="/client"><font-awesome-icon icon="plus-circle" size="lg"/> Ajouter</b-button>
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

            <!-- Table -->
            <b-table striped hover responsive :items="items" :fields="enTete" :filter="filter" ref="table">
                <template v-slot:cell(type_clients)="data">
                    <div v-for="type in data.item.type_clients" :key="type.id">
                        {{ type.Type}}
                    </div>
                </template>
                <template v-slot:cell(domaine_clients)="data">
                    <div v-for="domaine in data.item.domaine_clients" :key="domaine.id">
                        {{ domaine.domaine}}
                    </div>
                </template>
                <template v-slot:cell(lienModification)="data">
                    <div class="d-flex justify-content-left">
                        <b-button :to="data.item.lienModification" id="edit">
                            <font-awesome-icon icon="edit" />
                        </b-button>
                    </div>
                </template>
                <template v-slot:cell(id)="data">
                    <div class="d-flex justify-content-left">
                        <b-button id="delete" @click="supprimerClient(data)">
                            <font-awesome-icon icon="trash-alt" />
                        </b-button>
                    </div>
                </template>
            </b-table>
        </div>
       
    
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'Clients',

    data() {
        return {
            items: [],
            enTete: [
                {
                    key: 'Nom',
                    sortable: true
                },
                {
                    key: 'type_clients',
                    label: 'Type de client',
                },
                {
                    key: 'domaine_clients',
                    label: "Domaine d'activité",
                },
                {
                    key: 'lienModification',
                    label: 'Modification',
                },
                {
                    key: 'id',
                    label: 'Supprimer',
                },
            ],
            filter: null,
        }
    },

    methods: {
        majClients : function () {
            // type de projet en fonction de l'url
            let urlClients = this.$store.state.baseUrlApi+'clients'
            
            axios
            .get(urlClients, {
                headers: {
                    Authorization:
                    `Bearer ${this.$store.state.user.jwt}`,
                },
            })
            .then(reponse => {
                this.items = reponse.data
                this.ajouterLienModificationClient()
            })
        },
        ajouterLienModificationClient() {
            this.items.forEach(objClient => {
                objClient['lienModification'] = `/client/${objClient.id}`
            })
        },
        supprimerClient(objClient) {
            if (confirm(`Voulez-vous supprimer le projet "${objClient.item.Nom}" ?`)) {
                let urlRequete = `${this.$store.state.baseUrlApi}clients/${objClient.item.id}`
                axios
                .delete(urlRequete, {
                    headers: {
                        Authorization:
                        `Bearer ${this.$store.state.user.jwt}`,
                    },
                })
                .catch(error => console.log(error))
                .then(
                    setTimeout(this.majClients, 500),
                )
            }
        },
    },

    created () {
        this.majClients();
    },
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

@import '../../assets/variables.css';
</style>
