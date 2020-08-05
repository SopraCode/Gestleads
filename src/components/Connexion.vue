<template>

    <div id="Connexion">
        <h1>Formulaire de connexion</h1>

        <form
        id="formLogin"
        method="post"
        >
            <div class="form-group">
                <label for="login">Login</label>
                <input v-model="login" type="text" id="login" class="form-control">
            </div>
            <div class="form-group">
                <label for="motDePasse">Ton mot de passe</label>
                <input v-model="motDePasse" type="password" id="motDePasse" class="form-control">
            </div>
        </form>
        <div class="btn btn-primary" v-on:click="poster" >Se connecter !</div>
        <div class="mt-5" v-if="user">
            <h1>Info utilisateur</h1>
            <p>Token : {{ token }}</p>
            <p>User: {{ user }}</p>
        </div>
       
    </div>

</template>

<script>

import axios from 'axios'

export default {
    name: 'Connexion',
    data() {
        return {
            login: null,
            motDePasse: null,
            token: null,
            user: null,
        }
    },
    methods: {
        poster: function() {
            axios
            .post('http://localhost:1337/auth/local', {
                identifier: this.login,
                password: this.motDePasse,
            })
            .then(response => {
                // Handle success.
                console.log('Authentification réussi ;)');
                this.user = response.data.user;
                this.token =  response.data.jwt;
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
            })
        }
    }
}

</script>
#Connexion {

}
<style scoped>

</style>