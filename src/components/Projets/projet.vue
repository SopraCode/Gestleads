<template>
    <div>
    <div id="projet" class="p-3">
        <h1 v-if="idModificationProjet">Modification du projet</h1>
        <h1 v-else>Nouveau projet</h1>

        <b-form>
            <!-- Nom du projet -->
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

            <!-- Client -->
            <b-form-group
                id="input-group-client"
                label="Client"
                label-for="input-client"
            >
                <b-form-input
                    id="input-client"
                    list="listClient"
                    v-model="form.clientSansTraitement"
                    :state="validationClient"
                ></b-form-input>
                <b-form-invalid-feedback :state="validationClient">
                    Merci de choisir un client !!!
                </b-form-invalid-feedback>
                <datalist id="listClient">
                    <option v-for="client in option.clients" :key="client.id">{{ client.Nom }}</option>
                </datalist>
            </b-form-group>

            <!-- Interlocuteur -->
            <b-form-group
                id="input-group-interlocuteur"
                label="Interlocuteur"
                label-for="input-interlocuteur"
            >
                <b-form-input
                    id="input-interlocuteur"
                    v-model="form.interlocuteur"
                    placeholder="Jean Cérien"
                ></b-form-input>
            </b-form-group>

            <!-- Descriptif -->
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

            <!-- Etat -->
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
                    text-field="etatNonSlug"
                    :state="validationEtat"
                ></b-form-select>
                <b-form-invalid-feedback :state="validationEtat">
                    Etat de projet obligatoire !!!
                </b-form-invalid-feedback>
            </b-form-group>
            
            <!-- Priorité -->
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

            <!-- Date de relance -->
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

            <!-- Chiffre -->
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

            <!-- Marge -->
            <b-form-group
                id="input-group-marge"
                label="Marge de l'affaire"
                label-for="input-marge"
            >
                <b-form-input
                    id="input-marge"
                    v-model="form.marge"
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
                    v-model="form.marquesSansTraitement"
                    placeholder="Ajouter une marque"
                ></b-form-tags>
            </b-form-group>
            
            <!-- Type d'affaire -->
            <b-form-group label="Type d'affaire">
                <b-form-tags v-model="form.typeDaffaireSansTraitement" no-outer-focus>
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
                            label="Recherche"
                            label-cols-md="auto"
                            class="mb-0"
                            label-size="sm"
                            :description="searchDescTypeAffaire"
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
                        v-for="option in availableOptionsTypeAffaire"
                        :key="option"
                        @click="affaireOptionTag({ option, addTag })"
                        >
                        {{ option }}
                        </b-dropdown-item-button>
                        <b-dropdown-text v-if="availableOptionsTypeAffaire.length === 0">
                        Type d'affaire introuvable
                        </b-dropdown-text>
                    </b-dropdown>
                    </template>
                </b-form-tags>
            </b-form-group>

            <!-- Marché -->
            <b-form-group
                id="input-group-marche"
                label="Marché"
                label-for="checkbox-marche"
            >  
                <b-form-checkbox
                    id="checkbox-marche"
                    v-model="form.marche"
                    name="checkbox-marche"
                    value="true"
                    unchecked-value="false"
                ></b-form-checkbox>
            </b-form-group>

            <!-- Collaboration -->
            <b-form-group
                id="input-group-collaboration"
                label="Collaborateur sur le projet"
                label-for="input-collaboration"
            >
                <b-form-checkbox-group
                    id="input-collaboration"
                    v-model="form.usersIDcollaboration"
                    :options="option.collaboration"
                    value-field="id"
                    text-field="username"
                ></b-form-checkbox-group>
            </b-form-group>


            <div class="mb-5">
                <b-alert
                    class="mb-3"
                    :show="popup.compteurPopup"
                    dismissible
                    fade
                    variant="success"
                    @dismiss-count-down="initCompteurPopup"
                >
                    Le projet "{{ popup.nomProjet }}" est bien enregistré ;)
                </b-alert>
                <b-button @click="traitementForm" variant="primary" class="m-1">Envoyer</b-button>
                <b-button @click="resetForm" variant="danger" class="m-1">Reset</b-button>
                
            </div>

            <div v-if="idModificationProjet">
                <h3>Commentaires</h3>

                <!-- Commentaires -->
                <div id="commentaires" v-if="form.commentaires">
                    <b-card footer-tag="footer" v-for="commentaire in form.commentaires" :key="commentaire.id" class="mb-3">
                        <b-media>
                            <template v-slot:aside>
                                <b-avatar size="4em"></b-avatar>
                            </template>
                            <p>{{ commentaire.Commentaire }}</p>
                        </b-media>
                        <template v-slot:footer>
                            <em>Par {{ commentaire.user.username }} le {{ commentaire.created_at | formatDate }}</em>
                        </template>
                    </b-card>
                </div>
                

                <!-- Nouveau commentaire -->
                <b-form-group
                    id="input-group-commentaire"
                    label="Nouveau commentaire"
                    label-for="input-commentaire"
                >
                    <b-form-textarea
                        id="input-commentaire"
                        v-model="form.nouveauCommentaire"
                        placeholder="Ajouter un commentaire ..."
                        rows="3"
                        max-rows="6"
                    ></b-form-textarea>
                    <b-button @click="envoyerCommentaire" variant="primary" class="mt-2">Ajouter commentaire</b-button>
                </b-form-group>

                
                
            </div>
        </b-form>
        <b-modal id="modal-nouveauClient" ref="modal-nouveauClient" title="Client" hide-footer>
            <nouveauClient :nomClient="this.form.clientSansTraitement" @formulaireEnvoyer="nouveauClient" />
        </b-modal>
    </div>
    </div>
</template>
    
    

<script>
import axios from 'axios'
import moment from 'moment'

import nouveauClient from './../clients/client'

export default {
    name: 'nouveauProjet',

    components : {
        'nouveauClient': nouveauClient
    },

    data () {
        return {
            form: {
                nom: '',
                clientSansTraitement: '',
                client: '',
                descriptif: '',
                etatProjet: '',
                priorite:'3',
                dateRelance: null,
                chiffre: null,
                numeroDoffre: '',
                numeroDeCommande: '',
                marquesSansTraitement: [],
                marques: null,
                typeDaffaireSansTraitement: [],
                typeDaffaire: [],
                marche: false,
                marge: null,
                nouveauCommentaire: null,
                commentaires: null,
                interlocuteur: null,
                usersIDcollaboration: [],
            },
            option: {
                clients: {},
                etatProjet: [],
                priorite: [
                    {priorite: 1, texte: '1 - haute'},
                    {priorite: 2, texte: '2 - moyenne'},
                    {priorite: 3, texte: '3 - basse'},
                ],
                typeDaffaire: [],
                search: '',
                collaboration: null,
            },
            idModificationProjet: null,
            popup: {
                valeurInitCompteur: 5,
                compteurPopup: 0,
                nomProjet: '',
            }
        }
    },
    methods: {
        resetForm() {
            this.form.nom = ''
            this.form.clientSansTraitement = ''
            this.form.client = ''
            this.form.descriptif = ''
            this.form.etatProjet = ''
            this.form.priorite = '3'
            this.form.dateRelance = null
            this.form.chiffre = null
            this.form.marques = null
            this.form.marquesSansTraitement = []
            this.form.typeDaffaireSansTraitement = []
            this.form.typeDaffaire = []
            this.form.marche = false
            this.form.marge = null
            this.form.interlocuteur = null

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

            // Etat projet
            if (this.form.etatProjet == "" && traitementOk) {
                alert("Merci de choisir un etat du projet, champ obligatoire")
                traitementOk = false
            }

            // marques : capitalize + remettre en string
            if (traitementOk) {
                try {
                    let marques = this.form.marquesSansTraitement.map(marque => marque.charAt(0).toUpperCase() + marque.slice(1))
                    this.form.marques = marques.join(' / ')
                } catch(error) {
                    console.log(error);
                    alert("Erreur lors du traitement de la marque")
                }
            }
            
            // Type d'affaire
            if(traitementOk) {
                try {
                    const idTypeDaffaire = this.form.typeDaffaireSansTraitement.map(type => this.option.typeDaffaire.indexOf(type) + 1) 
                    this.form.typeDaffaire = idTypeDaffaire
                } catch(error) {
                    console.log(error);
                    alert("Erreur lors du traitement du type d'affaire")
                }
            }

            // clients
            if (traitementOk) {
                if (this.form.clientSansTraitement.length == 0) {
                    alert("Merci de choisir un client, champ obligatoire")
                    traitementOk = false
                }
                else {
                    try {
                        let objClient = await this.findClient(this.form.clientSansTraitement)
                        if (objClient.length == 1) {
                            this.form.client = [objClient[0].id]
                        }
                        else {
                            if(confirm("Ce client n'existe pas, voulez-vous le créer ?")) {
                                this.showModalClient()
                            }
                            traitementOk = false
                        }
                    } catch(error) {
                        console.log(error);
                        alert("Erreur lors du traitement du client")
                    }
                }
            }

            // Users
            if(traitementOk) {
                this.form.usersIDcollaboration.push(this.$store.state.user.user.id) //// rajouter les personnes supplémentaires
                const uniqueId = [... new Set(this.form.usersIDcollaboration)]
                this.form.usersIDcollaboration = uniqueId
            }
            
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
                
        },
        async envoyerForm() {
            // requete
            console.log(this.form.usersIDcollaboration)
            axios
            .post(this.$store.state.baseUrlApi + 'projets',
            {
              Nom: this.form.nom,
              client: this.form.client[0],
              DescriptifDuProjet: this.form.descriptif,
              etatprojet: this.form.etatProjet,
              Priorite: this.form.priorite,
              DateDeRelance: this.form.dateRelance,
              Chiffre: this.form.chiffre,
              Marques: this.form.marques,
              type_daffaires: this.form.typeDaffaire,
              marche: this.form.marche,
              marge: this.form.marge,
              users: this.form.usersIDcollaboration,
              interlocuteur: this.form.interlocuteur,
            }
            , {
                headers: {
                    Authorization:
                    `Bearer ${this.$store.state.user.jwt}`,
                },
            })
            .then(
                this.activerPopup(this.form.nom),
                this.resetForm(),
            )
            .catch(function (error) {
                console.log(error);
                alert("Erreur avec la BDD lors de l'envoi du formulaire")
            })
        },
        async modifierForm () {
            // requete

            const objForm = {
              Nom: this.form.nom,
              client: this.form.client[0],
              DescriptifDuProjet: this.form.descriptif,
              etatprojet: this.form.etatProjet,
              Priorite: this.form.priorite,
              DateDeRelance: this.form.dateRelance,
              Chiffre: this.form.chiffre,
              Marques: this.form.marques,
              type_daffaires: this.form.typeDaffaire,
              marche: this.form.marche,
              marge: this.form.marge,
              interlocuteur: this.form.interlocuteur,
              users: this.form.usersIDcollaboration,
            }

            axios
            .put(`${this.$store.state.baseUrlApi}projets/${this.idModificationProjet}`,
            objForm
            , {
                headers: {
                    Authorization:
                    `Bearer ${this.$store.state.user.jwt}`,
                },
            })
            .then(
                this.activerPopup(this.form.nom),
            )
            .catch(function (error) {
                console.log(error);
                alert("Erreur avec la BDD lors de l'envoi du formulaire")
            })
        },
        affaireOptionTag({ option, addTag }) {
            addTag(option)
            this.search = ''
        },
        async chargementModifProjet() {
            let objProjet = await this.getDonnees(`projets/${this.idModificationProjet}`)
            console.log(objProjet)
            this.form.nom = objProjet.Nom
            this.form.clientSansTraitement = objProjet.client.Nom
            this.form.descriptif = objProjet.DescriptifDuProjet
            this.form.etatProjet = objProjet.etatprojet.id
            this.form.priorite = objProjet.Priorite
            this.form.dateRelance = objProjet.DateDeRelance
            this.form.chiffre = objProjet.Chiffre
            this.form.numeroDoffre = objProjet.NumeroDoffre
            this.form.numeroDeCommande = objProjet.NumeroDeCommande
            this.form.commentaires = objProjet.commentaires
            this.form.marche = objProjet.marche
            this.form.marge = objProjet.marge
            this.form.interlocuteur = objProjet.interlocuteur

            //marques
            if (objProjet.Marques) {
                this.form.marquesSansTraitement = objProjet.Marques.split('/')
            }
            
            this.chargementTypeDaffaire(objProjet.type_daffaires)

            // users collaboration
            const userId = []
            objProjet.users.forEach(user => {
                userId.push(user.id)
            })
            this.form.usersIDcollaboration = userId
        },
        chargementTypeDaffaire(listTypeDaffaire) {
            // if vide à rajouter
            listTypeDaffaire.forEach(affaire => {
                this.form.typeDaffaireSansTraitement.push(affaire.Domaine)
            })
        },
        envoyerCommentaire() {
            // requete
            axios
            .post(this.$store.state.baseUrlApi+'commentaires',
            {
              Commentaire: this.form.nouveauCommentaire,
              projet: this.idModificationProjet,
              user: this.$store.state.user.user.id,
            }
            , {
                headers: {
                    Authorization:
                    `Bearer ${this.$store.state.user.jwt}`,
                },
            })
            .then(
                this.form.nouveauCommentaire = '',
                setTimeout(() => this.chargerCommentaire(), 1000)
            )
            .catch(function (error) {
                console.log(error);
                alert("Erreur avec la BDD lors de l'envoi du commentaire")
            })
        },
        async chargerCommentaire() {
            if (this.idModificationProjet) {
                this.form.commentaires = await this.getDonnees(`commentaires?projet.id=${this.idModificationProjet}`)
            }
        },
        showModalClient() {
            this.$refs['modal-nouveauClient'].show()
        },
        hideModalClient() {
            this.$refs['modal-nouveauClient'].hide()
        },
        listClient() {
            this.getDonnees('clients?_sort=Nom:ASC').then(clients => {
                this.option.clients = clients
            })
        },
        nouveauClient(nomClient) {
            this.hideModalClient()
            setTimeout(this.listClient(), 1000) //maj list client
            this.form.clientSansTraitement = nomClient
        },
        initCompteurPopup(compteurPopup) {
            this.popup.compteurPopup = compteurPopup
        },
        activerPopup(nomProjet) {
            this.popup.nomProjet = nomProjet
            this.popup.compteurPopup = this.popup.valeurInitCompteur
        },
        async chargerUsersOptions() {
            const option = await this.getDonnees(`users`)
            const accumulateur = []
            // retirer user courant
            option.forEach(user => {      
                if (this.$store.state.user.user.id != user.id) {
                    accumulateur.push(user)
                }
            })
            this.option.collaboration = accumulateur

        }
    },
    
    created() {
        this.listClient()
        this.getDonnees('etatprojets?_sort=etat:ASC').then(etats => {
            this.option.etatProjet = etats
        })
        this.getDonnees('type-daffaires').then(types => {
            let listDomaine = []
            types.forEach(type => listDomaine.push(type.Domaine))
            this.option.typeDaffaire = listDomaine
        })

        // Chargement modification d'un projet
        try {
            if (this.$route.params.id) {
                this.idModificationProjet = this.$route.params.id
                this.chargementModifProjet()
            }
        } catch(error) {console.log(error);}
        this.chargerCommentaire()
        this.chargerUsersOptions()
    },
    computed: {
        validationNomProjet() {
            return this.form.nom.length > 3 && this.form.nom.length < 50
        },
        validationClient() {
            return this.form.clientSansTraitement != ''
        },
        validationEtat() {
            return this.form.etatProjet != ""
        },
        critereTypeAffaire() {
            // Compute the search critereTypeAffaire
            return this.option.search.trim().toLowerCase()
        },
        availableOptionsTypeAffaire() {
            const critereTypeAffaire = this.critereTypeAffaire
            // Filter out already selected options
            const options = this.option.typeDaffaire.filter(opt => this.form.typeDaffaire.indexOf(opt) === -1)
            if (critereTypeAffaire) {
            // Show only options that match critereTypeAffaire
            return options.filter(opt => opt.toLowerCase().indexOf(critereTypeAffaire) > -1);
            }
            // Show all options available
            return options
        },
        searchDescTypeAffaire() {
            if (this.critereTypeAffaire && this.availableOptionsTypeAffaire.length === 0) {
            return 'There are no tags matching your search critereTypeAffaire'
            }
            return ''
        },
        
    },
    watch: {
        '$route' (to) {
            // réagir au changement de route sur un nouveau projet
            if (to.path == "/projet") {
                this.resetForm()
            }
            
        },
    },
    filters: {
        formatDate: function (value) {
            if (!value) return ''
                return moment(String(value)).format('DD/MM/YYYY à HH:mm ')
        }
    }

}
</script>

<style scoped>
#projet {
    background-color: #ffffff;
    border-radius: 3px;
}
</style>