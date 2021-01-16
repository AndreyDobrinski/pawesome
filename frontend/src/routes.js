import { PetDetails } from './pages/PetDetails'
import { Pet } from './pages/Pet'
import { Home } from './pages/Home'
import { OwnerProfile } from './pages/OwnerProfile'


export const routes = [
    {
        path: '/profile/:ownerId',
        component: OwnerProfile
    },
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