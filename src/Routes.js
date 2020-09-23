import Dashboard from './components/dashboard/dashboardPrincipal'
import Projets from './components/Projets/listeProjets'
import Projet from './components/Projets/projet'
import Client from './components/clients/client'
import Clients from './components/clients/listeClients'
import Connexion from './components/Connexion.vue'


export default [
    {path: '/', component: Dashboard},
    {path: '/projets', component: Projets},
    {path: '/projets/:type', component: Projets},
    {path: '/projet', component: Projet},
    {path: '/projet/:id', component: Projet},
    {path: '/client', component: Client},
    {path: '/client/:id', component: Client},
    {path: '/clients', component: Clients},
    {path: '/connexion', component: Connexion},
]