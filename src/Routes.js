import Test from './components/container/Test'
import Api from './components/Api'
import Projets from './components/listeProjets/listeProjets'


export default [
    {path: '/', component: Test},
    {path: '/api', component: Api},
    {path: '/projets', component: Projets},
]