import Axios from 'axios';
const axios = Axios.create({
    withCredentials: true
})

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


async function getById(petId) {
    try {
        const res = await axios.get(`${baseUrl}/${petId}`)
        return await res.data
    } catch (err) {
        console.log('FrontError: getting by Id', err)
        throw err
    }
}