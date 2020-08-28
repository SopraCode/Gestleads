<template>
    <div>
        <h1>Nouveau projet</h1>

        <b-form @submit="envoyerForm" @reset="resetForm" v-if="show">
            <b-form-group
                id="input-group-nom"
                label="Nom du projet:"
                label-for="input-nom"
            >
                <b-form-input
                    id="input-nom"
                    v-model="form.nom"
                    type="text"
                ></b-form-input>
            </b-form-group>
            <b-form-group
                id="input-group-client"
                label="Client:"
                label-for="input-client"
            >
                <b-form-input
                    id="input-client"
                    list="listClient"
                    v-model="form.client"
                ></b-form-input>
                <datalist id="listClient">
                    <option v-for="client in option.clients" :key="client.id">{{ client.Nom }}</option>
                </datalist>
            </b-form-group>
            <b-form-group
                id="input-group-descriptif"
                label="Descriptif du projet:"
                label-for="input-nom"
            >
                <b-form-textarea
                    id="input-descriptif"
                    v-model="form.descriptif"
                    placeholder="Bla bla bla ..."
                    rows="3"
                    max-rows="6"
                ></b-form-textarea>
            </b-form-group>

            <b-button @click="traitementForm" variant="primary" class="m-1">Envoyer</b-button>
            <b-button @click="resetForm" variant="danger" class="m-1">Reset</b-button>
        </b-form>
    </div>
</template>
    
    

<script>
import axios from 'axios'


export default {
    name: 'nouveauProjet',

    data () {
        return {
            form: {
                nom: '',
                client: '',
                descriptif: '',
                etatProjet: '',
                priotité:'1',
                dateDeRelance: null,
                chiffre: '',
                numeroDoffre: '',
                numeroDeCommande: '',
                commentaires: null,
                marques: null,
                typeDaffaire: null,
            },
            option: {
                clients: {},
                etatProjet: {}
            },
            show: true,
        }
    },
    methods: {
        resetForm() {
            this.form.nom = ''
            this.form.client = ''
            this.form.descriptif = ''
        },
        getDonnees(requete) {
            let urlRequete = this.$store.state.baseUrlApi + requete

            return axios
            .get(urlRequete, {
                headers: {
                    Authorization:
                    `Bearer ${this.$store.state.user.jwt}`,
                },
            })
            .then(reponse => {
                return reponse.data
            })
        },
        findClient(nomClient) {
            return this.getDonnees('clients?Nom=' + nomClient).then(data => {
                return data
            })
        },
        async traitementForm() {
            // clients
            let cli = await this.findClient(this.form.client)
            this.form.client = [cli[0].id]
            
            // Envoyer
            this.envoyerForm()
        },
        async envoyerForm() {
            // requete
            axios
            .post('http://localhost:1337/projets',
            {
              Nom: this.form.nom,
              client: this.form.client,
              DescriptifDuProjet: this.form.descriptif,
            }
            , {
                headers: {
                    Authorization:
                    `Bearer ${this.$store.state.user.jwt}`,
                },
            })
            .then(
                this.resetForm()
            )

        },
    },
    created() {
        this.getDonnees('clients').then(data => {
            this.option.clients = data
        })
        // this.getDonnees('clients').then(data => {
        //     this.option.clients = data
        // })
    }

}
</script>

<style>

</style>