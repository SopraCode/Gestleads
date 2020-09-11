<template>
    <div id="badgeProjet" class="p-2" v-bind:style="addStyle">
        <div class="row align-items-center">
            <span id="nombre" class="pl-3"> <h5 class="m-0">{{ nombreDeProjets }}</h5> </span>
            <span id="icone" class="ml-auto pr-3"><font-awesome-icon v-bind:icon="icone" /></span>
        </div>
        <div class="row mb-1 pt-2 justify-content-center" id="typeProjet">
            <h4>{{ typeDeProjet }}</h4>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'badgeTypeProjet',
    data() {
        return {
            nombreDeProjets: 0
        }
    },
    methods: {
        reqNombreProjets() {
            const typesProjet = ['a_faire']
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
                    this.nombreDeProjets = reponse.data
                })
            }

        },
      
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
            type: Number,
            default: 0
        },
        icone:{
            type: String,
            default: 'tasks'
        },
    },
    created() {
        this.reqNombreProjets()
    },
    mounted() {
        const countEtatProjetUrl = `${this.$store.state.baseUrlApi}projets/count?etatprojet.etat=${this.rechercheReqEtat}`

        axios
        .get(countEtatProjetUrl, {
            headers: {
                Authorization:
                `Bearer ${this.$store.state.user.jwt}`,
            },
        })
        .then(reponse => {
            this.nombreProjets = reponse.data
        })
    }
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
