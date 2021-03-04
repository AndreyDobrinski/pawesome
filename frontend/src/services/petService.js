import { httpService } from './httpService'
import Axios from 'axios';
const axios = Axios.create({
    withCredentials: true
})

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/pet'
    : '//localhost:3030/api/pet'

export const petService = {
    query,
    save,
    getById
}

function query(filterBy) {
    try {
        let filter = {}
        for (var key in filterBy) {
            if (filterBy[key] !== 'all') filter[key] = filterBy[key]
        }
        return (!filterBy) ? axios.get(BASE_URL).then(res => res.data)
            :
            axios.get(BASE_URL, { params: filter })
                .then(res => res.data)
    } catch (err) {
        console.log('FrontError: getting pets', err)
        throw err
    }
}


function save(itemToSave) {
    try {
        if (itemToSave._id) {
            return httpService.put(`pet/:${itemToSave._id}`, itemToSave)

        } else {
            return httpService.post(`pet`, itemToSave)
        }
    } catch (err) {
        console.log('FrontError: saving pet', err)
        throw err
    }
}


async function getById(petId) {
    try {
        return httpService.get(`pet/${petId}`)

    } catch (err) {
        console.log('FrontError: getting by Id', err)
        throw err
    }
}