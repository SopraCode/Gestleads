<template>
    <div>
        <h1>Nouveau projet</h1>

        <b-form>
            <b-form-group
                id="input-group-nom"
                label="Nom du projet"
                label-for="input-nom"
            >
                <b-form-input
                    id="input-nom"
                    v-model="form.nom"
                    type="text"
                    :state="validationNomProjet"
                ></b-form-input>
                <b-form-invalid-feedback :state="validationNomProjet">
                    Nom de projet obligatoire, doit contenir au moins 4 caractères !!!
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
                id="input-group-client"
                label="Client"
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
                label="Descriptif du projet"
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

            <b-form-group
                id="input-group-etat"
                label="Etat du projet"
                label-for="input-etat"
            >
                <b-form-select
                    id="input-etat"
                    v-model="form.etatProjet"
                    :options="option.etatProjet"
                    value-field="id"
                    text-field="etat"
                ></b-form-select>
            </b-form-group>

            <b-form-group
                id="input-group-priorite"
                label="Priorité"
                label-for="input-priorite"
            >
                <b-form-select
                    id="input-priorite"
                    v-model="form.priorite"
                    :options="option.priorite"
                    value-field="priorite"
                    text-field="texte"
                ></b-form-select>
            </b-form-group>

            <b-form-group
                id="input-group-dateRelance"
                label="Date de relance"
                label-for="input-dateRelance"
            >
                <b-form-datepicker
                    id="input-dateRelance"
                    v-model="form.dateRelance"
                    locale="fr"
                    placeholder="Choisir une date"
                ></b-form-datepicker>
            </b-form-group>

            <!-- CHIFFRE -->
            <b-form-group
                id="input-group-chiffre"
                label="Total de l'offre en €"
                label-for="input-chiffre"
            >
                <b-form-input
                    id="input-chiffre"
                    v-model="form.chiffre"
                    type="number"
                ></b-form-input>
            </b-form-group>

            <!-- Marques -->
            <b-form-group
                id="input-group-marques"
                label="Marques"
                label-for="tags-marques"
            >  
                <b-form-tags 
                    input-id="tags-marques"
                    v-model="form.marques"
                    placeholder="Ajouter une marque"
                ></b-form-tags>
            </b-form-group>
            
            <!-- Type d'affaire -->

            <b-form-group label="Type d'affaire">
                <b-form-tags v-model="form.typeDaffaire" no-outer-focus>
                    <template v-slot="{ tags, disabled, addTag, removeTag }">
                    <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                        <li v-for="tag in tags" :key="tag" class="list-inline-item">
                        <b-form-tag
                            @remove="removeTag(tag)"
                            :title="tag"
                            :disabled="disabled"
                            variant="info"
                        >{{ tag }}</b-form-tag>
                        </li>
                    </ul>

                    <b-dropdown size="sm" variant="outline-secondary" block menu-class="w-100">
                        <template v-slot:button-content>
                            Choisir le type d'affaire
                        </template>
                        <b-dropdown-form @submit.stop.prevent="() => {}">
                        <b-form-group
                            label-for="tag-search-input"
                            label="Recherche de tag"
                            label-cols-md="auto"
                            class="mb-0"
                            label-size="sm"
                            :description="searchDesc"
                            :disabled="disabled"
                        >
                            <b-form-input
                            v-model="option.search"
                            id="tag-search-input"
                            type="search"
                            size="sm"
                            autocomplete="off"
                            ></b-form-input>
                        </b-form-group>
                        </b-dropdown-form>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item-button
                        v-for="option in availableOptions"
                        :key="option"
                        @click="affaireOptionTag({ option, addTag })"
                        >
                        {{ option }}
                        </b-dropdown-item-button>
                        <b-dropdown-text v-if="availableOptions.length === 0">
                        Type d'affaire introuvable
                        </b-dropdown-text>
                    </b-dropdown>
                    </template>
                </b-form-tags>
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
                priotité:'3',
                dateRelance: null,
                chiffre: null,
                numeroDoffre: '',
                numeroDeCommande: '',
                marques: null,
                typeDaffaire: [],
                commentaires: null,
                
            },
            option: {
                clients: {},
                etatProjet: [],
                priorite: [
                    {priorite: 1, texte: '1 - haute'},
                    {priorite: 2, texte: '2 - moyenne'},
                    {priorite: 3, texte: '3 - basse'},
                ],
                typeDaffaire: ['test1', 'test2'],
                search: ''
            },
            show: true,
        }
    },
    methods: {
        resetForm() {
            this.form.nom = ''
            this.form.client = ''
            this.form.descriptif = ''
            this.form.etatProjet = ''
            this.form.priorite = '3'
            this.form.dateRelance = null
            this.form.chiffre = null
            this.form.marques = null
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

            // clients
            let objClient = await this.findClient(this.form.client)
            if (objClient.length == 1) {
                this.form.client = [objClient[0].id]
            }
            else {
                if(confirm("Ce client n'existe pas, voulez-vous le créer ?")) {
                    alert('Création client')
                }
                traitementOk = false
            }

            // marques : capitalize + remettre en string
            let marques = this.form.marques.map(marque => marque.charAt(0).toUpperCase() + marque.slice(1))
            this.form.marques = marques.join(' / ')
        
            // Envoyer
            if(traitementOk) {this.envoyerForm()}
                
        },
        async envoyerForm() {
            // requete
            axios
            .post('http://localhost:1337/projets',
            {
              Nom: this.form.nom,
              client: this.form.client,
              DescriptifDuProjet: this.form.descriptif,
              etatprojet: this.form.etatProjet,
              Priorite: this.form.priorite,
              DateDeRelance: this.form.dateRelance,
              Chiffre: this.form.chiffre,
              Marques: this.form.marques,
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
            .catch(function (error) {
                // handle error
                console.log(error);
            })

        },
        affaireOptionTag({ option, addTag }) {
            addTag(option)
            this.search = ''
        }
    },
    created() {
        this.getDonnees('clients').then(clients => {
            this.option.clients = clients
        })
        this.getDonnees('etatprojets').then(etats => {
            this.option.etatProjet = etats
        })
        this.getDonnees('type-daffaires').then(types => {
            let listDomaine = []
            types.forEach(type => listDomaine.push(type.Domaine))
            this.option.typeDaffaire = listDomaine
            console.log(this.option.typeDaffaire);
        })
    },
    computed: {
        validationNomProjet() {
            return this.form.nom.length > 3 && this.form.nom.length < 50
        },
        criteria() {
            // Compute the search criteria
            return this.option.search.trim().toLowerCase()
        },
        availableOptions() {
            const criteria = this.criteria
            // Filter out already selected options
            const options = this.option.typeDaffaire.filter(opt => this.form.typeDaffaire.indexOf(opt) === -1)
            if (criteria) {
            // Show only options that match criteria
            return options.filter(opt => opt.toLowerCase().indexOf(criteria) > -1);
            }
            // Show all options available
            return options
        },
        searchDesc() {
            if (this.criteria && this.availableOptions.length === 0) {
            return 'There are no tags matching your search criteria'
            }
            return ''
        }
    }

}
</script>

<style>

</style>