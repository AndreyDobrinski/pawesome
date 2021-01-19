import Axios from 'axios';
const axios = Axios.create({
    withCredentials: true
})

export const orderService = {
    query,
    saveOrder,
    isOrderDone,
    updOrder
}
const BASE_URL = 'http://localhost:3030/api/order'
// const BASE_URL = (process.env.NODE_ENV !== 'development')
//     ? '/api/pet'
//     : '//localhost:3030/api/pet';
function query() {
    return axios.get(BASE_URL)
        .then(res => res.data)
}


// async function getById(petId) {
//     try {
//         const res = await axios.get(`${BASE_URL}/${petId}`)
//         return await res.data
//     } catch (err) {
//         console.log('FrontError: getting by Id', err)
//         throw err
//     }
// }
async function isOrderDone(petId, userId) {
    var orders = await this.query()
    var res = orders.filter(order => {
        return order.pet._id === petId && order.byUser._id === userId
    })
    if (res.length > 0) return true
    else return false
}


async function saveOrder(newOrder) {
    // newOrder.createdAt = new Date().toLocaleString() !!!!!!!!
    console.log('order tosave in orderService', newOrder)
    const res = await axios.post(`${BASE_URL}`, newOrder)
    return await res.data
}

async function updOrder(newOrder) {
    const res = await axios.put(`${BASE_URL}/${newOrder._id}`, newOrder)
    return await res.data
}