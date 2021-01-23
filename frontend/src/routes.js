import { PetDetails } from './pages/PetDetails'
import { Pet } from './pages/Pet'
import { Profile } from './pages/Profile'
import { Home } from './pages/Home'
import { OwnerProfile } from './pages/OwnerProfile'
import {Chat} from './cmps/Chat'


export const routes = [
    {
        path: '/chat',
        component: Chat
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