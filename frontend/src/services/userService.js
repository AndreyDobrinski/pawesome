import { httpService } from './httpService'


export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
}

function getById(userId) {
    try {
        return httpService.get(`user/${userId}`)
    } catch (err) {
        console.log('FrontError: getting user by id', err)
        throw err
    }
}

async function login(userCred) {
    try {
        const user = await httpService.post('auth/login', userCred)
        if (user) return _saveLocalUser(user)
    } catch (err) {
        console.log('FrontError: login', err)
        throw err
    }
}

async function signup(userCred) {
    try {
        const user = await httpService.post('auth/signup', userCred)
        return _saveLocalUser(user)
    } catch (err) {
        console.log('FrontError: signup', err)
        throw err
    }
}

async function logout() {
    try {
        sessionStorage.removeItem('loggedinUser')
        return await httpService.post('auth/logout')
    } catch (err) {
        console.log('FrontError: logout', err)
        throw err
    }
}


function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser'))
}
