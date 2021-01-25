import { httpService } from './httpService'

export const orderService = {
    query,
    saveOrder,
    isOrderDone,
    updateOrder
}
const BASE_URL = 'http://localhost:3030/api/order'
// const BASE_URL = (process.env.NODE_ENV !== 'development')
//     ? '/api/pet'
//     : '//localhost:3030/api/pet';
function query() {
    return httpService.get(`order`)
}

async function isOrderDone(petId, userId) {
    var orders = await this.query()
    console.log("orders service --- orders: ", orders)
    var res = orders.filter(order => {
        return order.pet._id === petId && order.byUser._id === userId
    })
    if (res.length > 0) return true
    else return false
}

async function saveOrder(pet, message) {
    var newOrder = {
        message: message,
        pet: {
            name: pet.name,
            _id: pet._id,
            imgUrls: pet.imgUrls
        },
        ownerId: pet.host._id,
        byUser: {
            _id: '',
            fullname: ''
        }
    }
   return httpService.post(`order`, newOrder)
}

async function updateOrder(newOrder) {
    return httpService.put(`order/:${newOrder._id}`, newOrder)
}