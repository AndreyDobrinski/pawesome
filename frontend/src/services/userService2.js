import { storageService } from './asyncStorageService'
// import { httpService } from './httpService'
import Axios from 'axios';
const axios = Axios.create({
    withCredentials: true
})

export const userService2 = {
    getById
}
const baseUrl = 'http://localhost:3030/user';


// Note: due to async, must run one by one...
// userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 100, isAdmin: false})
// userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 100, isAdmin: true})



async function getById(petId) {
    try {
        const res = await axios.get(`${baseUrl}/${petId}`)
        return await res.data
    } catch (err) {
        console.log('FrontError: getting by Id', err)
        throw err
    }
}