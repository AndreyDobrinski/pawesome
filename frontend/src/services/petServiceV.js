import Axios from 'axios';
const axios = Axios.create({
    withCredentials: true
})

export const petServiceV = {
    getById
}
const BASE_URL = 'http://localhost:3030/pet'
// const BASE_URL = (process.env.NODE_ENV !== 'development')
//     ? '/api/pet'
//     : '//localhost:3030/api/pet';


async function getById(petId) {
    try {
        const res = await axios.get(`${BASE_URL}/${petId}`)
        return await res.data
    } catch (err) {
        console.log('FrontError: getting by Id', err)
        throw err
    }
}