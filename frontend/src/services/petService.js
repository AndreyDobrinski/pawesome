
import axios from 'axios'

export const petService = {
    query,
    save,
    getById
}

const baseUrl = 'http://localhost:3030/pet';


function query(filterBy) {
    console.log('petService --- get all pets query')
    return axios.get(baseUrl)
        .then(res => res.data)
}

// function deleteItem(itemId) {
//     return axios.delete(`${baseUrl}/${itemId}`)
//         .then(res => res.data)
// }


function save(itemToSave) {
    if (itemToSave._id) {
        //IF it has id , UPDATE
        return axios.put(`${baseUrl}/${itemToSave._id}`, itemToSave)
            .then(res => res.data)
    } else {
        // THEN , CREATE
        return axios.post(baseUrl, itemToSave)
            .then(res => res.data)
    }
}


function getById(itemId) {
    return axios.get(`${baseUrl}/${itemId}`)
        .then(res =>res.data)

}