<template>
    <div id="badgeProjet" class="p-3">
        <div class="row align-items-center">
            <span id="nombre" class="pl-3"> <h5 class="m-0">{{ nombreDeProjet }}</h5> </span>
            <span id="icone" class="ml-auto pr-3"><font-awesome-icon v-bind:icon="icone" /></span>
        </div>
        <div class="row mb-1 pt-2 justify-content-center" id="typeProjet">
            <h4>{{ typeDeProjet }}</h4>
        </div>
    </div>
</template>

<script>

export default {
    name: 'badgeTypeProjet',
    data() {
        return {
            
        }
    },
    methods: {
      
    },
    props: ['couleur', 'typeDeProjet', 'nombreDeProjet', 'icone']
}

</script>

<style scoped>
#badgeProjet {
    background-color: var(--secondary-color);
    border-radius: 3px;
    color: var(--light-color);
}
h3, h4, h5 {
    color: var(--light-color);
}
@import '../../assets/variables.css';
</style>
