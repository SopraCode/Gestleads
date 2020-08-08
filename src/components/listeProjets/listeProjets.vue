<template>

    <!-- composant haut (choix du type et les différents filtres) -->

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

</template>

<script>

import axios from 'axios'

export default {
    name: 'Projets',
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

</style>
