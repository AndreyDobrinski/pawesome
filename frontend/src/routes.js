import { PetDetails } from './pages/PetDetails'
import { Pet } from './pages/Pet'
import { Profile } from './pages/Profile'
import { Home } from './pages/Home'
import { OwnerProfile } from './pages/OwnerProfile'


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
    // {
    //     path: '/profile/owner/:ownerId',
    //     component: OwnerProfile
    // },
    {
        path: '/',
        component: Home
    }
]