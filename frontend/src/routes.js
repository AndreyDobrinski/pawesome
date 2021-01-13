import { PetDetails } from './pages/PetDetails'
import { Pet } from './pages/Pet'
import { Home } from './pages/Home'


export const routes = [
    {
        path: '/pet/:petId',
        component: PetDetails
    },
    {
        path: '/pet',
        component: Pet
    },
    {
        path: '/',
        component: Home
    }
]