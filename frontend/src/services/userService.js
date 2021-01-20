import { httpService } from './httpService'


export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
}

function getById(userId) {
    return httpService.get(`user/${userId}`)
}

// async function update(user) {
//     return storageService.put('user', user)
//     // user = await httpService.put(`user/${user._id}`, user)
//     // Handle case in which admin updates other user's details
//     // if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
// }


async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    if (user) return _saveLocalUser(user)
}


async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    return _saveLocalUser(user)
}


async function logout() {
    return await httpService.post('auth/logout')
}


function _saveLocalUser(user) { 
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}



function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser'))
}
