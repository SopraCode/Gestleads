<template>
<div>
    <badgeEtatProjets @etatProjet="test" :prop="envoiProps" />
</div>
</template>

<script>
import badgeEtatProjets from './badgeEtatProjets'

export default {
    name: 'Dashboard',
    components: {
        badgeEtatProjets
    },
    data() {
        return {
            envoiProps: ''
        }
    },
    methods: {
        test(nombreEtatProjet) {
            console.log('test reussi')
            console.log(nombreEtatProjet)
            this.envoiProps = 'props envoyé'
        }
    }
  
}
</script>

<style>


</style>