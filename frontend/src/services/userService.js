<<<<<<< HEAD
import { storageService } from './asyncStorageService'
// import { httpService } from './httpService'
=======
// import { storageService } from './asyncStorageService'
import { httpService } from './httpService'
import Axios from 'axios';
const axios = Axios.create({
    withCredentials: true
})
const baseUrl = 'http://localhost:3030/user';
>>>>>>> a40c45727eb4bb9427b88aa08952b414518051b8


export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
}

window.userService = userService
// Note: due to async, must run one by one...
// userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 100, isAdmin: false})
// userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 100, isAdmin: true})



function getUsers() {
    return storageService.query('user')
    // return httpService.get(`user`)
}

<<<<<<< HEAD
function getById(userId) {
    return storageService.get('user', userId)
    // return httpService.get(`user/${userId}`)
=======
// function getById(userId) {
//     // return storageService.get('user', userId)
//     // return httpService.get(`user/${userId}`)
// }

async function getById(userId) {
    try {
        const res = await axios.get(`${baseUrl}/${userId}`)
        return await res.data
    } catch (err) {
        console.log('FrontError: getting by Id', err)
        throw err
    }
>>>>>>> a40c45727eb4bb9427b88aa08952b414518051b8
}

function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}


async function update(user) {
    return storageService.put('user', user)
    // user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    // if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
}


async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    // return _handleLogin(user)

    // const user = await httpService.post('auth/login', userCred)
    if (user) return _saveLocalUser(user)
}


async function signup(userCred) {
    const user = await storageService.post('user', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    return _saveLocalUser(user)
}


async function logout() {
    sessionStorage.clear()
    // return await httpService.post('auth/logout')
}


function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}



function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser'))
}
