import { httpService } from './httpService'
import Axios from 'axios';
const axios = Axios.create({
    withCredentials: true
})


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
        if (!filterBy) { return httpService.get(`pet`) }
        else {
            return httpService.get(`pet`, filter)
        }
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