import Test from './components/container/Test'
import Api from './components/Api'
import Projets from './components/Projets/listeProjets'
import Projet from './components/Projets/projet'


export default [
    {path: '/', component: Test},
    {path: '/api', component: Api},
    {path: '/projets', component: Projets},
    {path: '/projets/:type', component: Projets},
    {path: '/projet', component: Projet},
    {path: '/projet/:id', component: Projet},
]