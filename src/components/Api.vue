<template>
    
    <div id="texte">
        <h1>Test API</h1>
        <div>
            <h2>Société</h2>
            <br>
            <p>
                {{ fournisseurs }}
            </p>


        </div>

       
    </div>

</template>

<script>

import axios from 'axios'

export default {
    name: 'Api',
    data() {
        return {
            fournisseurs: []
        }
    },
    methods: {
      
    },
    mounted() {
        axios
        .get(`http://localhost:1337/tests`)
        .then(reponse => {
            console.log(reponse)
            this.fournisseurs = reponse.data
        })
    }

}

</script>

<style scoped>

</style>
