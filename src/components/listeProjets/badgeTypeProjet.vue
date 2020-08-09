<template>
    <div id="badgeProjet" class="p-2" v-bind:style="style">
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
    props: {
        style:{
            type: String,
            default: 'background-color: #ffffff;'
        },
        typeDeProjet:{
            type: String,
            default: 'default'
        },
        nombreDeProjet:{
            type: String,
            default: '0?'
        },
        icone:{
            type: String,
            default: 'tasks'
        },
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
