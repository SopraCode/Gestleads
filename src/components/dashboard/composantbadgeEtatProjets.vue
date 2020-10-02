<template>
    <div id="badgeProjet" class="p-2" v-bind:style="addStyle">
        <div class="row align-items-center">
            <span id="nombre" class="pl-3"> <h5 class="m-0">{{ nombreDeProjets }}</h5> </span>
            <span id="icone" class="ml-auto pr-3"><font-awesome-icon v-bind:icon="icone" /></span>
        </div>
        <div class="row mb-1 pt-2 justify-content-center" id="typeProjet">
            <h4>{{ typeDeProjet }}</h4>
        </div>
        <div class="row mb-1 pt-2 justify-content-center" id="sommeProjet">
            <h5>{{ new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(sommeProjet) }}</h5>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'badgeTypeProjet',
    data() {
        return {
            nombreDeProjets: 0,
            projets:{},
            sommeProjet: "?",
        }
    },
    methods: {
        reqNombreProjets() {
            // constitution de l'url pour la requete
            const countEtatProjetUrl = `${this.$store.state.baseUrlApi}projets/count?etatprojet.etat=${this.nombreProjets}&users.id=${this.$store.state.user.user.id}`
            axios
            .get(countEtatProjetUrl, {
                headers: {
                    Authorization:
                    `Bearer ${this.$store.state.user.jwt}`,
                },
            })
            .then(reponse => {
                this.nombreDeProjets = reponse.data
            })
            .catch(function (error) {
                console.log('Req nombres projets' + error);
            })
        },
        reqProjets() {
            // constitution de l'url pour la requete
            const countEtatProjetUrl = `${this.$store.state.baseUrlApi}projets?etatprojet.etat=${this.nombreProjets}&users.id=${this.$store.state.user.user.id}`
            axios
            .get(countEtatProjetUrl, {
                headers: {
                    Authorization:
                    `Bearer ${this.$store.state.user.jwt}`,
                },
            })
            .then(reponse => {
                this.projets = reponse.data
                this.calculSommeProjets()
            })
            .catch(function (error) {
                console.log('Req projets' + error);
            })
        },
        calculSommeProjets() {
            const total = this.projets.reduce(
                function (accumulateur, projet) {
                    let chiffre = 0
                    if(projet.Chiffre){
                        chiffre = parseInt(projet.Chiffre, 10)
                    }
                    return (accumulateur + chiffre); 
                    }
                    , 0
            )
            this.sommeProjet = total
        }
    },
    props: {
        addStyle:{
            type: String,
            default: 'background-color: #ffffff;'
        },
        typeDeProjet:{
            type: String,
            default: 'default'
        },
        nombreProjets:{
            type: String,
        },
        icone:{
            type: String,
            default: 'tasks'
        },
    },
    beforeMount() {
        this.reqNombreProjets()
        this.reqProjets()
    },
}

</script>

<style scoped>
#badgeProjet {
    min-width: 130px;
    border-radius: 3px;
    color: var(--light-color);
}
#badgeProjet:hover {
    opacity: 0.8;
}
h3, h4, h5 {
    color: var(--light-color);
}

@import '../../assets/variables.css';
</style>
