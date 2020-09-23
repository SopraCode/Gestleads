<template>

    <div id="Connexion">
        <h1>Formulaire de connexion</h1>

        <form
        id="formLogin"
        method="post">
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
       
    </div>

</template>

<script>

export default {
    name: 'Connexion',
    data() {
        return {
            login: null,
            motDePasse: null,
        }
    },
    methods: {
        poster: function () {
            this.$store.dispatch('getUserAuth', {
                login: this.login,
                mdp : this.motDePasse
            })
        },
    },
    computed: {
        user() {
            return this.$store.state.user
        }
    },
    watch: {
        '$route' (to) {
            // réagir au changement de route sur un nouveau projet
            if (to.path == "/clients") {
                this.resetForm()
            }
            
        },
    },
}

</script>
#Connexion {

}
<style scoped>

</style>