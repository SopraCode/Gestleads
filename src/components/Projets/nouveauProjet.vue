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
                ></b-form-input>
                <datalist id="listClient">
                    <option v-for="client in option.clients" :key="client.id">{{ client.Nom }}</option>
                </datalist>
            </b-form-group>

            <b-button type="submit" variant="primary" class="m-1">Envoyer</b-button>
            <b-button type="reset" variant="danger" class="m-1">Reset</b-button>
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
                clients: ['client1', 'client2'],
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
            },
            show: true,
        }
    },
    methods: {
        envoyerForm(evt) {
            evt.preventDefault()
            alert(JSON.stringify(this.form))

            // requete
            axios
            .post('http://localhost:1337/projets',
            {
              Nom: 'testCreation'  
            }
            , {
                headers: {
                    Authorization:
                    `Bearer ${this.$store.state.user.jwt}`,
                },
            })
        },
        resetForm(evt) {
            evt.preventDefault()
            this.form.nom = ''
        },
        getDonnees : function (requete) {
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
    },
    created() {
        this.getDonnees('clients').then(data => {
            this.option.clients = data
        })
    }

}
</script>

<style>

</style>