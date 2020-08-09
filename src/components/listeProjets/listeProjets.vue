<template>
    <div id="contenu-projet">

        <!-- composant haut (choix du type et les différents filtres) -->
        <div class="row">
            <div class="col-3">
                <badgeTypeProjet couleur="#3fc1c9" typeDeProjet="En attente" nombreDeProjet="5" icone="tasks"></badgeTypeProjet>
            </div>
            <div class="col-3">
                <div id="test-badge" class="p-3">En attente</div>
            </div>
            <div class="col-3">
                <div id="test-badge" class="p-3">A relancer</div>
            </div>
            <div class="col-3">
                <div id="test-badge" class="p-3">Fini (sur 12 mois)</div>
            </div>
            
        </div>
        <!-- composant tableau  -->


        
        <div id="texte">
            <h1>Test API</h1>
            <div>
                <h2>Projets</h2>
                <br>
                <p>
                    {{ projets }}
                </p>


            </div>
        </div>
        </div>
    

</template>

<script>

import axios from 'axios'

import badgeTypeProjet from './badgeTypeProjet'

export default {
    name: 'Projets',
    components : {
        'badgeTypeProjet': badgeTypeProjet,
    },
    data() {
        return {
            projets: []
        }
    },
    methods: {
      
    },
    mounted() {
        axios
        .get('http://localhost:1337/projets', {
            headers: {
                Authorization:
                `Bearer ${this.$store.state.user.jwt}`,
            },
        })
        .then(reponse => {
            console.log('log projets reussi')
            this.projets = reponse.data
        })
    },
    
}

</script>

<style scoped>
#test-badge {
    background-color: var(--flash-color);
    border-radius: 3px;
}
@import '../../assets/variables.css';
</style>
