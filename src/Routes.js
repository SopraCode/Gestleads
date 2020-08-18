import Test from './components/container/Test'
import Api from './components/Api'
import Projets from './components/Projets/listeProjets'


export default [
    {path: '/', component: Test},
    {path: '/api', component: Api},
    {path: '/projets', component: Projets},
    {path: '/projets/:type', component: Projets},
]