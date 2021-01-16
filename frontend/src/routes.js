import { PetDetails } from './pages/PetDetails'
import { Pet } from './pages/Pet'
import { Profile } from './pages/Profile'
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
        path: '/profile/:userId',
        component: Profile
    },
    {
        path: '/',
        component: Home
    }
]