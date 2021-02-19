import VueRouter from 'vue-router'
import Results from './components/Results.vue'
import Questions from './components/Questions.vue'
import StartScreen from './components/StartScreen.vue'

const routes = [
    {
        path: '/',
        component: StartScreen
    },
    {
        path: '/results',
        component: Results
    },
    {
        path: '/questions/:id',
        component: Questions
    } //this.$route.params.id
]

const router = new VueRouter({ routes })

export default router
