<template>
    <div id="client">
        <h1 v-if="idModificationClient">Modification du client</h1>
        <h1 v-else>Nouveau client</h1>

        <b-form>
            <!-- Nom du client -->
            <b-form-group
                id="input-group-nom"
                label="Nom du client"
                label-for="input-nom"
            >
                <b-form-input
                    id="input-nom"
                    v-model="form.nom"
                    type="text"
                    :state="validationNomClient"
                ></b-form-input>
                <b-form-invalid-feedback :state="validationNomClient">
                    Nom du client obligatoire, doit contenir au moins 3 caractères !!!
                </b-form-invalid-feedback>
            </b-form-group>

            <!-- Type -->
            <b-form-group
                id="input-group-type"
                label="Type de client"
            >
                <b-form-checkbox-group
                v-model="form.type"
                :options="option.type"
                class="mb-3"
                value-field="id"
                text-field="Type"
                ></b-form-checkbox-group>
            </b-form-group>

            <!-- Domaine -->
            <b-form-group
                id="input-group-domaine"
                label="Domaine d'activité"
            >
                <b-form-checkbox-group
                v-model="form.domaine"
                :options="option.domaine"
                class="mb-3"
                value-field="id"
                text-field="domaine"
                ></b-form-checkbox-group>
            </b-form-group>


            <div class="mb-5">
                <b-button @click="traitementForm" variant="primary" class="m-1">Envoyer</b-button>
                <b-button @click="resetForm" variant="danger" class="m-1">Reset</b-button>
            </div>
        </b-form>
    </div>
</template>
    
    

<script>
import axios from 'axios'

export default {
    name: 'client',

    data () {
        return {
            form: {
                nom: '',
                type: [],
                domaine: [],
            },
            option: {
                type: [],
                domaine: [],
            },
            idModificationClient: null,

        }
    },
    methods: {
        resetForm() {
            this.form.nom = ''
            this.form.type = []
            this.form.domaine = []
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
            let traitementOk = true

            // // Vérifier si nom sup à 3 lettres + si existe déjà
            // if (this.form.etatProjet == "" && traitementOk) {
            //     alert("Merci de choisir un etat du projet, champ obligatoire")
            //     traitementOk = false
            // }

            // Envoyer
            if(traitementOk) {
                if (this.$route.params.id) {
                    // Si en mode modification de projet
                    try {
                        this.modifierForm()
                    } catch(error) {
                        console.log(error);
                        alert("Erreur lors de l'envoie du formulaire")
                    }
                } else {
                    try {
                        this.envoyerForm()
                    } catch(error) {
                        console.log(error);
                        alert("Erreur lors de l'envoie du formulaire")
                    }
                }
            }
            else {alert("Erreur de traitement du formulaire")}
                
        },
        async envoyerForm() {
            // requete
            axios
            .post(this.$store.state.baseUrlApi + 'clients',
            {
              Nom: this.form.nom,
              type_clients: this.form.type,
              domaine_clients: this.form.domaine,
            }
            , {
                headers: {
                    Authorization:
                    `Bearer ${this.$store.state.user.jwt}`,
                },
            })
            .then(
                this.$emit('formulaireEnvoyer', this.form.nom),
                this.resetForm(),
            )
            .catch(function (error) {
                console.log(error);
                alert("Erreur avec la BDD lors de l'envoi du formulaire")
            })
        },
        async modifierForm () {
            // requete
            axios
            .put(`${this.$store.state.baseUrlApi}clients/${this.idModificationClient}`,
            {
              Nom: this.form.nom,
              type_clients: this.form.type,
              domaine_clients: this.form.domaine,
            }
            , {
                headers: {
                    Authorization:
                    `Bearer ${this.$store.state.user.jwt}`,
                },
            })
            .then(
                console.log('Modification ok')
            )
            .catch(function (error) {
                console.log(error);
                alert("Erreur avec la BDD lors de l'envoi du formulaire")
            })
        },
        async chargementModifClient() {
            let objClient = await this.getDonnees(`clients/${this.idModificationClient}`)
            this.form.nom = objClient.Nom
            if (objClient.type_clients) {
                objClient.type_clients.forEach(type => {
                    this.form.type.push(type.id)
                })
            }
            if (objClient.domaine_clients) {
                objClient.domaine_clients.forEach(domaine => {
                    this.form.domaine.push(domaine.id)
                })
            }
            
        },  
    },
    created() {
        this.getDonnees('domaine-clients').then(domaines => {
            this.option.domaine = domaines
        })
        this.getDonnees('type-clients').then(types => {
            this.option.type = types
        })
        // Chargement modification d'un projet
        if (this.$route.params.id) {
            this.idModificationClient = this.$route.params.id
            this.chargementModifClient()
        }
        if (this.nomClient) {
            this.form.nom = this.nomClient
        }
        
    },
    computed: {
        validationNomClient() {
            return this.form.nom.length > 2 && this.form.nom.length < 50
        },
    },
    watch: {
        '$route' (to) {
            // réagir au changement de route sur un nouveau projet
            if (to.path == "/clients") {
                this.resetForm()
            }
            
        },
    },
    props: ['nomClient']
}
</script>

<style>
#client {
    background-color: #ffffff;
    border-radius: 3px;
}
</style>