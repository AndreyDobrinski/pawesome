import Axios from 'axios';
const axios = Axios.create({
    withCredentials: true
})

export const orderService = {
    saveOrder
}
const BASE_URL = 'http://localhost:3030/order'
// const BASE_URL = (process.env.NODE_ENV !== 'development')
//     ? '/api/pet'
//     : '//localhost:3030/api/pet';


// async function getById(petId) {
//     try {
//         const res = await axios.get(`${BASE_URL}/${petId}`)
//         return await res.data
//     } catch (err) {
//         console.log('FrontError: getting by Id', err)
//         throw err
//     }
// }


async function saveOrder(newOrder) {
    if (newOrder._id) {
        await axios.put(`${BASE_URL}/${newOrder._id}`, newOrder)
        return null
    }
    newOrder.createdAt = new Date().toLocaleString()
    console.log('order in orderService', newOrder)
    const res = await axios.post(`${BASE_URL}`, newOrder)
    return await res.data
}