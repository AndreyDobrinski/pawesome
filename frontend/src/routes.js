import { Pet } from './pages/Pet'
import { Signup } from './pages/Signup'
import { Home } from './pages/Home'


export const routes = [
    {
        path: '/pet',
        component: Pet
    },
    {
        path: '/signup',
        component: Signup
    },
    
    {
        path: '/',
        component: Home
    }
]